// src/pages/index.js
import { useEffect } from "react";
import { motion } from "framer-motion";
import useBreathStore from "../store/useBreathStore";
import "../styles/global.css";

export default function Home() {
    const { holding, time, sessionCount, setHolding, increaseTime, increaseSession } = useBreathStore();

    useEffect(() => {
        let interval;
        if (holding) {
            interval = setInterval(() => increaseTime(), 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [holding]);

    return (
        <div className="container">
            <h1 className="title">Inspire e Expire</h1>
            <motion.div
                className="breathing-bubble"
                animate={holding ? {} : { scale: [0.2, 2.5, 0.2] }}
                transition={{ duration: 3.5, repeat: Infinity }}
            />
            <button
                className="timer-button"
                onClick={() => {
                    setHolding(!holding);
                    if (!holding) {
                        increaseSession();
                    }
                }}
            >
                {holding ? `Soltar (${time}s)` : "Prender Respiração"}
            </button>
            <p className="session-info">Sessões concluídas: {sessionCount}</p>
        </div>
    );
}