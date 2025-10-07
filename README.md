## Breathing — Cronômetro de Apneia e Respiração Guiada

Aplicativo simples em Next.js para treinar respiração e apneia. Ele exibe uma bolha animada para inspirar/expirar, mede o tempo de apneia, e guarda estatísticas úteis como última sessão, média, melhor tempo e contagem de sessões. Possui atalho de teclado, tema claro/escuro e interface minimalista.

### Recursos
- **Cronômetro de apneia**: inicie/pare com clique ou tecla Espaço.
- **Animação de respiração**: bolha com ciclo contínuo enquanto não estiver em apneia.
- **Estatísticas**: última sessão, média, melhor tempo, sessões concluídas.
- **Tema claro/escuro**: alternância rápida pelo botão no topo direito.
- **Atalho de teclado**: tecla **Espaço** para iniciar/encerrar.

### Tecnologias
- **Next.js 15** e **React 19**
- **Framer Motion** para animações
- **Zustand** para estado global
- **Tailwind CSS** para estilos utilitários (via `global.css`)
- **ESLint** com `eslint-config-next`

### Estrutura do projeto
- `src/pages/index.js`: página principal com UI, animações e integração com o estado.
- `src/store/useBreathStore.js`: store com Zustand (tempo, sessões, tema, ações).
- `src/styles/global.css`: estilos globais e temas.

### Pré-requisitos
- Node.js 18+ (recomendado 20+)

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```
Abra `http://localhost:3000` no navegador.

### Build de produção
```bash
npm run build
npm start
```

### Scripts
- `npm run dev`: inicia o servidor de desenvolvimento (Turbopack).
- `npm run build`: gera o build de produção.
- `npm start`: inicia o servidor em produção.
- `npm run lint`: checa o lint.

### Como usar
1. Clique no botão “Prender Respiração” ou pressione **Espaço** para iniciar a apneia.
2. O tempo em segundos aparece no botão enquanto estiver prendendo.
3. Pressione **Espaço** novamente ou clique no botão para encerrar. As estatísticas serão atualizadas.
4. Use o botão de **tema** no topo direito para alternar entre claro/escuro.

Observações de acessibilidade:
- O botão de tema possui `aria-label` e `title` contextualizados.
- Atalho por teclado: **Espaço** para controle principal.

### Deploy
Qualquer provedor compatível com Next.js funciona bem. Recomenda-se Vercel:
- Faça login na Vercel e importe o repositório.
- A Vercel detecta Next.js automaticamente e cria o build.


Consulte a documentação oficial do Next.js para detalhes de deploy: [`nextjs.org/docs`](https://nextjs.org/docs/app/building-your-application/deploying).

### Personalização
- Ajuste estilos em `src/styles/global.css`.
- Estenda o estado/ações em `src/store/useBreathStore.js` (por exemplo, reset de estatísticas, metas de tempo, persistência em `localStorage`).
- Modifique a UI/fluxo em `src/pages/index.js`.


### Licença
Este projeto é disponibilizado sem licença explícita. Defina a licença desejada (por exemplo, MIT) conforme sua necessidade.
