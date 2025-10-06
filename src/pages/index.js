// src/pages/index.js
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useBreathStore from "../store/useBreathStore";
import "../styles/global.css";

export default function Home() {
    const { holding, time, sessionCount, totalSessions, averageTime, bestTime, lastTime, toggleHolding, increaseTime, setTime, theme, setTheme } = useBreathStore();

    const startRef = useRef(null);
    const lastTickRef = useRef(0);

    useEffect(() => {
        let rafId;
        if (holding) {
            const now = performance.now();
            startRef.current = startRef.current ?? now - time * 1000;
            const loop = (t) => {
                const elapsedMs = t - startRef.current;
                const seconds = Math.floor(elapsedMs / 1000);
                if (seconds !== time) setTime(seconds);
                // silent mode (no periodic sounds)
                rafId = requestAnimationFrame(loop);
            };
            rafId = requestAnimationFrame(loop);
        } else {
            startRef.current = null;
            lastTickRef.current = 0;
        }
        return () => cancelAnimationFrame(rafId);
    }, [holding]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                toggleHolding();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [toggleHolding]);

    // apply theme class to body
    useEffect(() => {
        const root = document.body;
        root.classList.remove("light", "dark");
        if (theme === "light") root.classList.add("light");
        if (theme === "dark") root.classList.add("dark");
        // auto: no class, relies on prefers-color-scheme
    }, [theme]);

    return (
        <div className="container">
            <button
                className="theme-button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Alternar tema"
                title={theme === "dark" ? "Modo Claro" : "Modo Escuro"}
            >
                {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <h1 className="title">Inspire e Expire</h1>
            <p className="subtitle">Pressione Espaço para começar e terminar</p>
            <motion.div
                className="breathing-bubble"
                animate={holding ? {} : { scale: [0.2, 1.5, 0.2] }}
                transition={{ duration: 3.5, repeat: Infinity }}
            />
            <button
                className="timer-button"
                onClick={toggleHolding}
            >
                {holding ? `Soltar (${time}s)` : "Prender Respiração"}
            </button>
            <p className="session-info">Sessões concluídas: {sessionCount} ({totalSessions})</p>
            <p className="session-info">Última: {lastTime}s • Média: {averageTime}s • Melhor: {bestTime}s</p>
            {/* controle de tema simplificado movido para o canto superior direito */}
        </div>
    );
}