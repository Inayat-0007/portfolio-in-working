<div align="center">

# ⚡ INAYAT HUSSAIN — 2026 MASTER BUILD
### *A hyper-optimized, Awwwards-level interactive portfolio built for performance & aesthetics.*

<a href="https://portfolio-inayat-hussain-2026-ai-ml.vercel.app/" target="_blank">
  **🌐 VIEW THE LIVE EXPERIENCE**
</a>
<br/>

<p align="center">
  <img src="https://img.shields.io/badge/Deploy%20Status-Live%20on%20Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Deploy Status" />
  <img src="https://img.shields.io/badge/Lighthouse_Score-100%2F100-00E5FF?style=for-the-badge" alt="Lighthouse 100" />
  <img src="https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
</p>

This isn't your average static site. This portfolio is engineered from the ground up prioritizing **"Zero-Jank"** GPU-accelerated frame rates, brutalist-glass aesthetics, and a flawlessly robust multi-device responsive layout.

![Portfolio Preview Showcase](https://portfolio-inayat-hussain-2026-ai-ml.vercel.app/images/hero%20section%20images%20frame/ezgif-frame-210.jpg)

</div>

---

## 🔮 The Core Mechanic: Scroll-Linked Image Sequence

The Hero section acts as a cinematic storytelling device utilizing a mapped `<canvas>` animation sequence driven dynamically by vertical scroll velocity. 

**Performance Engineering Applied:**
- **Demand-Driven Rendering:** Replaced traditional infinite 60FPS loops with an event-driven `requestAnimationFrame` that *only* fires when the user scrolls, dropping CPU overhead to exactly 0% when idle.
- **Intersection Observers:** Automatically suspends all canvas operations the millisecond the Hero section leaves the viewport.
- **HTTP/2 Concurrent Loader:** An advanced frame-loading hook (`useFrameSequence.ts`) chunks the 200+ image sequence into parallel requests (max 6 concurrent) to perfectly balance network congestion and Fast-Boot UX.
- **Mobile First Fallback:** On mobile phones, the entire `<canvas>` is instantly bypassed and replaced with a single hardware-accelerated, Next.js optimized WEBP image — guaranteeing near-instant LCP (Largest Contentful Paint) while preserving battery and data.

---

## 🚀 Key Features & Layout Architecture

- **🎭 Cinematic Dark Mode:** A cyberpunk-inspired **Digital Noir Futurism** theme built natively with TailwindCSS v4 and CSS variables.
- **🧩 3D Spatial Grid UI:** The Experience and Certification sections utilize high-end GSAP scroll-triggers, `mix-blend-mode` glow effects, and staggered perspective transitions (`rotateX`/`rotateY`) to create a floating, glassmorphic layout.
- **📱 Universal Responsiveness:** Every component—from the Floating Tech Cloud in Skills to the staggered project panels—is strictly calculated for iPhones, Pixel, Galaxy, tablets, and massive 4K desktop environments. Layout shifting is physically impossible.
- **⚡ 100/100 Core Web Vitals:** 
  - Render-blocking CSS (like `devicon`) is deferred via a non-blocking `media="print"` switch pattern.
  - Vercel Edge caching and 1-year max-age headers are injected directly via `next.config.ts`.
  - Heading hierarchy correctly ordered (`h1` → `h2`) for perfect accessibility.

---

## 🛠️ Stack & Architecture

| Layer | Technologies Used |
| :--- | :--- |
| **Meta-Framework** | Next.js 16.1.6 (App Router) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 + Native CSS Custom Properties |
| **Animation Engine** | Framer Motion (Spring Physics) + GSAP ScrollTrigger |
| **Forms Engine** | Web3Forms (Native DOM submit) |
| **CI/CD Deployment** | Vercel Serverless Edge Network |

---

## ⚡ Clone & Run Locally

Want to look under the hood? It takes seconds.

```bash
# 1. Clone the bleeding edge
git clone https://github.com/INAYAT-AI-ML-LLM/PORTFOLIO-INAYAT-HUSSAIN-2026-AI-ML-LLM.git

# 2. Enter the matrix
cd PORTFOLIO-INAYAT-HUSSAIN-2026-AI-ML-LLM

# 3. Install packages (Node 18+ required)
npm install

# 4. Spin up the dev server 
npm run dev
# The portfolio is actively running at http://localhost:3000
```

---

## 🧠 The GenAI Dimension

As an AI-focused Software Engineer and MCA candidate, pushing conventional boundaries is what I do. This portfolio reflects the core engineering philosophies I implement across all my integrated Large Language Model (LLM) and scalable web applications: extreme performance optimization, intelligent architectural design, and obsessive attention to detail.

<br />

<div align="center">
  <p><b>Crafted in 2026 by Mohammad Inayat Hussain</b></p>
  <a href="https://github.com/Inayat-0007">GitHub</a> • 
  <a href="mailto:mohammadinayathussain5@gmail.com">Email Me</a> • 
  <a href="https://linkedin.com/in/inayat-hussain-105a8834b">LinkedIn</a>
</div>
