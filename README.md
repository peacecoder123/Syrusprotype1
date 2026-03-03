# DevGuide AI

An autonomous, agentic developer onboarding platform built with **Next.js 15**, **Tailwind CSS**, **Framer Motion**, and **React Markdown**.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** with glassmorphism utilities
- **Framer Motion** for animations
- **React Markdown** for rich message rendering
- **Lucide React** for icons

## Prerequisites

- [Node.js](https://nodejs.org/) **v18 or later** (v20 LTS recommended)
- [npm](https://www.npmjs.com/) v9 or later (comes bundled with Node.js)
- [Git](https://git-scm.com/)

## Running Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/peacecoder123/Syrusprotype1.git
   cd Syrusprotype1
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in your browser**

   Navigate to [http://localhost:3000](http://localhost:3000).

## Other Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server with hot-reload |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

## Features

- 3-pane responsive layout (Left sidebar / Chat / Document viewer)
- Gamified quest log with animated progress tracking
- Markdown + code block rendering with copy-to-clipboard
- Typing indicator with bouncing dots animation
- Mobile-responsive with slide-in drawers
- System event notifications inline in chat