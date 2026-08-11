# ZenSpend

**Spend on purpose, not on impulse.**

ZenSpend is a mindful-spending prototype that intercepts impulse purchases at the exact moment they're about to happen — using real-time behavioral signals, cooling-off periods, and social accountability to turn "almost bought it" into actual savings.

---

## 🧩 Problem

Impulse spending rarely happens because people lack a budget — it happens in a specific moment: late at night, mid-doomscroll, stressed or bored, one tap away from checkout. Traditional budgeting and expense-tracking apps only show you the damage *after* the fact. By the time a spending app tells you you're over budget, the purchase is already made.

There's no tool that intervenes **at the point of decision** — when mood, context, and impulse are actually driving the click.

## 💡 Solution

ZenSpend sits between "add to cart" and "buy now." It reads behavioral cues (like scroll speed and time of day) to estimate emotional state, flags risky checkouts in real time, and inserts a deliberate pause — a breathing exercise, a cooling-off vault, or a trusted friend's approval — before money leaves your account. Purchases that get skipped are logged as real savings, so the app rewards restraint instead of just reporting overspending.

---

## ✨ Core Features

### 🛒 Mood-Aware Browsing
A simulated shopping feed with a built-in scroll sensor. The faster and more erratically a user scrolls, the more the app infers an impulsive emotional state (Calm, Bored, Stressed, Anxious, Hyper), displayed live as a mood indicator.

### 🛑 Live Purchase Interceptor
A real-time checkout flow that runs a lightweight risk assessment on every attempted purchase — factoring in detected mood, purchase amount, and payment method — before allowing checkout to proceed.

### 🌙 Night Curfew
An automatic spending curfew (10 PM–6 AM) that gates checkout during high-risk hours, requiring extra friction before a late-night purchase can go through.

### 🌬️ Guided Reflection & Breathing Exercise
High-risk checkouts trigger a short guided breathing animation and reflection prompt, giving the user a deliberate pause before committing to a purchase.

### 👥 Buddy Approval
Risky purchases can be routed to a trusted "accountability buddy" via a unique approval code — the buddy must approve or deny the request before checkout completes.

### 🔒 24-Hour Vault
Purchases the user skips or delays are redirected into a Vault and held in a 24-hour cooling-off period before the item could be revisited — converting avoided impulse buys into tracked, real savings.

### 📊 Analytics Dashboard
Tracks spending patterns over time, including a regret score and opportunity-cost calculations, so users can see the tangible impact of mindful spending decisions.

### ⚙️ Configurable Persona Rules
User-adjustable settings including curfew toggle, auto-sync of mood detection, and sound feedback — letting the intervention style flex to the user's preference.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (via ESM/`esm.sh`, no build step) |
| UI Icons | Lucide React |
| Animation | Framer Motion |
| Auth | Firebase Authentication (email/password) |
| Styling | Custom utility-CSS layer (Tailwind-style classes) + hand-tuned design system |
| Runtime | Single self-contained HTML file — no bundler, no backend server required |

> The entire prototype runs client-side as a single `.html` file with ES module imports — making it trivially portable and easy to demo without any build tooling.

---

## 🚀 Getting Started

Follow these steps to clone and run this prototype locally on your computer:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed on your computer.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sristi67-rs/Powerpuff-Girls.git
   ```

2. **Navigate into the project folder:**
   ```bash
   cd powerpuff-pro-app
   ```

3. **Install the required dependencies:**
   ```bash
   npm install
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

Once the server starts, open your browser and go to `http://localhost:5173` to view the full-screen prototype locally.

## 📱 Walkthrough

1. **Login** — sign in with Firebase auth, or jump straight in with the demo account.
2. **Browse** — scroll a mock shopping feed; watch the mood indicator respond to scroll behavior.
3. **Checkout** — trigger the Live Interceptor, which runs a real-time risk check and, if flagged, prompts a breathing exercise or buddy approval.
4. **Vault** — see skipped purchases held in a 24-hour cooling-off period.
5. **Analytics** — review spending history, regret score, and money saved over time.

---

## 🔭 Roadmap / Future Work

- Real purchase-history integration (bank/card linking)
- ML-based mood inference beyond scroll heuristics
- Push notifications for curfew and vault expirations
- Native mobile app (iOS/Android)
