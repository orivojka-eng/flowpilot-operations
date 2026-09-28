# FlowPilot Operations – Field Service SaaS Platform
**Enterprise Field Operations, Dispatch, Asset & Mobility Platform by QuolyTech**

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Design](https://img.shields.io/badge/Design-Duolingo%20UI%20System-58CC02)](https://design.duolingo.com/)
[![Tests](https://img.shields.io/badge/Tests-40%20Passing-34C759)]()
[![Copyright](https://img.shields.io/badge/Copyright-%C2%A9%202026%20QuolyTech-5856D6)]()

---

## 🌟 Overview & Purpose
**FlowPilot Operations** is a multi-tenant SaaS platform built for field service operations, commercial facilities management, and specialty trade contractors. It unifies operations managers, dispatchers, field technicians, asset supervisors, and customers into one cohesive workflow with **Duolingo-inspired gamification and 3D tactile aesthetics**.

---

## 🚀 Live Demo & Port
- **Dev Server URL:** [http://localhost:5176/](http://localhost:5176/)
- **Network Link:** `http://192.168.0.133:5176/`
- **Vite Port:** `5176`

---

## 🎨 Duolingo UI Design System
- **Tactile 3D Buttons:** Chunky, clickable 3D buttons (`.btn-duo-green`, `.btn-duo-blue`, `.btn-duo-yellow`, `.btn-duo-red`, `.btn-duo-purple`) that physically depress on click.
- **Vibrant Duolingo Palette:**
  - Duo Feather Green: `#58CC02` (dark: `#46A302`)
  - Electric Sky Blue: `#1CB0F6` (dark: `#1899D6`)
  - Amber Gold: `#FFC800` (dark: `#E5A500`)
  - Cardinal Red: `#FF4B4B` (dark: `#EA2B2B`)
  - Playful Grape: `#CE82FF` (dark: `#A557DF`)
- **Web Audio Sound Effects:** Real-time synthesized audio feedback using the Web Audio API (major chord arpeggios on task completion, tactile clicks, fanfare rewards).
- **Gamified Header:** Live 14-Day Zero-SLA Streak pill 🔥, 420 FlowCoins gem pill 💎, 4,850 XP pill ⚡, and multi-role switcher pill.
- **Pilot Duo Mascot:** Custom vector SVG aviator owl mascot delivering interactive contextual speech guidance.
- **100% Vector SVG:** Zero raw unicode emojis — crisp vector icons across all views.

---

## 🔑 Multi-Role Field Service Features

### 1. Duolingo Mission Path & Live Workflow Simulator
- Winding, connected milestone roadmap on the intro page with 6 interactive operational stages (Genesis, Smart Dispatch, GPS Geofencing, Diagnostic & Assets, Proof of Work, Stripe Settlement).
- Interactive Live Workflow Simulator with 5 animated steps, auto-play mode, and live KPI changes.

### 2. Dispatcher Work Orders Board
- KPI telemetry cards: Active Work Orders, Deployed Vans, On-Time SLA Rate, and Invoiced Revenue.
- Real-time search and priority filtering (Emergency, High, Medium, Normal).
- Modal for instant job creation with customer, address, priority, and technician assignment.

### 3. Drag-and-Drop Fleet Scheduling Board
- Visual Gantt schedule grid featuring 4 technicians (Marcus Vance [HVAC], Sarah Chen [Electrical], Liam Patel [Plumbing], Elena Rostova [Automation]) across 5 daily time slots.
- Native drag-and-drop and click-to-assign slot capabilities with instant calendar updates.
- One-click **AI Auto-Optimize Routes** button for traffic and fuel minimization.

### 4. Field Technician Mobile Simulator
- Realistic mobile device frame with Dynamic Island notch and scrollable view.
- **GPS Check-in Button:** Live coordinate telemetry (`37.7749° N, 122.4194° W`) with 100m geofence verification badge.
- **Field Photo Capture:** Before/after high-resolution diagnostic photo gallery.
- **HTML5 Canvas Signature Pad:** Interactive touch/mouse signature pad with clear and sign-off verification.
- **Submit & Complete Job:** Triggers celebratory level-up modal with "+250 XP", "+25 FlowCoins", and cheering mascot!

### 5. Industrial Equipment & Asset Registry
- Asset cards tracking warranties, manufacturer specs, installation dates, and real-time health score bars.
- Detailed technical specs (voltage, refrigerant, flow rate, communication protocols) and maintenance history.

### 6. Billing, Invoices & Stripe Settlement
- Itemized parts and labor lines, tax calculations, and status badges (Paid, Pending, Draft).
- **Stripe Webhook Settlement Simulator:** Instantly settles invoices with live cryptographic charge IDs (`ch_live_...`).
- Automated billing CSV export and printable receipt view.

### 7. Real-Time Immutable Audit Trail
- High-integrity ledger recording technician GPS pings, customer sign-offs, AI route optimizations, and Stripe webhook settlements.

---

## 🧪 Testing & Verification
```bash
# Verify all DOM element IDs
npm run test:ids

# Run full automated functional test suite (40 tests)
npm test

# Build production bundle
npm run build
```

---

## 🏢 Attribution & Copyright
Designed and engineered by **QuolyTech**.
`© 2026 QuolyTech. All rights reserved.`
