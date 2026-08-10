import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Moon, Coffee, Zap, Flame, Sparkles, Lock, ShieldCheck, TrendingDown, Check, X, ShoppingBag, BellRing, LogOut, Timer, Trash2, Unlock, Settings, Brain, Coins, Gauge, CloudMoon, Mail, KeyRound, ArrowRight, PiggyBank, LayoutGrid, BarChart3, UserCircle2, ShieldAlert, Sunrise, ShoppingCart, Package, UtensilsCrossed, Compass, Activity, Star, Headphones, Watch, Utensils, Feather, Tv, Lamp, Music, Footprints, Backpack, Shirt, Keyboard, Palette, Droplet, FlaskConical, Wind, TestTube, Paintbrush, Soup, GlassWater, Pizza, Plus, Minus, Trash, ChevronRight, Tag, Volume2, VolumeX, MessageCircle, Smartphone, UserCheck, ShieldQuestion, CheckCircle2, XCircle, Phone, Database, MapPin, CreditCard, Landmark, Loader2 } from "lucide-react";

/* ---------------- Firebase Authentication ---------------- */
// Real Firebase Authentication (email/password) lives alongside the existing
// Demo Account flow, which is left completely untouched.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ============================================================
// >>> YOUR FIREBASE PROJECT CONFIG GOES HERE <<<
// This is populated with the config you provided for the
// "zenspend-b950b" Firebase project. If you ever create a new
// Firebase project or rotate credentials, replace the object
// below with the new one from:
//   Firebase Console → Project settings → General → "Your apps" → SDK setup and configuration
// (Note: this apiKey is not a secret — it's fine for it to be visible in
// client-side code. Firebase secures your project with Security Rules and,
// optionally, API key restrictions/App Check, not by hiding this value.)
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyAN1Lf-H8gi3rT1q49CXOvuGcOTzJTLgTw",
  authDomain: "zenspend-b950b.firebaseapp.com",
  projectId: "zenspend-b950b",
  storageBucket: "zenspend-b950b.firebasestorage.app",
  messagingSenderId: "676265477471",
  appId: "1:676265477471:web:cbc9299ed4e83a0fbfa2ea"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
// Keep users signed in across browser sessions (this is also the default,
// but set explicitly so the behavior is guaranteed and documented here).
setPersistence(auth, browserLocalPersistence).catch(() => {});
// Exposed on window because the existing fraud-analysis code
// (see runFraudAnalysis below) already expects `window.auth` to read
// the current user's ID token.
window.auth = auth;

// Maps Firebase Auth error codes to short, friendly messages for the UI.
function friendlyAuthError(err) {
  const code = err && err.code;
  switch (code) {
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/missing-password":
      return "Please enter a password.";
    case "auth/email-already-in-use":
      return "An account with that email already exists — try signing in instead.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error — check your connection and try again.";
    case "auth/operation-not-allowed":
      return "Email/password sign-in isn't enabled for this project yet. Enable it in Firebase Console → Authentication → Sign-in method.";
    default:
      return "Something went wrong. Please try again.";
  }
}
const C = {
  cream: "#FDFBF7",
  white: "#FFFFFF",
  maroon: "#4A0404",
  maroonLight: "#6B0A0A",
  terracotta: "#C86B53",
  gold: "#D4AF37",
  sage: "#8A9A86",
  ink: "#2A1810",
  muted: "#8A7B6C"
};
function rgba(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
const MOODS = [{
  key: "Calm",
  icon: Coffee,
  color: C.sage
}, {
  key: "Bored",
  icon: Moon,
  color: "#8A8578"
}, {
  key: "Anxious",
  icon: Zap,
  color: C.terracotta
}, {
  key: "Stressed",
  icon: Flame,
  color: "#B8452F"
}, {
  key: "Hyper",
  icon: Sparkles,
  color: C.gold
}];
const CATEGORIES = [{
  key: "lateNightTech",
  label: "Late Night Tech",
  sub: "Gadgets bought after 11pm"
}, {
  key: "boredomFashion",
  label: "Boredom Fashion",
  sub: "Clothes browsed on a slow afternoon"
}, {
  key: "emotionalUberEats",
  label: "Emotional UberEats",
  sub: "Delivery ordered mid-spiral"
}, {
  key: "hypeSneakers",
  label: "Hype Sneakers",
  sub: "Drops you saw on a story"
}];
const CART_ITEMS = [{
  name: "Luxury Sneakers",
  price: 249.0,
  tag: "Hype Sneakers"
}, {
  name: "Vintage String Lights (12-pack)",
  price: 84.0,
  tag: "Late Night Tech"
}, {
  name: "Artisan Candle Bundle",
  price: 61.5,
  tag: "Boredom Fashion"
}, {
  name: "Impulse Tech Gadget",
  price: 132.0,
  tag: "Late Night Tech"
}, {
  name: "Late-Night Snack Haul",
  price: 38.0,
  tag: "Emotional UberEats"
}];
const PLATFORMS = [{
  key: "amazon",
  label: "Amazona",
  icon: ShoppingCart,
  tag: "Late Night Tech"
}, {
  key: "flipkart",
  label: "Flipkraft",
  icon: Package,
  tag: "Boredom Fashion"
}, {
  key: "nykaa",
  label: "Glowva",
  icon: Sparkles,
  tag: "Boredom Fashion"
}, {
  key: "ubereats",
  label: "QuickBite",
  icon: UtensilsCrossed,
  tag: "Emotional UberEats"
}];
const PRODUCTS = {
  amazon: [{
    name: "Wireless Earbuds Pro",
    price: 89.99,
    rating: 4.4,
    icon: Headphones,
    accent: C.terracotta
  }, {
    name: "Smart Fitness Watch",
    price: 149.0,
    rating: 4.2,
    icon: Watch,
    accent: C.maroon
  }, {
    name: "Compact Kitchen Blender",
    price: 45.5,
    rating: 4.6,
    icon: Utensils,
    accent: C.gold
  }, {
    name: "Premium Yoga Mat",
    price: 22.0,
    rating: 4.7,
    icon: Feather,
    accent: C.sage
  }, {
    name: "4K Streaming Stick",
    price: 38.0,
    rating: 4.3,
    icon: Tv,
    accent: C.terracotta
  }, {
    name: "Mechanical Desk Lamp",
    price: 31.5,
    rating: 4.5,
    icon: Lamp,
    accent: C.gold
  }, {
    name: "Bluetooth Party Speaker",
    price: 31.99,
    rating: 4.1,
    icon: Music,
    accent: C.terracotta
  }, {
    name: "Trail Running Shoes",
    price: 49.0,
    rating: 4.5,
    icon: Footprints,
    accent: C.sage
  }, {
    name: "Digital Air Fryer",
    price: 71.0,
    rating: 4.6,
    icon: Utensils,
    accent: C.gold
  }, {
    name: "Matte Lipstick Trio",
    price: 23.99,
    rating: 4.6,
    icon: Palette,
    accent: C.terracotta
  }],
  flipkart: [{
    name: "Bluetooth Party Speaker",
    price: 34.99,
    rating: 4.1,
    icon: Music,
    accent: C.terracotta
  }, {
    name: "Trail Running Shoes",
    price: 54.0,
    rating: 4.5,
    icon: Footprints,
    accent: C.sage
  }, {
    name: "Canvas Weekender Backpack",
    price: 39.0,
    rating: 4.3,
    icon: Backpack,
    accent: C.maroon
  }, {
    name: "Digital Air Fryer",
    price: 79.0,
    rating: 4.6,
    icon: Utensils,
    accent: C.gold
  }, {
    name: "Oversized Denim Jacket",
    price: 46.0,
    rating: 4.0,
    icon: Shirt,
    accent: C.terracotta
  }, {
    name: "Wireless Keyboard Combo",
    price: 28.5,
    rating: 4.2,
    icon: Keyboard,
    accent: C.maroon
  }, {
    name: "Wireless Earbuds Pro",
    price: 82.5,
    rating: 4.4,
    icon: Headphones,
    accent: C.terracotta
  }, {
    name: "Smart Fitness Watch",
    price: 139.0,
    rating: 4.2,
    icon: Watch,
    accent: C.maroon
  }, {
    name: "Vitamin C Serum Set",
    price: 28.99,
    rating: 4.5,
    icon: TestTube,
    accent: C.sage
  }, {
    name: "Ionic Hair Dryer",
    price: 36.5,
    rating: 4.3,
    icon: Wind,
    accent: C.maroon
  }],
  nykaa: [{
    name: "Matte Lipstick Trio",
    price: 28.0,
    rating: 4.6,
    icon: Palette,
    accent: C.terracotta
  }, {
    name: "Glow Skincare Bundle",
    price: 64.0,
    rating: 4.7,
    icon: Droplet,
    accent: C.sage
  }, {
    name: "Signature Eau de Parfum",
    price: 72.0,
    rating: 4.4,
    icon: FlaskConical,
    accent: C.gold
  }, {
    name: "Ionic Hair Dryer",
    price: 41.0,
    rating: 4.3,
    icon: Wind,
    accent: C.maroon
  }, {
    name: "Vitamin C Serum Set",
    price: 33.5,
    rating: 4.5,
    icon: TestTube,
    accent: C.sage
  }, {
    name: "Rose Gold Makeup Brushes",
    price: 26.0,
    rating: 4.2,
    icon: Paintbrush,
    accent: C.terracotta
  }],
  ubereats: [{
    name: "Butter Chicken Combo",
    price: 18.5,
    rating: 4.5,
    icon: Soup,
    accent: C.terracotta
  }, {
    name: "Loaded Momos Platter",
    price: 12.0,
    rating: 4.4,
    icon: UtensilsCrossed,
    accent: C.gold
  }, {
    name: "Truffle Loaded Fries",
    price: 9.5,
    rating: 4.2,
    icon: Flame,
    accent: "#B8452F"
  }, {
    name: "Midnight Milkshake",
    price: 6.0,
    rating: 4.6,
    icon: GlassWater,
    accent: C.sage
  }, {
    name: "Late Night Biryani Bowl",
    price: 14.0,
    rating: 4.7,
    icon: Soup,
    accent: C.maroon
  }, {
    name: "Double Cheese Pizza",
    price: 16.5,
    rating: 4.3,
    icon: Pizza,
    accent: C.terracotta
  }]
};
const COMPARISONS = [
// Amazona (amazon) items — cheaper on Flipkraft
{
  name: "Wireless Earbuds Pro",
  icon: Headphones,
  accent: C.terracotta,
  prices: {
    amazon: 89.99,
    flipkart: 82.5,
    nykaa: null,
    ubereats: null
  }
}, {
  name: "Smart Fitness Watch",
  icon: Watch,
  accent: C.maroon,
  prices: {
    amazon: 149.0,
    flipkart: 139.0,
    nykaa: null,
    ubereats: null
  }
},
// Flipkraft (flipkart) items — cheaper on Amazona
{
  name: "Bluetooth Party Speaker",
  icon: Music,
  accent: C.terracotta,
  prices: {
    amazon: 31.99,
    flipkart: 34.99,
    nykaa: null,
    ubereats: null
  }
}, {
  name: "Trail Running Shoes",
  icon: Footprints,
  accent: C.sage,
  prices: {
    amazon: 49.0,
    flipkart: 54.0,
    nykaa: null,
    ubereats: null
  }
}, {
  name: "Digital Air Fryer",
  icon: Utensils,
  accent: C.gold,
  prices: {
    amazon: 71.0,
    flipkart: 79.0,
    nykaa: null,
    ubereats: null
  }
},
// Glowva (nykaa) items — cheaper on Amazona / Flipkraft
{
  name: "Matte Lipstick Trio",
  icon: Palette,
  accent: C.terracotta,
  prices: {
    amazon: 23.99,
    flipkart: null,
    nykaa: 28.0,
    ubereats: null
  }
}, {
  name: "Vitamin C Serum Set",
  icon: TestTube,
  accent: C.sage,
  prices: {
    amazon: null,
    flipkart: 28.99,
    nykaa: 33.5,
    ubereats: null
  }
}, {
  name: "Ionic Hair Dryer",
  icon: Wind,
  accent: C.maroon,
  prices: {
    amazon: null,
    flipkart: 36.5,
    nykaa: 41.0,
    ubereats: null
  }
}, {
  name: "Glow Skincare Bundle",
  icon: Droplet,
  accent: C.sage,
  prices: {
    amazon: null,
    flipkart: null,
    nykaa: 64.0,
    ubereats: null
  }
}, {
  name: "Signature Eau de Parfum",
  icon: FlaskConical,
  accent: C.gold,
  prices: {
    amazon: null,
    flipkart: null,
    nykaa: 72.0,
    ubereats: null
  }
}
// Note: QuickBite (ubereats) is food-delivery only — its items aren't
// stocked on the general marketplaces or on Glowva, so no cross-platform
// "cheaper elsewhere" comparisons apply to them.
];
const SCROLL_STATES = [{
  level: 0,
  label: "Calm scanning",
  desc: "Reading, not reacting",
  color: "#8A9A86",
  moodIndex: 0
}, {
  level: 1,
  label: "Casual browsing",
  desc: "Passing the time",
  color: "#8A8578",
  moodIndex: 1
}, {
  level: 2,
  label: "Restless scrolling",
  desc: "Looking for a hit of something",
  color: "#C86B53",
  moodIndex: 2
}, {
  level: 3,
  label: "Frantic / mindless scrolling",
  desc: "Not really seeing what's on screen",
  color: "#B8452F",
  moodIndex: 3
}];
function classifySpeed(pxPerMs) {
  if (pxPerMs < 0.15) return 0;
  if (pxPerMs < 0.45) return 1;
  if (pxPerMs < 0.9) return 2;
  return 3;
}
const PERSONAS = [{
  key: "zen",
  label: "Zen Monk",
  desc: "Gentle, unhurried, breath-first",
  icon: Sparkles
}, {
  key: "econ",
  label: "Economist",
  desc: "Cold numbers, opportunity cost",
  icon: BarChart3
}, {
  key: "roast",
  label: "Roast Master",
  desc: "Blunt, funny, a little mean",
  icon: Flame
}];
const LINES = {
  zen: {
    cancel: (n, p) => `You let ${n} go. The cart is lighter, and so are you. ${fmt(p)} returned to the present moment.`,
    hold: (n, h) => `${n} is resting in the vault for ${h}h. Nothing is lost by waiting.`,
    confirm: n => `You chose ${n} with open eyes. That is still mindfulness.`,
    unlock: n => `${n} released early from the vault. Trust yourself.`
  },
  econ: {
    cancel: (n, p) => `${n} avoided. ${fmt(p)} redirected from depreciating asset to liquid savings.`,
    hold: (n, h) => `${n} deferred ${h}h. Delay typically reduces purchase likelihood by ~35%.`,
    confirm: n => `${n} purchased. Logged as a rational utility-maximizing decision (pending review).`,
    unlock: n => `${n} unlocked early. Opportunity cost accepted.`
  },
  roast: {
    cancel: (n, p) => `Put ${n} down. We saved you ${fmt(p)} and possibly your dignity.`,
    hold: (n, h) => `${n} is in time-out for ${h}h. Go stare at a wall instead.`,
    confirm: n => `Fine, buy the ${n}. We tried. We really did.`,
    unlock: n => `Couldn't even wait it out, could you? ${n} released.`
  }
};
let CURRENT_CURRENCY = "USD";
const INR_RATE = 83; // illustrative USD -> INR conversion rate for this sandbox

function fmt(n) {
  const amt = Number(n);
  if (CURRENT_CURRENCY === "INR") {
    return `₹${Math.round(amt * INR_RATE).toLocaleString("en-IN")}`;
  }
  return `$${amt.toFixed(2)}`;
}
function timeNow() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function regretScore(moodKey, price) {
  const risk = {
    Calm: 8,
    Bored: 30,
    Anxious: 55,
    Stressed: 68,
    Hyper: 45
  }[moodKey] || 20;
  const priceFactor = Math.min(30, price / 10);
  return Math.min(96, Math.round(risk + priceFactor));
}
function opportunityCost(price) {
  const coffees = Math.round(price / 4.5);
  const subs = (price / 15.99).toFixed(1);
  if (price > 150) return `≈ ${subs} months of a streaming subscription`;
  return `≈ ${coffees} flat white coffees`;
}
function initialVault() {
  return [{
    id: "v1",
    name: "Noise Canceling Headphones",
    price: 199,
    tag: "Late Night Tech",
    source: "Amazona",
    mood: "Stressed",
    expiresAt: Date.now() + 4 * 3600 * 1000,
    totalHours: 4,
    bundleId: null
  }, {
    id: "v2",
    name: "Mechanical Keyboard",
    price: 140,
    tag: "Late Night Tech",
    source: "Flipkraft",
    mood: "Bored",
    expiresAt: Date.now() + 18 * 3600 * 1000,
    totalHours: 18,
    bundleId: null
  }];
}
function initialLogs() {
  return [{
    time: "2:14 AM",
    text: "You almost bought a 12-pack of vintage lights. We saved you $84. Go to bed."
  }, {
    time: "6:40 PM",
    text: "Cart abandoned. Self-respect: restocked."
  }, {
    time: "Yesterday",
    text: "Held the wireless earbuds for 24h. You never went back for them."
  }, {
    time: "Mon",
    text: "Detected scrolling + sighing. Classic pre-purchase combo. Intercepted."
  }];
}
function initialPurchaseHistory() {
  return [{
    id: "p1",
    name: "Reusable Coffee Cup Set",
    price: 24.0,
    moodKey: "Calm",
    date: "Jul 28"
  }, {
    id: "p2",
    name: "Desk Plant",
    price: 18.5,
    moodKey: "Bored",
    date: "Jul 25"
  }, {
    id: "p3",
    name: "Weighted Blanket",
    price: 89.0,
    moodKey: "Anxious",
    date: "Jul 21"
  }, {
    id: "p4",
    name: "Concert Tickets",
    price: 120.0,
    moodKey: "Hyper",
    date: "Jul 14"
  }];
}
function fmtRemaining(ms) {
  if (ms <= 0) return "Unlocked";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms % 3600000 / 60000);
  return `${h}h ${m}m left`;
}
function genApprovalCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}
function isNightCurfew(curfewEnabled, forceCurfewDemo) {
  if (!curfewEnabled) return false;
  if (forceCurfewDemo) return true;
  const hour = new Date().getHours();
  return hour >= 22 || hour < 6;
}

// Night curfew reflection: a brief 3-question check-in that has to be
// answered before a curfew-hour cart can move on to confirm/hold/cancel.
// Answers aren't graded — the point is the pause, not gatekeeping — but we
// use them to surface one gentle, honest nudge afterward.
const REFLECTION_QUESTIONS = [{
  key: "emotion",
  q: "What emotion is driving this purchase right now?",
  options: ["Boredom", "Stress", "Excitement", "Need"]
}, {
  key: "solves",
  q: "Will this solve an immediate problem tomorrow morning?",
  options: ["Yes", "No"]
}, {
  key: "wait",
  q: "Are you willing to wait until 8:00 AM to buy this?",
  options: ["Yes", "No"]
}];
function reflectionNudge(reflection) {
  if (reflection.wait === "Yes") return "Since you're open to waiting, holding this for a few hours costs you nothing.";
  if (reflection.solves === "No" && (reflection.emotion === "Boredom" || reflection.emotion === "Stress")) {
    return "This reads more like an emotional spend than a need — maybe let it sit till morning.";
  }
  if (reflection.solves === "Yes" && reflection.emotion === "Need") return "Sounds like a genuine need — trust your read on that.";
  return null;
}

/* ---------------- Fraud detection: backend call + silent mock fallback ---------------- */

const FRAUD_API_URL = "http://localhost:8000/api/fraud-check";

// If the FastAPI backend is unreachable (e.g. during frontend-only preview),
// we never surface that to the user. We silently produce one of the two
// approved copy blocks below so the UI always looks fully functional.
// UPI is treated as a pre-verified, trusted rail for this wallet (linked bank
// UPI IDs go through an extra verification step at link-time), so it never
// gets caught by the mood/curfew/price friction checks below — it's always
// a normal, successful payment path.
const TRUSTED_PAYMENT_METHODS = ["upi"];
function mockFraudResult({
  amount,
  moodKey,
  inCurfew,
  priceThreshold,
  address,
  paymentDetail,
  paymentMethod
}) {
  const isTrustedMethod = TRUSTED_PAYMENT_METHODS.includes(paymentMethod);
  const elevated = !isTrustedMethod && (amount > priceThreshold * 1.4 || moodKey === "Stressed" || moodKey === "Anxious" || inCurfew);
  const addrText = address && address.trim() ? address : "the delivery address on this order";
  const payText = paymentDetail && paymentDetail.trim() ? paymentDetail : "the payment ID on this order";
  if (elevated) {
    const score = 78 + Math.floor(Math.random() * 12); // 78-89
    const riskReasons = [`${payText} was only linked to an account 2 hours ago — newly-created payment IDs are strongly correlated with fraud.`, `${addrText} has been flagged in 14 previous failed or disputed transactions.`, `A location mismatch was detected between this account's usual activity region and ${addrText}.`, `${payText} shows a burst of 6 transaction attempts across different merchants in the last 30 minutes.`];
    // Always lead with the newly-linked-payment reason, then add one more for variety.
    const second = riskReasons[1 + Math.floor(Math.random() * (riskReasons.length - 1))];
    return {
      score,
      status: score >= 85 ? "High Risk" : "Elevated Risk",
      explanation: `${riskReasons[0]} ${second}`
    };
  }
  const score = 6 + Math.floor(Math.random() * 14); // 6-19

  if (isTrustedMethod) {
    return {
      score,
      status: "Safe",
      explanation: `${payText} is a verified UPI ID with a consistent transaction history — UPI payments on this wallet skip additional review.`
    };
  }
  const safeReasons = [`${payText} has a 3-year established history with regular, consistent activity.`, `${addrText} matches the verified billing location on file for this account.`, `No prior disputes, chargebacks, or failed-delivery reports are associated with ${addrText}.`];
  return {
    score,
    status: "Safe",
    explanation: `${safeReasons[0]} ${safeReasons[1]}`
  };
}
async function runFraudAnalysis(payload) {
  try {
    // 1. Get current user and secure token
    const user = window.auth ? window.auth.currentUser : null;
    let token = "";
    if (user) {
      token = await user.getIdToken();
    } else {
      console.warn("No user is logged in! Backend will likely reject this.");
    }

    // 2. Send request WITH the token
    const res = await fetch(FRAUD_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // <--- Token sent here!
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("non-200");
    const data = await res.json();
    if (typeof data.risk_score !== "number" || !data.status || !data.explanation) throw new Error("bad shape");
    return {
      score: Math.round(data.risk_score),
      status: data.status,
      explanation: data.explanation
    };
  } catch (e) {
    // Silent fallback — never shown to the user as an error.
    return mockFraudResult(payload);
  }
}

/* ---------------- Ambient sound manager (Web Audio API, no external files) ---------------- */

let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    _audioCtx = new Ctx();
  }
  if (_audioCtx.state === "suspended") _audioCtx.resume();
  return _audioCtx;
}
function playClink(enabled) {
  if (!enabled) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(1046.5, now);
  osc1.frequency.exponentialRampToValueAtTime(1568, now + 0.09);
  gain1.gain.setValueAtTime(0.0001, now);
  gain1.gain.exponentialRampToValueAtTime(0.15, now + 0.012);
  gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
  osc1.connect(gain1).connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.65);
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(2093, now);
  gain2.gain.setValueAtTime(0.0001, now);
  gain2.gain.exponentialRampToValueAtTime(0.07, now + 0.012);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
  osc2.connect(gain2).connect(ctx.destination);
  osc2.start(now);
  osc2.stop(now + 0.45);
}
function startBreathingAmbience(enabled) {
  if (!enabled) return () => {};
  const ctx = getAudioCtx();
  if (!ctx) return () => {};
  const bufferSize = Math.floor(ctx.sampleRate * 2);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.6;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 450;
  const gain = ctx.createGain();
  gain.gain.value = 0.02;
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.14;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.022;
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);
  noise.connect(filter).connect(gain).connect(ctx.destination);
  noise.start();
  lfo.start();
  const now = ctx.currentTime;
  const bell = ctx.createOscillator();
  const bellGain = ctx.createGain();
  bell.type = "sine";
  bell.frequency.value = 528;
  bellGain.gain.setValueAtTime(0.0001, now);
  bellGain.gain.exponentialRampToValueAtTime(0.06, now + 0.06);
  bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
  bell.connect(bellGain).connect(ctx.destination);
  bell.start(now);
  bell.stop(now + 2.3);
  return () => {
    try {
      noise.stop();
      lfo.stop();
    } catch (e) {}
    try {
      noise.disconnect();
      filter.disconnect();
      gain.disconnect();
      lfo.disconnect();
      lfoGain.disconnect();
    } catch (e) {}
  };
}

/* ---------------- Login ---------------- */

function LoginScreen({
  onDemoLogin
}) {
  const [ticker, setTicker] = useState(0);
  const tickerItems = ["Blocked $84 · vintage lights · 2:14 AM", "Held $199 · headphones · vault, 4h", "Blocked $61 · candle bundle · boredom", "Held $140 · keyboard · vault, 18h"];
  useEffect(() => {
    const id = setInterval(() => setTicker(t => (t + 1) % tickerItems.length), 2600);
    return () => clearInterval(id);
  }, []);
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validate = () => {
    if (mode === "signup" && !name.trim()) return "Please enter your name.";
    if (!email.trim()) return "Please enter your email address.";
    if (!emailRe.test(email.trim())) return "That email address doesn't look right.";
    if (!password) return "Please enter your password.";
    if (mode === "signup" && password.length < 6) return "Password should be at least 6 characters.";
    if (mode === "signup" && password !== confirmPassword) return "Passwords don't match.";
    return "";
  };
  const handleSubmit = async e => {
    if (e && e.preventDefault) e.preventDefault();
    if (loading) return;
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        // Best-effort — if this fails the account still exists, we just
        // fall back to showing their email in the navbar instead of a name.
        try {
          await updateProfile(cred.user, { displayName: name.trim() });
        } catch (e2) {}
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      // On success, the app-level onAuthStateChanged listener picks up the
      // signed-in user and navigates to the dashboard automatically.
    } catch (err) {
      setError(friendlyAuthError(err));
      setLoading(false);
    }
  };
  const switchMode = next => {
    setMode(next);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen w-full flex items-stretch",
    style: {
      backgroundColor: C.cream,
      fontFamily: "'Inter', system-ui, sans-serif"
    }
  }, /*#__PURE__*/React.createElement("style", null, globalStyles), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:flex md:w-1/2 p-10 items-center justify-center relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden",
    style: {
      background: `radial-gradient(circle at 85% 15%, ${rgba(C.gold, 0.35)} 0%, transparent 40%), linear-gradient(160deg, ${C.terracotta} 0%, ${rgba(C.terracotta, 0.75)} 45%, ${C.cream} 100%)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute rounded-full",
    style: {
      width: "260px",
      height: "260px",
      top: "-60px",
      right: "-60px",
      border: `1px solid ${rgba("#FFFFFF", 0.25)}`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute rounded-full",
    style: {
      width: "180px",
      height: "180px",
      top: "-20px",
      right: "-20px",
      border: `1px solid ${rgba("#FFFFFF", 0.2)}`
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full flex items-center justify-center mb-6 relative",
    style: {
      backgroundColor: rgba("#FFFFFF", 0.25)
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute rounded-full",
    style: {
      inset: "-6px",
      border: `1px solid ${rgba("#FFFFFF", 0.35)}`
    }
  }), /*#__PURE__*/React.createElement(Wallet, {
    size: 24,
    color: "#FFFFFF"
  })), /*#__PURE__*/React.createElement("h2", {
    className: "zs-display text-3xl font-semibold text-white leading-tight mb-3"
  }, "Spend on purpose,", /*#__PURE__*/React.createElement("br", null), "not on impulse."), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-white/85 max-w-full"
  }, "ZenSpend watches the moment right before checkout — the one where your mood, not your budget, is driving.")), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 backdrop-blur-md",
    style: {
      backgroundColor: rgba("#FFFFFF", 0.9)
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium mb-2 flex items-center gap-1.5",
    style: {
      color: C.maroon
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full",
    style: {
      backgroundColor: C.sage
    }
  }), "Live prevented purchases"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium log-enter",
    key: ticker,
    style: {
      color: C.ink
    }
  }, tickerItems[ticker])))), /*#__PURE__*/React.createElement("div", {
    className: "w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-full flex items-center justify-center relative",
    style: {
      backgroundColor: C.maroon,
      boxShadow: `0 0 0 3px ${rgba(C.gold, 0.3)}`
    }
  }, /*#__PURE__*/React.createElement(Wallet, {
    size: 20,
    color: C.cream
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "zs-display text-xl font-semibold",
    style: {
      color: C.maroon
    }
  }, "ZenSpend"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "Mindful Wallet"))), /*#__PURE__*/React.createElement("h2", {
    className: "zs-display text-2xl font-semibold mb-1",
    style: {
      color: C.maroon
    }
  }, mode === "signup" ? "Create your account" : "Welcome back"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm mb-6",
    style: {
      color: C.muted
    }
  }, mode === "signup" ? "Set up your mindful wallet in a few seconds." : "Sign in to your mindful wallet."), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 mb-4"
  }, mode === "signup" ? /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl px-3.5 py-3 border",
    style: {
      borderColor: rgba(C.maroon, 0.12),
      backgroundColor: C.white
    }
  }, /*#__PURE__*/React.createElement(UserCircle2, {
    size: 16,
    color: C.muted
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    autoComplete: "name",
    placeholder: "Your name",
    className: "w-full text-sm outline-none bg-transparent",
    style: {
      color: C.ink,
      border: "none",
      boxShadow: "none",
      WebkitAppearance: "none",
      appearance: "none"
    },
    value: name,
    onChange: e => setName(e.target.value),
    disabled: loading
  })) : null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl px-3.5 py-3 border",
    style: {
      borderColor: rgba(C.maroon, 0.12),
      backgroundColor: C.white
    }
  }, /*#__PURE__*/React.createElement(Mail, {
    size: 16,
    color: C.muted
  }), /*#__PURE__*/React.createElement("input", {
    type: "email",
    autoComplete: "email",
    placeholder: "you@email.com",
    className: "w-full text-sm outline-none bg-transparent",
    style: {
      color: C.ink,
      border: "none",
      boxShadow: "none",
      WebkitAppearance: "none",
      appearance: "none"
    },
    value: email,
    onChange: e => setEmail(e.target.value),
    disabled: loading
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl px-3.5 py-3 border",
    style: {
      borderColor: rgba(C.maroon, 0.12),
      backgroundColor: C.white
    }
  }, /*#__PURE__*/React.createElement(KeyRound, {
    size: 16,
    color: C.muted
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    autoComplete: mode === "signup" ? "new-password" : "current-password",
    placeholder: "Password",
    className: "w-full text-sm outline-none bg-transparent",
    style: {
      color: C.ink,
      border: "none",
      boxShadow: "none",
      WebkitAppearance: "none",
      appearance: "none"
    },
    value: password,
    onChange: e => setPassword(e.target.value),
    disabled: loading
  })), mode === "signup" && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 rounded-xl px-3.5 py-3 border",
    style: {
      borderColor: rgba(C.maroon, 0.12),
      backgroundColor: C.white
    }
  }, /*#__PURE__*/React.createElement(KeyRound, {
    size: 16,
    color: C.muted
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    autoComplete: "new-password",
    placeholder: "Confirm password",
    className: "w-full text-sm outline-none bg-transparent",
    style: {
      color: C.ink,
      border: "none",
      boxShadow: "none",
      WebkitAppearance: "none",
      appearance: "none"
    },
    value: confirmPassword,
    onChange: e => setConfirmPassword(e.target.value),
    disabled: loading
  }))), error && /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-2 rounded-xl px-3.5 py-2.5 mb-4 text-xs",
    style: {
      backgroundColor: rgba("#B3261E", 0.08),
      color: "#B3261E"
    }
  }, /*#__PURE__*/React.createElement(ShieldAlert, {
    size: 14,
    className: "mt-0.5 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", null, error)), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: loading,
    className: "zs-track w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 mb-4",
    style: {
      backgroundColor: C.maroon,
      color: C.cream,
      opacity: loading ? 0.75 : 1
    }
  }, loading ? /*#__PURE__*/React.createElement(Loader2, {
    size: 15,
    className: "animate-spin"
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, mode === "signup" ? "Sign up" : "Sign in", " ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 15
  })))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-center mb-4 flex items-center justify-center gap-2 flex-wrap",
    style: {
      color: C.muted
    }
  }, mode === "signup" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "Already have an account?"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => switchMode("signin"),
    disabled: loading,
    className: "zs-track font-semibold text-xs rounded-full px-3 py-1.5",
    style: {
      color: C.maroon,
      backgroundColor: rgba(C.maroon, 0.06),
      border: `1px solid ${rgba(C.maroon, 0.18)}`
    }
  }, "Sign in")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "New to ZenSpend?"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => switchMode("signup"),
    disabled: loading,
    className: "zs-track font-semibold text-xs rounded-full px-3 py-1.5",
    style: {
      color: C.maroon,
      backgroundColor: rgba(C.maroon, 0.06),
      border: `1px solid ${rgba(C.maroon, 0.18)}`
    }
  }, "Create an account"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 h-px",
    style: {
      backgroundColor: rgba(C.maroon, 0.12)
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "or"), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 h-px",
    style: {
      backgroundColor: rgba(C.maroon, 0.12)
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onDemoLogin,
    disabled: loading,
    className: "zs-track w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2",
    style: {
      borderColor: C.gold,
      backgroundColor: rgba(C.gold, 0.12),
      color: C.maroon,
      boxShadow: `0 0 0 3px ${rgba(C.gold, 0.1)}`
    }
  }, "⚡ Continue with Dummy Account"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-center mt-3",
    style: {
      color: C.muted
    }
  }, "Loads a pre-populated dummy account — no signup needed."))));
}

/* ---------------- Navbar ---------------- */

function Navbar({
  activeTab,
  setActiveTab,
  onLogout,
  soundEnabled,
  setSoundEnabled,
  isDemo,
  userEmail
}) {
  const tabs = [{
    key: "browse",
    label: "Browse",
    icon: Compass
  }, {
    key: "interceptor",
    label: "Live Interceptor",
    icon: ShoppingBag
  }, {
    key: "vault",
    label: "The 24h Vault",
    icon: Lock
  }, {
    key: "analytics",
    label: "Mindful Analytics",
    icon: BarChart3
  }, {
    key: "persona",
    label: "AI Persona & Rules",
    icon: Settings
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "sticky top-3 z-20 mx-4 sm:mx-6 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-1 rounded-full mb-2",
    style: {
      background: `linear-gradient(90deg, ${C.maroon}, ${C.terracotta}, ${C.gold})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl px-4 py-3 flex items-center justify-between flex-wrap gap-3",
    style: {
      backgroundColor: rgba("#FFFFFF", 0.8),
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: `1px solid ${rgba(C.maroon, 0.08)}`,
      boxShadow: "0 4px 20px rgba(74,4,4,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-full flex items-center justify-center relative",
    style: {
      backgroundColor: C.maroon,
      boxShadow: `0 0 0 3px ${rgba(C.gold, 0.35)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute rounded-full",
    style: {
      inset: "-4px",
      border: `1px solid ${rgba(C.gold, 0.4)}`
    }
  }), /*#__PURE__*/React.createElement(Wallet, {
    size: 16,
    color: C.cream
  })), /*#__PURE__*/React.createElement("span", {
    className: "zs-display font-semibold text-sm hidden sm:block",
    style: {
      color: C.maroon
    }
  }, "ZenSpend")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 rounded-xl p-1 flex-wrap",
    style: {
      backgroundColor: rgba(C.maroon, 0.05)
    }
  }, tabs.map(t => {
    const Icon = t.icon;
    const active = activeTab === t.key;
    return /*#__PURE__*/React.createElement("button", {
      key: t.key,
      onClick: () => setActiveTab(t.key),
      className: "zs-track flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium",
      style: {
        backgroundColor: active ? C.maroon : "transparent",
        color: active ? C.cream : C.muted
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 14
    }), /*#__PURE__*/React.createElement("span", {
      className: "hidden md:block"
    }, t.label));
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSoundEnabled(!soundEnabled),
    className: "zs-track w-8 h-8 rounded-full flex items-center justify-center",
    style: {
      backgroundColor: rgba(C.maroon, 0.06)
    },
    "aria-label": "Toggle ambient sound"
  }, soundEnabled ? /*#__PURE__*/React.createElement(Volume2, {
    size: 14,
    color: C.maroon
  }) : /*#__PURE__*/React.createElement(VolumeX, {
    size: 14,
    color: C.maroon
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 pl-1 pr-3 py-1 rounded-full",
    style: {
      backgroundColor: rgba(C.gold, 0.15)
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-6 h-6 rounded-full flex items-center justify-center",
    style: {
      backgroundColor: C.gold
    }
  }, /*#__PURE__*/React.createElement(UserCircle2, {
    size: 14,
    color: C.maroon
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-medium hidden sm:block truncate",
    style: {
      color: C.maroon,
      maxWidth: "140px"
    }
  }, isDemo ? "Dummy account" : userEmail || "Account")), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "zs-track w-8 h-8 rounded-full flex items-center justify-center",
    style: {
      backgroundColor: rgba(C.maroon, 0.06)
    },
    "aria-label": "Switch account or log out"
  }, /*#__PURE__*/React.createElement(LogOut, {
    size: 14,
    color: C.maroon
  })))));
}

/* ---------------- Live Interceptor tab ---------------- */

function Interceptor({
  state,
  actions
}) {
  const {
    moodIndex,
    cartIdx,
    phase,
    countdown,
    persona,
    priceThreshold,
    curfewEnabled,
    forceCurfewDemo,
    cartItems,
    scrollSensitivity,
    soundEnabled
  } = state;
  const mood = MOODS[moodIndex];

  // Night curfew reflection state: which question we're on and what's been
  // answered so far. Freshly reset every time a new cart enters the
  // breathing/intercept flow so a stale answer never carries over.
  const [reflection, setReflection] = useState({
    step: 0,
    emotion: null,
    solves: null,
    wait: null
  });
  useEffect(() => {
    if (phase === "intercept" || phase === "curfew_reflect") setReflection({
      step: 0,
      emotion: null,
      solves: null,
      wait: null
    });
  }, [phase, cartIdx]);
  useEffect(() => {
    if (phase !== "intercept") return;
    const stop = startBreathingAmbience(soundEnabled);
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // No dummy fallback: an empty cart should render an empty-cart state,
  // not a randomly-picked item from CART_ITEMS.
  const cart = cartItems.length > 0 ? {
    name: cartItems.length === 1 ? cartItems[0].name : `${cartItems.length} items`,
    price: cartItems.reduce((sum, it) => sum + it.price, 0),
    tag: cartItems[0].tag,
    source: [...new Set(cartItems.map(it => it.source))].join(", "),
    items: cartItems
  } : null;
  const inCurfew = isNightCurfew(curfewEnabled, forceCurfewDemo);
  const overThresholdItems = cartItems.filter(it => it.price > priceThreshold);
  const highRisk = cart ? mood.key !== "Calm" : false;
  const regret = cart ? regretScore(mood.key, cart.price) : 0;
  const gaugePct = regret;

  // ---- New realistic checkout flow: address -> payment -> confirm -> fraud analysis ----
  const DUMMY_ADDRESSES = [{
    key: "home",
    label: "Home",
    detail: "123 Main St, Apt 4B, Springfield"
  }, {
    key: "office",
    label: "Office",
    detail: "456 Tech Park, Tower 2, Bengaluru"
  }];
  const DUMMY_NETBANK = {
    key: "hdfc",
    label: "HDFC Bank",
    detail: "•••• 1234"
  };
  const DUMMY_CARD = {
    key: "visa",
    label: "Visa",
    detail: "•••• 5678"
  };
  const DUMMY_UPI = {
    key: "okbank",
    label: "user@okbank",
    detail: "Linked UPI ID"
  };
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [customAddress, setCustomAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null); // "upi" | "netbanking" | "card"
  const [selectedDummyPayment, setSelectedDummyPayment] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fraudLoading, setFraudLoading] = useState(false);
  const [fraudResult, setFraudResult] = useState(null);

  // Fresh slate every time a new checkout enters the address step.
  useEffect(() => {
    if (phase === "address") {
      setSelectedAddress(null);
      setCustomAddress("");
      setPaymentMethod(null);
      setSelectedDummyPayment(null);
      setUpiId("");
      setAccountNumber("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
      setShowConfirmModal(false);
      setFraudLoading(false);
      setFraudResult(null);
    }
  }, [phase]);

  // Kick off the (mocked-if-needed) fraud analysis as soon as we land on this step.
  useEffect(() => {
    if (phase !== "fraud_analysis" || !cart) return;
    let cancelled = false;
    setFraudLoading(true);
    setFraudResult(null);
    const payload = {
      amount: cart.price,
      currency: state.currency || "USD",
      moodKey: mood.key,
      inCurfew,
      priceThreshold,
      paymentMethod,
      address: selectedAddress ? selectedAddress.detail : customAddress,
      paymentDetail: paymentSummaryLabel()
    };
    const t = setTimeout(() => {
      runFraudAnalysis(payload).then(result => {
        if (!cancelled) {
          setFraudResult(result);
          setFraudLoading(false);
        }
      });
    }, 1100);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);
  const addressChosen = !!selectedAddress || customAddress.trim().length > 0;
  const paymentReady = paymentMethod === "upi" ? !!selectedDummyPayment || upiId.trim().length > 0 : paymentMethod === "netbanking" ? !!selectedDummyPayment || accountNumber.trim().length > 0 : paymentMethod === "card" ? !!selectedDummyPayment || cardNumber.trim().length > 0 && cardExpiry.trim().length > 0 && cardCvv.trim().length > 0 : false;
  const paymentSummaryLabel = () => {
    if (selectedDummyPayment) return selectedDummyPayment.label + " " + selectedDummyPayment.detail;
    if (paymentMethod === "upi") return upiId;
    if (paymentMethod === "netbanking") return `Account •••• ${accountNumber.slice(-4)}`;
    if (paymentMethod === "card") return `Card •••• ${cardNumber.slice(-4)}`;
    return "";
  };
  const statusColor = status => status === "Safe" ? C.sage : status === "High Risk" ? C.terracotta : C.gold;
  return /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-6",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`,
      boxShadow: "0 2px 10px rgba(74,4,4,0.07)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "zs-display text-lg font-semibold mb-4",
    style: {
      color: C.maroon
    }
  }, "Profile"), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-5 mb-6 relative",
    style: {
      backgroundColor: rgba(C.gold, 0.1),
      border: `1px solid ${rgba(C.gold, 0.3)}`
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs uppercase tracking-wide mb-1",
    style: {
      color: C.muted
    }
  }, "Mindfulness balance"), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-3xl font-bold",
    style: {
      color: C.maroon
    }
  }, state.streak * 25, " pts"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-1",
    style: {
      color: "#B8935F"
    }
  }, state.streak, "-cart mindful streak")), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 mb-6 flex items-center gap-3",
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement(mood.icon, {
    size: 18,
    color: mood.color
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "Current mood"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold",
    style: {
      color: mood.color
    }
  }, mood.key)), /*#__PURE__*/React.createElement("span", {
    className: "text-xs ml-auto",
    style: {
      color: C.muted
    }
  }, "set in Browse")), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 mb-6",
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium",
    style: {
      color: C.maroon
    }
  }, "Scroll sensitivity"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold",
    style: {
      color: C.muted
    }
  }, scrollSensitivity <= 0.5 ? "Low" : scrollSensitivity <= 1 ? "Medium" : "High")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0.25",
    max: "2",
    step: "0.25",
    value: scrollSensitivity,
    onChange: e => actions.setScrollSensitivity(parseFloat(e.target.value)),
    className: "w-full",
    style: {
      accentColor: C.maroon
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-1",
    style: {
      color: C.muted
    }
  }, "Controls how easily scrolling in Browse shifts your mood.")), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium mb-3",
    style: {
      color: C.maroon
    }
  }, "Blocked categories"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, CATEGORIES.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.key,
    className: "flex items-center justify-between p-3 rounded-xl",
    style: {
      backgroundColor: state.blocked[c.key] ? rgba(C.terracotta, 0.1) : "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium",
    style: {
      color: C.maroon
    }
  }, c.label), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, c.sub)), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.toggleCategory(c.key),
    className: "zs-toggle w-10 h-6 rounded-full relative flex-shrink-0",
    style: {
      backgroundColor: state.blocked[c.key] ? C.terracotta : "#E5DFD3"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all",
    style: {
      left: state.blocked[c.key] ? "18px" : "2px"
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-6 relative overflow-hidden",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`,
      boxShadow: "0 2px 10px rgba(74,4,4,0.07)",
      minHeight: "520px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "zs-display text-lg font-semibold mb-4",
    style: {
      color: C.maroon
    }
  }, "Checkout sandbox"), phase === "vaulted" ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-16 log-enter"
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 28,
    color: C.gold,
    className: "mx-auto mb-3"
  }), /*#__PURE__*/React.createElement("p", {
    className: "zs-display font-semibold mb-1",
    style: {
      color: C.maroon
    }
  }, "Moved to your 24h Vault"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm max-w-full mx-auto",
    style: {
      color: C.muted
    }
  }, "Everything in that cart was over your ", fmt(priceThreshold), " threshold, so it's cooling off in the Vault for 24 hours instead.")) : !cart ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center text-center py-16 px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl flex items-center justify-center mb-4",
    style: {
      backgroundColor: rgba(C.maroon, 0.06)
    }
  }, /*#__PURE__*/React.createElement(ShoppingBag, {
    size: 26,
    color: C.muted
  })), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-base font-semibold mb-1.5",
    style: {
      color: C.maroon
    }
  }, "Your cart is empty"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm max-w-full",
    style: {
      color: C.muted
    }
  }, "Head to the Browse tab and add a few items to see the checkout sandbox in action."), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.setActiveTab("browse"),
    className: "zs-track mt-5 px-4 py-2.5 rounded-xl text-sm font-medium",
    style: {
      backgroundColor: rgba(C.maroon, 0.08),
      color: C.maroon
    }
  }, "Go to Browse to add items")) : /*#__PURE__*/React.createElement(React.Fragment, null, (phase === "idle" || phase === "success") && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-5 mb-4",
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
    style: {
      backgroundColor: rgba(C.maroon, 0.08)
    }
  }, /*#__PURE__*/React.createElement(ShoppingBag, {
    size: 22,
    color: C.maroon
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs uppercase tracking-wide mb-0.5",
    style: {
      color: C.muted
    }
  }, "Cart · ", cart.tag, cart.source ? ` · via ${cart.source}` : ""), /*#__PURE__*/React.createElement("p", {
    className: "font-medium",
    style: {
      color: C.maroon
    }
  }, cart.name)), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-xl font-bold",
    style: {
      color: C.maroon
    }
  }, fmt(cart.price))), cart.items && cart.items.length > 1 && /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-3 space-y-1",
    style: {
      borderTop: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, cart.items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    className: "flex items-center justify-between text-xs",
    style: {
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement("span", null, it.name), /*#__PURE__*/React.createElement("span", null, fmt(it.price)))))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 mb-4",
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1.5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium flex items-center gap-1.5",
    style: {
      color: C.maroon
    }
  }, /*#__PURE__*/React.createElement(Gauge, {
    size: 13
  }), " 30-day regret probability"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold",
    style: {
      color: C.terracotta
    }
  }, gaugePct, "%")), /*#__PURE__*/React.createElement("div", {
    className: "h-2.5 rounded-full overflow-hidden",
    style: {
      backgroundColor: rgba(C.maroon, 0.08)
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-full",
    style: {
      width: `${gaugePct}%`,
      background: `linear-gradient(90deg, ${C.sage}, ${C.terracotta}, ${C.gold})`
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-2 flex items-center gap-1.5",
    style: {
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement(Coins, {
    size: 12
  }), " Opportunity cost: ", opportunityCost(cart.price))), phase === "success" ? /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-6 text-center log-enter",
    style: {
      backgroundColor: rgba(C.sage, 0.15)
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 28,
    color: C.sage,
    className: "mx-auto mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "zs-display font-semibold mb-4",
    style: {
      color: C.maroon
    }
  }, "Purchase authorized mindfully. Enjoy!"), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.continueShopping(),
    className: "zs-track w-full py-3 rounded-2xl font-semibold text-sm",
    style: {
      backgroundColor: C.maroon,
      color: C.cream
    }
  }, "Continue shopping")) : /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.startCheckout(),
    className: "zs-track w-full py-4 rounded-2xl font-semibold text-base",
    style: {
      backgroundColor: C.maroon,
      color: C.cream
    }
  }, "Proceed to checkout"), overThresholdItems.length > 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-center mt-3 flex items-center justify-center gap-1.5",
    style: {
      color: "#B8935F"
    }
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 12
  }), " ", overThresholdItems.length, " item", overThresholdItems.length > 1 ? "s" : "", " over ", fmt(priceThreshold), " will auto-move to the 24h Vault"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-center mt-3",
    style: {
      color: "#B5AA9C"
    }
  }, inCurfew ? "Night curfew active — a quick reflection runs before checkout. " : "", highRisk ? "remaining items will be gated" : "checkout flows freely")), phase === "address" && /*#__PURE__*/React.createElement("div", {
    className: "log-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 mb-4 flex items-center justify-between",
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs uppercase tracking-wide",
    style: {
      color: C.muted
    }
  }, "Total to pay"), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-xl font-bold",
    style: {
      color: C.maroon
    }
  }, fmt(cart.price))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium mb-3 flex items-center gap-1.5",
    style: {
      color: C.maroon
    }
  }, /*#__PURE__*/React.createElement(MapPin, {
    size: 14
  }), " Delivery address"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 mb-3"
  }, DUMMY_ADDRESSES.map(addr => /*#__PURE__*/React.createElement("button", {
    key: addr.key,
    onClick: () => {
      setSelectedAddress(addr);
      setCustomAddress("");
    },
    className: "zs-track w-full text-left p-3.5 rounded-xl border flex items-start gap-3",
    style: {
      borderColor: selectedAddress?.key === addr.key ? C.maroon : rgba(C.maroon, 0.1),
      backgroundColor: selectedAddress?.key === addr.key ? rgba(C.gold, 0.1) : "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
    style: {
      backgroundColor: rgba(C.maroon, 0.08)
    }
  }, /*#__PURE__*/React.createElement(MapPin, {
    size: 14,
    color: C.maroon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold",
    style: {
      color: C.maroon
    }
  }, addr.label), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, addr.detail)), selectedAddress?.key === addr.key && /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 16,
    color: C.sage,
    className: "ml-auto flex-shrink-0"
  })))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium mb-1.5",
    style: {
      color: C.muted
    }
  }, "Or enter a new address"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: customAddress,
    onChange: e => {
      setCustomAddress(e.target.value);
      if (e.target.value) setSelectedAddress(null);
    },
    placeholder: "Street, city, postal code",
    className: "w-full p-3 rounded-xl text-sm mb-5 outline-none",
    style: {
      backgroundColor: "#FAF8F3",
      border: `1px solid ${rgba(C.maroon, 0.1)}`,
      color: C.ink
    }
  }), /*#__PURE__*/React.createElement("button", {
    disabled: !addressChosen,
    onClick: () => actions.setPhase("payment_selection"),
    className: "zs-track w-full py-4 rounded-2xl font-semibold text-base",
    style: {
      backgroundColor: addressChosen ? C.maroon : rgba(C.maroon, 0.25),
      color: C.cream,
      cursor: addressChosen ? "pointer" : "not-allowed"
    }
  }, "Save & Continue")), phase === "payment_selection" && /*#__PURE__*/React.createElement("div", {
    className: "log-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 mb-4 flex items-center justify-between",
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs uppercase tracking-wide",
    style: {
      color: C.muted
    }
  }, "Total to pay"), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-xl font-bold",
    style: {
      color: C.maroon
    }
  }, fmt(cart.price))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium mb-3",
    style: {
      color: C.maroon
    }
  }, "Select payment method"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 mb-4"
  }, [{
    key: "upi",
    label: "UPI",
    icon: Smartphone
  }, {
    key: "netbanking",
    label: "Net Banking",
    icon: Landmark
  }, {
    key: "card",
    label: "Card",
    icon: CreditCard
  }].map(m => /*#__PURE__*/React.createElement("button", {
    key: m.key,
    onClick: () => {
      setPaymentMethod(m.key);
      setSelectedDummyPayment(null);
    },
    className: "zs-track flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium",
    style: {
      borderColor: paymentMethod === m.key ? C.maroon : rgba(C.maroon, 0.1),
      backgroundColor: paymentMethod === m.key ? rgba(C.gold, 0.1) : "#FAF8F3",
      color: C.maroon
    }
  }, /*#__PURE__*/React.createElement(m.icon, {
    size: 18,
    color: C.maroon
  }), m.label))), paymentMethod === "upi" && /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setSelectedDummyPayment(DUMMY_UPI);
      setUpiId("");
    },
    className: "zs-track w-full text-left p-3.5 rounded-xl border flex items-center gap-3 mb-3",
    style: {
      borderColor: selectedDummyPayment?.key === "okbank" ? C.maroon : rgba(C.maroon, 0.1),
      backgroundColor: selectedDummyPayment?.key === "okbank" ? rgba(C.gold, 0.1) : "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement(Smartphone, {
    size: 16,
    color: C.maroon
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold",
    style: {
      color: C.maroon
    }
  }, DUMMY_UPI.label), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, DUMMY_UPI.detail)), selectedDummyPayment?.key === "okbank" && /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 16,
    color: C.sage,
    className: "ml-auto flex-shrink-0"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium mb-1.5",
    style: {
      color: C.muted
    }
  }, "Or enter a UPI ID"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: upiId,
    onChange: e => {
      setUpiId(e.target.value);
      if (e.target.value) setSelectedDummyPayment(null);
    },
    placeholder: "yourname@bank",
    className: "w-full p-3 rounded-xl text-sm outline-none",
    style: {
      backgroundColor: "#FAF8F3",
      border: `1px solid ${rgba(C.maroon, 0.1)}`,
      color: C.ink
    }
  })), paymentMethod === "netbanking" && /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setSelectedDummyPayment(DUMMY_NETBANK);
      setAccountNumber("");
    },
    className: "zs-track w-full text-left p-3.5 rounded-xl border flex items-center gap-3 mb-3",
    style: {
      borderColor: selectedDummyPayment?.key === "hdfc" ? C.maroon : rgba(C.maroon, 0.1),
      backgroundColor: selectedDummyPayment?.key === "hdfc" ? rgba(C.gold, 0.1) : "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement(Landmark, {
    size: 16,
    color: C.maroon
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold",
    style: {
      color: C.maroon
    }
  }, DUMMY_NETBANK.label), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, DUMMY_NETBANK.detail)), selectedDummyPayment?.key === "hdfc" && /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 16,
    color: C.sage,
    className: "ml-auto flex-shrink-0"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium mb-1.5",
    style: {
      color: C.muted
    }
  }, "Or enter an account number"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: accountNumber,
    onChange: e => {
      setAccountNumber(e.target.value);
      if (e.target.value) setSelectedDummyPayment(null);
    },
    placeholder: "Account number",
    className: "w-full p-3 rounded-xl text-sm outline-none",
    style: {
      backgroundColor: "#FAF8F3",
      border: `1px solid ${rgba(C.maroon, 0.1)}`,
      color: C.ink
    }
  })), paymentMethod === "card" && /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setSelectedDummyPayment(DUMMY_CARD);
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
    },
    className: "zs-track w-full text-left p-3.5 rounded-xl border flex items-center gap-3 mb-3",
    style: {
      borderColor: selectedDummyPayment?.key === "visa" ? C.maroon : rgba(C.maroon, 0.1),
      backgroundColor: selectedDummyPayment?.key === "visa" ? rgba(C.gold, 0.1) : "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement(CreditCard, {
    size: 16,
    color: C.maroon
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold",
    style: {
      color: C.maroon
    }
  }, DUMMY_CARD.label), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, DUMMY_CARD.detail)), selectedDummyPayment?.key === "visa" && /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 16,
    color: C.sage,
    className: "ml-auto flex-shrink-0"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium mb-1.5",
    style: {
      color: C.muted
    }
  }, "Or enter card details"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: cardNumber,
    onChange: e => {
      setCardNumber(e.target.value);
      if (e.target.value) setSelectedDummyPayment(null);
    },
    placeholder: "Card number",
    className: "w-full p-3 rounded-xl text-sm outline-none mb-2",
    style: {
      backgroundColor: "#FAF8F3",
      border: `1px solid ${rgba(C.maroon, 0.1)}`,
      color: C.ink
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: cardExpiry,
    onChange: e => {
      setCardExpiry(e.target.value);
      if (e.target.value) setSelectedDummyPayment(null);
    },
    placeholder: "MM/YY",
    className: "w-1/2 p-3 rounded-xl text-sm outline-none",
    style: {
      backgroundColor: "#FAF8F3",
      border: `1px solid ${rgba(C.maroon, 0.1)}`,
      color: C.ink
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: cardCvv,
    onChange: e => {
      setCardCvv(e.target.value);
      if (e.target.value) setSelectedDummyPayment(null);
    },
    placeholder: "CVV",
    className: "w-1/2 p-3 rounded-xl text-sm outline-none",
    style: {
      backgroundColor: "#FAF8F3",
      border: `1px solid ${rgba(C.maroon, 0.1)}`,
      color: C.ink
    }
  }))), /*#__PURE__*/React.createElement("button", {
    disabled: !paymentReady,
    onClick: () => setShowConfirmModal(true),
    className: "zs-track w-full py-4 rounded-2xl font-semibold text-base",
    style: {
      backgroundColor: paymentReady ? C.maroon : rgba(C.maroon, 0.25),
      color: C.cream,
      cursor: paymentReady ? "pointer" : "not-allowed"
    }
  }, "Proceed to Pay"), /*#__PURE__*/React.createElement(AnimatePresence, null, showConfirmModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 flex items-center justify-center p-4",
    style: {
      backgroundColor: "rgba(42,24,16,0.45)",
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      scale: 0.92,
      y: 12
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 26
    },
    className: "rounded-3xl p-6 w-full max-w-sm text-center",
    style: {
      backgroundColor: C.white,
      boxShadow: "0 20px 60px rgba(74,4,4,0.25)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-3",
    style: {
      backgroundColor: rgba(C.gold, 0.15)
    }
  }, /*#__PURE__*/React.createElement(ShieldQuestion, {
    size: 20,
    color: C.maroon
  })), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-base font-semibold mb-1",
    style: {
      color: C.maroon
    }
  }, "Confirm payment"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm mb-5",
    style: {
      color: C.muted
    }
  }, "Are you sure you want to proceed with the payment of ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.maroon,
      fontWeight: 600
    }
  }, fmt(cart.price)), "?"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2.5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowConfirmModal(false),
    className: "zs-track flex-1 py-3 rounded-xl text-sm font-medium border",
    style: {
      borderColor: rgba(C.maroon, 0.2),
      color: C.maroon
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowConfirmModal(false);
      actions.setPhase("fraud_analysis");
    },
    className: "zs-track flex-1 py-3 rounded-xl text-sm font-semibold",
    style: {
      backgroundColor: C.maroon,
      color: C.cream
    }
  }, "Yes")))))), phase === "fraud_analysis" && /*#__PURE__*/React.createElement("div", {
    className: "log-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 mb-4 flex items-center justify-between",
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs uppercase tracking-wide",
    style: {
      color: C.muted
    }
  }, "Paying via"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold",
    style: {
      color: C.maroon
    }
  }, paymentSummaryLabel())), fraudLoading || !fraudResult ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-14"
  }, /*#__PURE__*/React.createElement(Loader2, {
    size: 26,
    color: C.maroon,
    className: "mx-auto mb-4 zs-spin"
  }), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-sm font-semibold mb-1",
    style: {
      color: C.maroon
    }
  }, "Running fraud analysis"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "Verifying transaction integrity and behavioral signals…")) : /*#__PURE__*/React.createElement("div", {
    className: "log-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-5 mb-4 text-center",
    style: {
      backgroundColor: rgba(statusColor(fraudResult.status), 0.12),
      border: `1px solid ${rgba(statusColor(fraudResult.status), 0.3)}`
    }
  }, fraudResult.status === "Safe" ? /*#__PURE__*/React.createElement(ShieldCheck, {
    size: 26,
    color: statusColor(fraudResult.status),
    className: "mx-auto mb-2"
  }) : /*#__PURE__*/React.createElement(ShieldAlert, {
    size: 26,
    color: statusColor(fraudResult.status),
    className: "mx-auto mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-3xl font-bold",
    style: {
      color: statusColor(fraudResult.status)
    }
  }, fraudResult.score, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs uppercase tracking-wide mb-1",
    style: {
      color: C.muted
    }
  }, "Risk score"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold",
    style: {
      color: statusColor(fraudResult.status)
    }
  }, fraudResult.status)), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 mb-5",
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium mb-1.5 flex items-center gap-1.5",
    style: {
      color: C.maroon
    }
  }, /*#__PURE__*/React.createElement(ShieldQuestion, {
    size: 13
  }), " Why this score?"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs leading-relaxed",
    style: {
      color: C.muted
    }
  }, fraudResult.explanation)), fraudResult.status === "Safe" ? /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.completePurchase(cart, fraudResult),
    className: "zs-track w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2",
    style: {
      backgroundColor: C.maroon,
      color: C.cream
    }
  }, /*#__PURE__*/React.createElement(ShieldCheck, {
    size: 16
  }), " Complete Secure Payment") : /*#__PURE__*/React.createElement("div", {
    className: "log-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-3.5 mb-4 flex items-start gap-2.5",
    style: {
      backgroundColor: rgba(C.terracotta, 0.1),
      border: `1px solid ${rgba(C.terracotta, 0.3)}`
    }
  }, /*#__PURE__*/React.createElement(ShieldAlert, {
    size: 16,
    color: C.terracotta,
    className: "flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs leading-relaxed font-medium",
    style: {
      color: C.maroon
    }
  }, "This transaction has been blocked. You can try a different payment method, or step away for now.")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2.5 flex-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.setPhase("payment_selection"),
    className: "zs-track flex-1 py-3 rounded-xl text-sm font-medium border",
    style: {
      borderColor: C.maroon,
      color: C.maroon
    }
  }, "Try different payment"), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.resolveCancel(cart),
    className: "zs-track flex-1 py-3 rounded-xl text-sm font-semibold",
    style: {
      backgroundColor: C.terracotta,
      color: C.white
    }
  }, "Cancel purchase"))))), phase === "intercept" && /*#__PURE__*/React.createElement("div", {
    className: "text-center py-4 log-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-2 mb-4"
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 16,
    color: C.terracotta
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium",
    style: {
      color: C.terracotta
    }
  }, "Checkout locked")), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-base font-semibold mb-2",
    style: {
      color: C.maroon
    }
  }, "Breathing space"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mb-6 font-medium",
    style: {
      color: C.muted
    }
  }, countdown % 2 === 0 ? "Inhale..." : "Exhale..."), /*#__PURE__*/React.createElement("div", {
    className: "relative w-44 h-44 mx-auto mb-6 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    key: "o" + state.pulseKey,
    className: "breathe-circle-outer absolute w-full h-full rounded-full",
    style: {
      backgroundColor: rgba(C.sage, 0.18)
    }
  }), /*#__PURE__*/React.createElement("div", {
    key: "i" + state.pulseKey,
    className: "breathe-circle-inner absolute w-28 h-28 rounded-full",
    style: {
      backgroundColor: rgba(C.terracotta, 0.3)
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute w-24 h-24 rounded-full flex items-center justify-center",
    style: {
      backgroundColor: C.maroon
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "zs-display text-3xl font-bold",
    style: {
      color: C.cream
    }
  }, countdown))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm px-6",
    style: {
      color: C.muted
    }
  }, "Hold your breath with the expanding circle to unlock your cart."), countdown === 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-6 log-enter"
  }, /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-sm font-semibold mb-4",
    style: {
      color: C.maroon
    }
  }, "Still want to buy this? Your logical brain is back online."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2.5 justify-center flex-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.resolveHold(cart),
    className: "zs-track px-4 py-3 rounded-xl text-sm font-medium",
    style: {
      backgroundColor: rgba(C.gold, 0.18),
      color: C.maroon
    }
  }, "Put it in the 24-hour vault"), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.setPhase("address"),
    className: "zs-track px-4 py-3 rounded-xl text-sm font-semibold",
    style: {
      backgroundColor: C.maroon,
      color: C.cream
    }
  }, "Proceed to Buy")))), phase === "curfew_reflect" && /*#__PURE__*/React.createElement("div", {
    className: "text-center py-6 log-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-2 mb-4"
  }, /*#__PURE__*/React.createElement(CloudMoon, {
    size: 16,
    color: C.maroon
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium",
    style: {
      color: C.maroon
    }
  }, "Night curfew — quick check-in")), reflection.step < REFLECTION_QUESTIONS.length ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Brain, {
    size: 14,
    color: C.maroon
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs uppercase tracking-wide font-medium",
    style: {
      color: C.muted
    }
  }, "Question ", reflection.step + 1, " of ", REFLECTION_QUESTIONS.length)), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-base font-semibold mb-6 px-4",
    style: {
      color: C.maroon
    }
  }, REFLECTION_QUESTIONS[reflection.step].q), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 justify-center flex-wrap px-2 mb-5"
  }, REFLECTION_QUESTIONS[reflection.step].options.map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt,
    onClick: () => setReflection(r => ({
      ...r,
      [REFLECTION_QUESTIONS[r.step].key]: opt,
      step: r.step + 1
    })),
    className: "zs-track px-4 py-2.5 rounded-xl text-sm font-medium border",
    style: {
      borderColor: rgba(C.maroon, 0.25),
      color: C.maroon
    }
  }, opt))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-1.5"
  }, REFLECTION_QUESTIONS.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rounded-full transition-all",
    style: {
      width: i === reflection.step ? "16px" : "6px",
      height: "6px",
      backgroundColor: i <= reflection.step ? C.maroon : rgba(C.maroon, 0.15)
    }
  })))) : /*#__PURE__*/React.createElement("div", {
    className: "log-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl p-3 mb-5 text-left mx-2",
    style: {
      backgroundColor: rgba(C.sage, 0.1),
      border: `1px solid ${rgba(C.sage, 0.25)}`
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium mb-1 flex items-center gap-1.5",
    style: {
      color: C.maroon
    }
  }, /*#__PURE__*/React.createElement(Brain, {
    size: 12
  }), " Your check-in"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs leading-relaxed mb-1.5",
    style: {
      color: C.muted
    }
  }, "Feeling ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: C.maroon
    }
  }, reflection.emotion), " · Solves a problem by morning: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: C.maroon
    }
  }, reflection.solves), " · Willing to wait: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: C.maroon
    }
  }, reflection.wait)), reflectionNudge(reflection) && /*#__PURE__*/React.createElement("p", {
    className: "text-xs leading-relaxed font-medium",
    style: {
      color: C.terracotta
    }
  }, reflectionNudge(reflection))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm mb-5 px-4",
    style: {
      color: C.muted
    }
  }, "Checkout continues exactly as usual — address, payment, and fraud check — this was just a pause."), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.setPhase("address"),
    className: "zs-track px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2",
    style: {
      backgroundColor: C.maroon,
      color: C.cream
    }
  }, "Continue to checkout ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 14
  })))), phase === "resolved" && /*#__PURE__*/React.createElement("div", {
    className: "text-center py-16 log-enter"
  }, /*#__PURE__*/React.createElement(ShieldCheck, {
    size: 28,
    color: C.sage,
    className: "mx-auto mb-3"
  }), /*#__PURE__*/React.createElement("p", {
    className: "zs-display font-semibold",
    style: {
      color: C.maroon
    }
  }, "Loading your next cart...")))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-6",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`,
      boxShadow: "0 2px 10px rgba(74,4,4,0.07)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "zs-display text-lg font-semibold mb-4",
    style: {
      color: C.maroon
    }
  }, "Snapshot"), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-5 mb-5",
    style: {
      backgroundColor: rgba(C.gold, 0.12),
      border: `1px solid ${rgba(C.gold, 0.35)}`,
      boxShadow: `0 0 24px ${rgba(C.gold, 0.15)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement(PiggyBank, {
    size: 16,
    color: "#B8935F"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs uppercase tracking-wide",
    style: {
      color: C.muted
    }
  }, "Saved from my past self")), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-3xl font-bold",
    style: {
      color: C.gold
    }
  }, fmt(state.saved))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium mb-2",
    style: {
      color: C.maroon
    }
  }, "Stress-to-cart ratio"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-end gap-1.5 h-16 mb-6 px-1"
  }, state.ratio.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex-1 rounded-t-md",
    style: {
      height: `${v / Math.max(...state.ratio, 1) * 100}%`,
      backgroundColor: i === state.ratio.length - 1 ? C.terracotta : rgba(C.terracotta, 0.35)
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(BellRing, {
    size: 15,
    color: C.maroon
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium",
    style: {
      color: C.maroon
    }
  }, "Recent activity")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-80 overflow-y-auto pr-1"
  }, state.logs.slice(0, 4).map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `rounded-xl p-3 ${i === 0 ? "log-enter" : ""}`,
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium mb-0.5",
    style: {
      color: "#B8935F"
    }
  }, l.time), /*#__PURE__*/React.createElement("p", {
    className: "text-xs leading-relaxed",
    style: {
      color: "#6B5D4F"
    }
  }, l.text))))));
}

/* ---------------- 24h Vault tab ---------------- */

function Vault({
  state,
  actions
}) {
  const [, force] = useState(0);
  const [pickerFor, setPickerFor] = useState(null);
  const [needsBuddy, setNeedsBuddy] = useState(false);
  useEffect(() => {
    const id = setInterval(() => force(n => n + 1), 30000);
    return () => clearInterval(id);
  }, []);

  // Items vaulted together (a bundle) always move, unlock, or get deleted
  // together — never piecemeal.
  const groups = [];
  const groupIndex = new Map();
  state.vault.forEach(item => {
    const key = item.bundleId || item.id;
    if (!groupIndex.has(key)) {
      const group = {
        key,
        items: [],
        mood: item.mood,
        expiresAt: item.expiresAt,
        totalHours: item.totalHours
      };
      groupIndex.set(key, group);
      groups.push(group);
    }
    groupIndex.get(key).items.push(item);
  });
  const handleUnlockClick = group => {
    if (state.buddies.length === 0) {
      setNeedsBuddy(true);
      actions.requestUnlock(group.items);
      return;
    }
    setNeedsBuddy(false);
    if (state.buddies.length === 1) {
      actions.requestUnlock(group.items, state.buddies[0]);
      return;
    }
    setPickerFor(pickerFor === group.key ? null : group.key);
  };
  const pickBuddyFor = (group, buddy) => {
    actions.requestUnlock(group.items, buddy);
    setPickerFor(null);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-5 flex-wrap gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "zs-display text-xl font-semibold",
    style: {
      color: C.maroon
    }
  }, "The 24h Vault"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm",
    style: {
      color: C.muted
    }
  }, "Items you chose to sleep on instead of buying.")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-medium px-3 py-1.5 rounded-full",
    style: {
      backgroundColor: rgba(C.maroon, 0.06),
      color: C.maroon
    }
  }, state.vault.length, " held item", state.vault.length !== 1 ? "s" : "")), needsBuddy && state.buddies.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 mb-5 log-enter flex items-start gap-3",
    style: {
      backgroundColor: rgba(C.terracotta, 0.1),
      border: `1px solid ${rgba(C.terracotta, 0.35)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
    style: {
      backgroundColor: rgba(C.terracotta, 0.18)
    }
  }, /*#__PURE__*/React.createElement(UserCheck, {
    size: 16,
    color: C.terracotta
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium mb-0.5",
    style: {
      color: C.maroon
    }
  }, "Add an Impulse Buddy to unlock items"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "Early vault unlocks always need a buddy's approval. Add one in AI Persona & Rules to unlock this item.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.setActiveTab("persona"),
    className: "zs-track flex-shrink-0 text-xs font-semibold px-3 py-2 rounded-xl",
    style: {
      backgroundColor: C.maroon,
      color: C.cream
    }
  }, "Add buddy")), groups.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-12 text-center",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 28,
    color: C.muted,
    className: "mx-auto mb-3"
  }), /*#__PURE__*/React.createElement("p", {
    className: "zs-display font-semibold mb-1",
    style: {
      color: C.maroon
    }
  }, "Vault is empty"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm",
    style: {
      color: C.muted
    }
  }, "Choose \"Hold 24h in vault\" on a gated checkout to see it here.")) : /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
  }, /*#__PURE__*/React.createElement(AnimatePresence, null, groups.map(group => {
    const remaining = group.expiresAt - Date.now();
    const pct = Math.max(0, Math.min(100, remaining / (group.totalHours * 3600000) * 100));
    const isBundle = group.items.length > 1;
    const total = group.items.reduce((s, x) => s + x.price, 0);
    const pending = state.pendingUnlocks[group.key];
    return /*#__PURE__*/React.createElement(motion.div, {
      key: group.key,
      layout: true,
      initial: {
        opacity: 0,
        y: 28,
        scale: 0.9
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1
      },
      exit: {
        opacity: 0,
        scale: 0.85,
        y: -10
      },
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      },
      className: "rounded-2xl p-5",
      style: {
        backgroundColor: C.white,
        border: `1px solid ${rgba(C.maroon, 0.06)}`,
        boxShadow: "0 2px 10px rgba(74,4,4,0.07)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-11 h-11 rounded-xl flex items-center justify-center",
      style: {
        backgroundColor: rgba(C.terracotta, 0.1)
      }
    }, /*#__PURE__*/React.createElement(ShoppingBag, {
      size: 18,
      color: C.terracotta
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5"
    }, isBundle && /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-medium px-2.5 py-1 rounded-full",
      style: {
        backgroundColor: rgba(C.gold, 0.16),
        color: "#B8935F"
      }
    }, "Bundle"), /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-medium px-2.5 py-1 rounded-full",
      style: {
        backgroundColor: rgba(C.terracotta, 0.1),
        color: C.terracotta
      }
    }, group.mood))), /*#__PURE__*/React.createElement("p", {
      className: "font-medium mb-0.5",
      style: {
        color: C.maroon
      }
    }, isBundle ? `${group.items.length}-item bundle` : group.items[0].name), /*#__PURE__*/React.createElement("p", {
      className: "zs-display text-xl font-bold mb-2",
      style: {
        color: C.maroon
      }
    }, fmt(total)), isBundle && /*#__PURE__*/React.createElement("div", {
      className: "mb-3 space-y-1"
    }, group.items.map(it => /*#__PURE__*/React.createElement("div", {
      key: it.id,
      className: "flex items-center justify-between text-xs",
      style: {
        color: C.muted
      }
    }, /*#__PURE__*/React.createElement("span", null, it.name), /*#__PURE__*/React.createElement("span", null, fmt(it.price))))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5 mb-2"
    }, /*#__PURE__*/React.createElement(Timer, {
      size: 13,
      color: C.muted
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-medium",
      style: {
        color: C.muted
      }
    }, fmtRemaining(remaining))), /*#__PURE__*/React.createElement("div", {
      className: "h-2 rounded-full overflow-hidden mb-4",
      style: {
        backgroundColor: rgba(C.maroon, 0.08)
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-full rounded-full",
      style: {
        width: `${pct}%`,
        backgroundColor: C.gold
      }
    })), (() => {
      if (pending) {
        return /*#__PURE__*/React.createElement("div", {
          className: "flex items-center gap-1.5 mb-3 px-2.5 py-2 rounded-lg log-enter",
          style: {
            backgroundColor: rgba(C.sage, 0.14)
          }
        }, /*#__PURE__*/React.createElement(CheckCircle2, {
          size: 13,
          color: C.sage
        }), /*#__PURE__*/React.createElement("span", {
          className: "text-xs font-medium",
          style: {
            color: C.ink
          }
        }, "Request sent to ", pending.buddy.name, " — awaiting approval"));
      }
      if (pickerFor === group.key) {
        return /*#__PURE__*/React.createElement("div", {
          className: "mb-3"
        }, /*#__PURE__*/React.createElement("p", {
          className: "text-xs font-medium mb-2",
          style: {
            color: C.muted
          }
        }, "Ask which buddy?"), /*#__PURE__*/React.createElement("div", {
          className: "flex flex-wrap gap-1.5"
        }, state.buddies.map(b => /*#__PURE__*/React.createElement("button", {
          key: b.id,
          onClick: () => pickBuddyFor(group, b),
          className: "zs-track text-xs font-medium px-3 py-1.5 rounded-full",
          style: {
            backgroundColor: rgba(C.maroon, 0.08),
            color: C.maroon,
            border: `1px solid ${rgba(C.maroon, 0.15)}`
          }
        }, b.name))));
      }
      return /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-lg",
        style: {
          backgroundColor: rgba(C.maroon, 0.04)
        }
      }, /*#__PURE__*/React.createElement(UserCheck, {
        size: 12,
        color: C.muted
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-xs",
        style: {
          color: C.muted
        }
      }, "Unlocking needs an Impulse Buddy's OK"));
    })(), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => actions.deleteVaultItem(group.items),
      disabled: !!pending,
      className: "zs-track flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold",
      style: {
        backgroundColor: C.terracotta,
        color: C.white,
        opacity: pending ? 0.5 : 1
      }
    }, /*#__PURE__*/React.createElement(Trash2, {
      size: 13
    }), " Delete & save"), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleUnlockClick(group),
      disabled: !!pending,
      className: "zs-track flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border",
      style: {
        borderColor: C.maroon,
        color: C.maroon,
        opacity: pending ? 0.5 : 1
      }
    }, /*#__PURE__*/React.createElement(Unlock, {
      size: 13
    }), " ", pending ? "Pending" : "Unlock now")));
  }))));
}

/* ---------------- Browse tab (multi-platform + scroll sensor) ---------------- */

function Browse({
  state,
  actions
}) {
  const {
    activePlatform,
    scrollLevel,
    autoSync,
    moodIndex,
    cartItems,
    priceThreshold,
    vault
  } = state;
  const platform = PLATFORMS.find(p => p.key === activePlatform) || PLATFORMS[0];
  const products = PRODUCTS[activePlatform] || [];
  const scrollMeta = SCROLL_STATES[scrollLevel];
  const mood = MOODS[moodIndex];
  const lastRef = useRef({
    top: 0,
    time: Date.now()
  });
  const decayRef = useRef(null);
  const cartTotal = cartItems.reduce((sum, it) => sum + it.price, 0);
  const cartOverThreshold = cartTotal > priceThreshold;
  const vaultedNames = new Set(vault.map(v => v.name));
  const [nudge, setNudge] = useState(null);
  const findCheaperElsewhere = prod => {
    const comp = COMPARISONS.find(c => c.name === prod.name);
    if (!comp) return null;
    const alternatives = Object.entries(comp.prices).filter(([key, price]) => key !== activePlatform && price !== null && price !== undefined && (PRODUCTS[key] || []).some(p => p.name === prod.name) // only suggest a platform that actually stocks this item
    );
    if (alternatives.length === 0) return null;
    const [cheapKey, cheapPrice] = alternatives.reduce((min, e) => e[1] < min[1] ? e : min, alternatives[0]);
    if (cheapPrice >= prod.price) return null;
    const altPlatform = PLATFORMS.find(p => p.key === cheapKey);
    return {
      key: cheapKey,
      label: altPlatform ? altPlatform.label : cheapKey,
      price: cheapPrice,
      savings: Math.round((prod.price - cheapPrice) * 100) / 100
    };
  };
  const handleAddIntent = (prod, checkout) => {
    if (vaultedNames.has(prod.name)) return;
    const alt = findCheaperElsewhere(prod);
    if (alt) {
      setNudge({
        prod,
        checkout,
        alt
      });
    } else {
      actions.addToCart({
        name: prod.name,
        price: prod.price,
        tag: platform.tag,
        source: platform.label
      });
      if (checkout) actions.goToCheckout();
    }
  };
  const confirmAddAnyway = () => {
    if (!nudge) return;
    actions.addToCart({
      name: nudge.prod.name,
      price: nudge.prod.price,
      tag: platform.tag,
      source: platform.label
    });
    if (nudge.checkout) actions.goToCheckout();
    setNudge(null);
  };
  const buyCheaperInstead = () => {
    if (!nudge) return;
    actions.addToCart({
      name: nudge.prod.name,
      price: nudge.alt.price,
      tag: platform.tag,
      source: nudge.alt.label
    });
    if (nudge.checkout) actions.goToCheckout();
    setNudge(null);
  };
  useEffect(() => {
    // Always run the real decay interval so scroll speed naturally settles
    // back down to "Calm" whenever the user stops scrolling — whether
    // auto-sync is on or off.
    decayRef.current = setInterval(() => actions.decayScroll(), 600);
    return () => clearInterval(decayRef.current);
  }, []);
  const handleScroll = e => {
    const now = Date.now();
    const top = e.target.scrollTop;
    const dt = now - lastRef.current.time;
    const dy = Math.abs(top - lastRef.current.top);
    if (dt > 0) {
      const speed = dy / dt;
      actions.registerScroll(speed);
    }
    lastRef.current = {
      top,
      time: now
    };
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "zs-display text-xl font-semibold",
    style: {
      color: C.maroon
    }
  }, "Browse"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm",
    style: {
      color: C.muted
    }
  }, "A sandboxed view of the platforms you actually shop on.")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-5",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`,
      boxShadow: "0 2px 10px rgba(74,4,4,0.07)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium mb-3",
    style: {
      color: C.maroon
    }
  }, "How are you feeling right now?"), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between mb-2 px-1"
  }, MOODS.map((m, i) => {
    const Icon = m.icon;
    const active = i === moodIndex;
    return /*#__PURE__*/React.createElement("button", {
      key: m.key,
      onClick: () => actions.setMoodManually(i),
      className: "zs-track flex flex-col items-center gap-1 p-2 rounded-xl",
      style: {
        backgroundColor: active ? rgba(C.terracotta, 0.15) : "transparent"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 18,
      color: active ? m.color : "#B5AA9C"
    }));
  })), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 4,
    step: 1,
    value: moodIndex,
    onChange: e => actions.setMoodManually(Number(e.target.value)),
    className: "w-full mb-1",
    style: {
      accentColor: C.gold
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-center zs-display font-semibold text-sm",
    style: {
      color: mood.color
    }
  }, mood.key, autoSync ? " · following scroll sensor" : "")), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-5",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`,
      boxShadow: "0 2px 10px rgba(74,4,4,0.07)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between flex-wrap gap-3 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
    style: {
      backgroundColor: rgba(scrollMeta.color, 0.15)
    }
  }, /*#__PURE__*/React.createElement(Activity, {
    size: 20,
    color: scrollMeta.color
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs uppercase tracking-wide",
    style: {
      color: C.muted
    }
  }, "Scroll-speed sensor"), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-base font-semibold",
    style: {
      color: scrollMeta.color
    }
  }, scrollMeta.label), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, scrollMeta.desc))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1.5"
  }, SCROLL_STATES.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.level,
    className: "w-8 h-2.5 rounded-full",
    style: {
      backgroundColor: s.level <= scrollLevel ? scrollMeta.color : rgba(C.maroon, 0.08)
    }
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.setAutoSync(!autoSync),
    className: "zs-track flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl w-full justify-center",
    style: {
      backgroundColor: autoSync ? rgba(C.maroon, 0.08) : "#FAF8F3",
      color: C.maroon
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "zs-toggle w-9 h-5 rounded-full relative flex-shrink-0",
    style: {
      backgroundColor: autoSync ? C.maroon : "#E5DFD3"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all",
    style: {
      left: autoSync ? "18px" : "2px"
    }
  })), autoSync ? "Auto-sync is on — mood updates with your scrolling" : "Auto-sync mood from scroll behavior"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-5 flex-wrap"
  }, PLATFORMS.map(p => {
    const Icon = p.icon;
    const active = p.key === activePlatform;
    return /*#__PURE__*/React.createElement("button", {
      key: p.key,
      onClick: () => actions.setActivePlatform(p.key),
      className: "zs-track flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium",
      style: {
        backgroundColor: active ? C.maroon : C.white,
        color: active ? C.cream : C.maroon,
        border: `1px solid ${active ? C.maroon : rgba(C.maroon, 0.1)}`
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 15
    }), " ", p.label);
  })), cartItems.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 mb-5 log-enter",
    style: {
      backgroundColor: cartOverThreshold ? rgba(C.terracotta, 0.1) : rgba(C.gold, 0.1),
      border: `1px solid ${cartOverThreshold ? rgba(C.terracotta, 0.35) : rgba(C.gold, 0.35)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between flex-wrap gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
    style: {
      backgroundColor: cartOverThreshold ? rgba(C.terracotta, 0.18) : rgba(C.gold, 0.25)
    }
  }, cartOverThreshold ? /*#__PURE__*/React.createElement(Lock, {
    size: 16,
    color: C.terracotta
  }) : /*#__PURE__*/React.createElement(ShoppingBag, {
    size: 16,
    color: C.maroon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium",
    style: {
      color: C.maroon
    }
  }, cartItems.length, " item", cartItems.length > 1 ? "s" : "", " in cart"), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-sm font-bold",
    style: {
      color: C.maroon
    }
  }, fmt(cartTotal)))), cartOverThreshold ? /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.cancelEntireCart(),
    className: "zs-track flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-xl border",
    style: {
      borderColor: C.terracotta,
      color: C.terracotta
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 15
  }), " Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.vaultEntireCart(),
    className: "zs-track flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl",
    style: {
      backgroundColor: C.terracotta,
      color: C.white
    }
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 15
  }), " Put in 24h Vault")) : /*#__PURE__*/React.createElement("button", {
    onClick: actions.goToCheckout,
    className: "zs-track flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl",
    style: {
      backgroundColor: C.maroon,
      color: C.cream
    }
  }, "Go to checkout ", /*#__PURE__*/React.createElement(ChevronRight, {
    size: 15
  }))), cartOverThreshold && /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-3 flex items-center gap-1.5",
    style: {
      color: C.terracotta
    }
  }, /*#__PURE__*/React.createElement(ShieldQuestion, {
    size: 13
  }), " Your cart adds up to ", fmt(cartTotal), " — over your ", fmt(priceThreshold), " threshold, so these will cool off in the 24h Vault instead of checkout."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mt-3"
  }, cartItems.map(it => /*#__PURE__*/React.createElement("span", {
    key: it.id,
    className: "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full",
    style: {
      backgroundColor: C.white,
      color: C.maroon,
      border: `1px solid ${rgba(C.maroon, 0.08)}`
    }
  }, it.name, " · ", fmt(it.price), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.removeFromCart(it.id),
    "aria-label": `Remove ${it.name}`
  }, /*#__PURE__*/React.createElement(X, {
    size: 11,
    color: C.muted
  })))))), nudge && /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 mb-5 log-enter",
    style: {
      backgroundColor: rgba(C.terracotta, 0.1),
      border: `1px solid ${rgba(C.terracotta, 0.35)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
    style: {
      backgroundColor: rgba(C.terracotta, 0.18)
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    size: 16,
    color: C.terracotta
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium mb-0.5",
    style: {
      color: C.maroon
    }
  }, nudge.prod.name, " is ", fmt(nudge.alt.savings), " cheaper on ", nudge.alt.label), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, fmt(nudge.alt.price), " on ", nudge.alt.label, " vs ", fmt(nudge.prod.price), " here on ", platform.label, "."))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mt-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: confirmAddAnyway,
    className: "zs-track flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border",
    style: {
      borderColor: C.maroon,
      color: C.maroon
    }
  }, nudge.checkout ? "Buy anyway" : "Add anyway", " · ", fmt(nudge.prod.price)), /*#__PURE__*/React.createElement("button", {
    onClick: buyCheaperInstead,
    className: "zs-track flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold",
    style: {
      backgroundColor: C.maroon,
      color: C.cream
    }
  }, /*#__PURE__*/React.createElement(ShoppingCart, {
    size: 13
  }), " Buy cheaper instead · ", fmt(nudge.alt.price)))), /*#__PURE__*/React.createElement("div", {
    onScroll: handleScroll,
    className: "rounded-2xl p-5 overflow-y-auto",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`,
      boxShadow: "0 2px 10px rgba(74,4,4,0.07)",
      maxHeight: "460px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, products.map((prod, i) => {
    const ProdIcon = prod.icon;
    const isVaulted = vaultedNames.has(prod.name);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "rounded-2xl p-4",
      style: {
        backgroundColor: "#FAF8F3",
        opacity: isVaulted ? 0.75 : 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-full h-28 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden",
      style: {
        background: `radial-gradient(circle at 25% 20%, ${rgba(prod.accent, 0.28)} 0%, transparent 45%), linear-gradient(135deg, ${rgba(prod.accent, 0.22)}, ${rgba(prod.accent, 0.06)})`,
        backgroundImage: `radial-gradient(${rgba(prod.accent, 0.16)} 1.5px, transparent 1.5px), radial-gradient(circle at 25% 20%, ${rgba(prod.accent, 0.28)} 0%, transparent 45%), linear-gradient(135deg, ${rgba(prod.accent, 0.22)}, ${rgba(prod.accent, 0.06)})`,
        backgroundSize: "14px 14px, 100% 100%, 100% 100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-16 h-16 rounded-2xl flex items-center justify-center",
      style: {
        backgroundColor: rgba(prod.accent, 0.22),
        border: `1px solid ${rgba(prod.accent, 0.35)}`,
        boxShadow: `0 4px 14px ${rgba(prod.accent, 0.25)}`
      }
    }, /*#__PURE__*/React.createElement(ProdIcon, {
      size: 30,
      color: prod.accent,
      strokeWidth: 1.75
    }))), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-medium mb-1",
      style: {
        color: C.maroon
      }
    }, prod.name), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1 mb-2"
    }, /*#__PURE__*/React.createElement(Star, {
      size: 12,
      color: C.gold
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-xs",
      style: {
        color: C.muted
      }
    }, prod.rating)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-2.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "zs-display font-bold text-sm",
      style: {
        color: C.maroon
      }
    }, fmt(prod.price))), isVaulted ? /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-center gap-1.5 text-xs font-medium px-2 py-1.5 rounded-full",
      style: {
        backgroundColor: rgba(C.terracotta, 0.12),
        color: C.terracotta
      }
    }, /*#__PURE__*/React.createElement(Lock, {
      size: 12
    }), " In your 24h Vault") : /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => handleAddIntent(prod, false),
      className: "zs-track flex-1 flex items-center justify-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-full",
      style: {
        backgroundColor: rgba(C.maroon, 0.08),
        color: C.maroon,
        border: `1px solid ${rgba(C.maroon, 0.15)}`
      }
    }, /*#__PURE__*/React.createElement(Plus, {
      size: 12
    }), " Add to cart"), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleAddIntent(prod, true),
      className: "zs-track flex-1 flex items-center justify-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-full",
      style: {
        backgroundColor: C.maroon,
        color: C.cream
      }
    }, /*#__PURE__*/React.createElement(Zap, {
      size: 12
    }), " Buy now")));
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-3",
    style: {
      color: C.muted
    }
  }, "Scroll inside the product grid above — the sensor reads your scroll velocity, not clicks, so idle mousing won't trip it."));
}

/* ---------------- Analytics tab ---------------- */

function Analytics({
  state
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "zs-display text-xl font-semibold mb-5",
    style: {
      color: C.maroon
    }
  }, "Mindful Analytics"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-5",
    style: {
      backgroundColor: rgba(C.gold, 0.12),
      border: `1px solid ${rgba(C.gold, 0.35)}`,
      boxShadow: `0 0 24px ${rgba(C.gold, 0.15)}`
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs uppercase tracking-wide mb-1",
    style: {
      color: C.muted
    }
  }, "Total saved"), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-3xl font-bold",
    style: {
      color: C.gold
    }
  }, fmt(state.saved))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-5",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs uppercase tracking-wide mb-1",
    style: {
      color: C.muted
    }
  }, "Carts intercepted"), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-3xl font-bold",
    style: {
      color: C.maroon
    }
  }, state.interceptedCount)), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-5",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs uppercase tracking-wide mb-1",
    style: {
      color: C.muted
    }
  }, "Currently in vault"), /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-3xl font-bold",
    style: {
      color: C.maroon
    }
  }, state.vault.length))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-6 mb-6",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement(Database, {
    size: 16,
    color: C.maroon
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium",
    style: {
      color: C.maroon
    }
  }, "Purchase history")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mb-4",
    style: {
      color: C.muted
    }
  }, "Every completed purchase, with the mood you were in at checkout — colored to match your mood picker."), state.purchaseHistory.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl py-8 text-center",
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "No confirmed purchases yet — this fills in as you check out.")) : /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-96 overflow-y-auto pr-1"
  }, state.purchaseHistory.map(p => {
    const moodMeta = MOODS.find(m => m.key === p.moodKey) || MOODS[0];
    const MoodIcon = moodMeta.icon;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      className: "flex items-center justify-between gap-3 rounded-xl px-3 py-2.5",
      style: {
        backgroundColor: "#FAF8F3",
        borderLeft: `3px solid ${moodMeta.color}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
      style: {
        backgroundColor: rgba(moodMeta.color, 0.18)
      }
    }, /*#__PURE__*/React.createElement(MoodIcon, {
      size: 14,
      color: moodMeta.color
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-medium truncate",
      style: {
        color: C.maroon
      }
    }, p.name), /*#__PURE__*/React.createElement("p", {
      className: "text-xs",
      style: {
        color: C.muted
      }
    }, p.date, " · ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: moodMeta.color
      }
    }, p.moodKey)))), /*#__PURE__*/React.createElement("span", {
      className: "zs-display text-sm font-bold flex-shrink-0",
      style: {
        color: C.maroon
      }
    }, fmt(p.price)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mt-4 pt-4 flex-wrap",
    style: {
      borderTop: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, MOODS.map(m => /*#__PURE__*/React.createElement("span", {
    key: m.key,
    className: "flex items-center gap-1.5 text-xs",
    style: {
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "rounded-full flex-shrink-0",
    style: {
      width: "8px",
      height: "8px",
      backgroundColor: m.color
    }
  }), m.key)))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-6",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-4"
  }, /*#__PURE__*/React.createElement(Brain, {
    size: 16,
    color: C.maroon
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium",
    style: {
      color: C.maroon
    }
  }, "AI behavioral log")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-96 overflow-y-auto pr-1"
  }, state.logs.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `rounded-xl p-3 ${i === 0 ? "log-enter" : ""}`,
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium mb-0.5",
    style: {
      color: "#B8935F"
    }
  }, l.time), /*#__PURE__*/React.createElement("p", {
    className: "text-xs leading-relaxed",
    style: {
      color: "#6B5D4F"
    }
  }, l.text))))));
}

/* ---------------- Persona & Rules tab ---------------- */

function BuddyForm({
  onAdd
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("Friend");
  const submit = () => {
    if (!name.trim()) return;
    onAdd({
      name: name.trim(),
      phone: phone.trim(),
      relation
    });
    setName("");
    setPhone("");
    setRelation("Friend");
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-medium mb-1 block",
    style: {
      color: C.muted
    }
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "e.g. Aisha",
    value: name,
    onChange: e => setName(e.target.value),
    className: "w-full text-sm rounded-xl px-3 py-2.5 outline-none border",
    style: {
      borderColor: rgba(C.maroon, 0.12),
      color: C.ink
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-medium mb-1 block",
    style: {
      color: C.muted
    }
  }, "Phone (WhatsApp/SMS)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "+91 98xxxxxxx",
    value: phone,
    onChange: e => setPhone(e.target.value),
    className: "w-full text-sm rounded-xl px-3 py-2.5 outline-none border",
    style: {
      borderColor: rgba(C.maroon, 0.12),
      color: C.ink
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-medium mb-1 block",
    style: {
      color: C.muted
    }
  }, "Relationship"), /*#__PURE__*/React.createElement("select", {
    value: relation,
    onChange: e => setRelation(e.target.value),
    className: "w-full text-sm rounded-xl px-3 py-2.5 outline-none border",
    style: {
      borderColor: rgba(C.maroon, 0.12),
      color: C.ink,
      backgroundColor: C.white
    }
  }, /*#__PURE__*/React.createElement("option", null, "Friend"), /*#__PURE__*/React.createElement("option", null, "Partner"), /*#__PURE__*/React.createElement("option", null, "Financial advisor"), /*#__PURE__*/React.createElement("option", null, "Parent")))), /*#__PURE__*/React.createElement("button", {
    onClick: submit,
    className: "zs-track flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl",
    style: {
      backgroundColor: rgba(C.terracotta, 0.12),
      color: C.terracotta
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 13
  }), " Add Impulse Buddy"));
}
function PersonaRules({
  state,
  actions
}) {
  const [pendingThreshold, setPendingThreshold] = useState(state.priceThreshold);
  const [showBuddyPrompt, setShowBuddyPrompt] = useState(false);
  const [thresholdPickerOpen, setThresholdPickerOpen] = useState(false);
  const buddySectionRef = useRef(null);

  // Snap the slider back to whatever the committed threshold actually is
  // once a change request resolves (approved -> new value, denied -> old
  // value) or whenever the threshold changes from elsewhere.
  useEffect(() => {
    setPendingThreshold(state.priceThreshold);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.priceThreshold, state.approvalRequest]);

  // Once a buddy gets added, the blocking prompt no longer applies.
  useEffect(() => {
    if (state.buddies.length > 0) setShowBuddyPrompt(false);
    if (state.buddies.length <= 1) setThresholdPickerOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.buddies.length]);
  const thresholdChanged = pendingThreshold !== state.priceThreshold;
  const scrollToBuddies = () => {
    buddySectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  };
  const handleSaveThreshold = () => {
    if (state.buddies.length === 0) {
      setShowBuddyPrompt(true);
      scrollToBuddies();
      return;
    }
    setShowBuddyPrompt(false);
    if (state.buddies.length === 1) {
      actions.requestThresholdChange(pendingThreshold, state.buddies[0]);
      return;
    }
    setThresholdPickerOpen(o => !o);
  };
  const pickThresholdBuddy = buddy => {
    actions.requestThresholdChange(pendingThreshold, buddy);
    setThresholdPickerOpen(false);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "zs-display text-xl font-semibold mb-5",
    style: {
      color: C.maroon
    }
  }, "AI Persona & Rules"), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-6 mb-6",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between flex-wrap gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium",
    style: {
      color: C.maroon
    }
  }, "Currency"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "Every price across the app switches with this — an illustrative FX rate of $1 ≈ ₹", INR_RATE, " is used.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 rounded-xl p-1",
    style: {
      backgroundColor: rgba(C.maroon, 0.05)
    }
  }, ["USD", "INR"].map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => actions.setCurrency(c),
    className: "zs-track px-4 py-2 rounded-lg text-xs font-semibold",
    style: {
      backgroundColor: state.currency === c ? C.maroon : "transparent",
      color: state.currency === c ? C.cream : C.muted
    }
  }, c === "USD" ? "$ USD" : "₹ INR"))))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-6 mb-6",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium mb-4",
    style: {
      color: C.maroon
    }
  }, "AI tone"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-4"
  }, PERSONAS.map(p => {
    const Icon = p.icon;
    const active = state.persona === p.key;
    return /*#__PURE__*/React.createElement("button", {
      key: p.key,
      onClick: () => actions.setPersona(p.key),
      className: "zs-track text-left rounded-2xl p-4",
      style: {
        backgroundColor: active ? rgba(C.terracotta, 0.1) : "#FAF8F3",
        border: active ? `2px solid ${C.terracotta}` : "1px solid transparent"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 18,
      color: active ? C.terracotta : C.muted,
      className: "mb-2"
    }), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-semibold mb-0.5",
      style: {
        color: C.maroon
      }
    }, p.label), /*#__PURE__*/React.createElement("p", {
      className: "text-xs",
      style: {
        color: C.muted
      }
    }, p.desc));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-6 mb-6",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium",
    style: {
      color: C.maroon
    }
  }, "Price threshold"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold",
    style: {
      color: C.terracotta
    }
  }, fmt(pendingThreshold))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mb-4",
    style: {
      color: C.muted
    }
  }, "Set to ", fmt(200), " automatically. Any single item above this is auto-moved to the 24h Vault at checkout — and changing this number always needs an Impulse Buddy's approval."), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 20,
    max: 500,
    step: 10,
    value: pendingThreshold,
    onChange: e => setPendingThreshold(Number(e.target.value)),
    className: "w-full mb-3",
    style: {
      accentColor: C.terracotta
    }
  }), thresholdChanged && /*#__PURE__*/React.createElement("button", {
    onClick: handleSaveThreshold,
    className: "zs-track flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl",
    style: {
      backgroundColor: C.maroon,
      color: C.cream
    }
  }, /*#__PURE__*/React.createElement(UserCheck, {
    size: 13
  }), " Save ", fmt(pendingThreshold), " · needs buddy approval"), thresholdChanged && showBuddyPrompt && state.buddies.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 mt-4 log-enter flex items-start gap-3",
    style: {
      backgroundColor: rgba(C.terracotta, 0.1),
      border: `1px solid ${rgba(C.terracotta, 0.35)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
    style: {
      backgroundColor: rgba(C.terracotta, 0.18)
    }
  }, /*#__PURE__*/React.createElement(UserCheck, {
    size: 16,
    color: C.terracotta
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium mb-0.5",
    style: {
      color: C.maroon
    }
  }, "Add an Impulse Buddy to change this"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "Threshold changes always need a buddy's approval. Add one below to continue.")), /*#__PURE__*/React.createElement("button", {
    onClick: scrollToBuddies,
    className: "zs-track flex-shrink-0 text-xs font-semibold px-3 py-2 rounded-xl",
    style: {
      backgroundColor: C.maroon,
      color: C.cream
    }
  }, "Add buddy")), thresholdChanged && thresholdPickerOpen && state.buddies.length > 1 && /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium mb-2",
    style: {
      color: C.muted
    }
  }, "Ask which buddy to approve this change?"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5"
  }, state.buddies.map(b => /*#__PURE__*/React.createElement("button", {
    key: b.id,
    onClick: () => pickThresholdBuddy(b),
    className: "zs-track text-xs font-medium px-3 py-1.5 rounded-full",
    style: {
      backgroundColor: rgba(C.maroon, 0.08),
      color: C.maroon,
      border: `1px solid ${rgba(C.maroon, 0.15)}`
    }
  }, b.name))))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-6",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl flex items-center justify-center",
    style: {
      backgroundColor: rgba(C.maroon, 0.06)
    }
  }, /*#__PURE__*/React.createElement(CloudMoon, {
    size: 18,
    color: C.maroon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium",
    style: {
      color: C.maroon
    }
  }, "Night curfew"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "Ask a brief 3-question reflection before any checkout, 10pm – 6am."))), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.setCurfewEnabled(!state.curfewEnabled),
    className: "zs-toggle w-11 h-6 rounded-full relative flex-shrink-0",
    style: {
      backgroundColor: state.curfewEnabled ? C.maroon : "#E5DFD3"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all",
    style: {
      left: state.curfewEnabled ? "20px" : "2px"
    }
  }))), state.curfewEnabled && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 pt-4",
    style: {
      borderTop: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs mb-3",
    style: {
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement(Sunrise, {
    size: 14
  }), "Curfew active from 10:00 PM to 6:00 AM local time."), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between rounded-xl p-3",
    style: {
      backgroundColor: rgba(C.terracotta, 0.07)
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold",
    style: {
      color: C.maroon
    }
  }, "Force curfew now (demo)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "Test the night flow — including the 3-question check-in — without waiting for 10pm.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.setForceCurfewDemo(!state.forceCurfewDemo),
    className: "zs-toggle w-11 h-6 rounded-full relative flex-shrink-0",
    style: {
      backgroundColor: state.forceCurfewDemo ? C.terracotta : "#E5DFD3"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all",
    style: {
      left: state.forceCurfewDemo ? "20px" : "2px"
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: buddySectionRef,
    className: "rounded-2xl p-6 mt-6",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl flex items-center justify-center",
    style: {
      backgroundColor: rgba(C.terracotta, 0.1)
    }
  }, /*#__PURE__*/React.createElement(UserCheck, {
    size: 18,
    color: C.terracotta
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium",
    style: {
      color: C.maroon
    }
  }, "Impulse Buddies"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "Your reality-check contacts for high-risk purchases. Add as many as you like."))), state.buddies.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 mt-4 mb-4"
  }, state.buddies.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.id,
    className: "flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl",
    style: {
      backgroundColor: rgba(C.sage, 0.1)
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 min-w-0"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 14,
    color: C.sage,
    className: "flex-shrink-0"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs truncate",
    style: {
      color: C.ink
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, b.name), " · ", b.relation, b.phone ? ` · ${b.phone}` : "")), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.removeBuddy(b.id),
    "aria-label": `Remove ${b.name}`,
    className: "flex-shrink-0"
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 13,
    color: C.terracotta
  }))))), /*#__PURE__*/React.createElement(BuddyForm, {
    onAdd: actions.addBuddy
  }), state.buddies.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-3 py-2 rounded-xl mt-4 mb-4",
    style: {
      backgroundColor: rgba(C.terracotta, 0.1)
    }
  }, /*#__PURE__*/React.createElement(ShieldQuestion, {
    size: 14,
    color: C.terracotta
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.terracotta
    }
  }, "No Impulse Buddy saved yet — vault unlocks and gated night purchases will be blocked until you add one.")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-2 px-3 py-2.5 rounded-xl",
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement(MessageCircle, {
    size: 14,
    color: C.muted,
    className: "mt-0.5 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "Purchases over $200 during night curfew require approval from one of your Impulse Buddies before checkout can be confirmed.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-2 px-3 py-2.5 rounded-xl",
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 14,
    color: C.muted,
    className: "mt-0.5 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "Unlocking any item early from the 24h Vault always requires you to pick a buddy and get their approval."))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-3",
    style: {
      color: "#B5AA9C"
    }
  }, "This is a sandboxed simulation — no real SMS or WhatsApp message is sent. The approval screen stands in for your buddy's phone.")), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-6 mt-6",
    style: {
      backgroundColor: C.white,
      border: `1px solid ${rgba(C.maroon, 0.06)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl flex items-center justify-center",
    style: {
      backgroundColor: rgba(C.maroon, 0.06)
    }
  }, state.soundEnabled ? /*#__PURE__*/React.createElement(Volume2, {
    size: 18,
    color: C.maroon
  }) : /*#__PURE__*/React.createElement(VolumeX, {
    size: 18,
    color: C.maroon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium",
    style: {
      color: C.maroon
    }
  }, "Ambient sound"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, "Soft breathing ambience during cooldowns and a chime when items are saved to the vault."))), /*#__PURE__*/React.createElement("button", {
    onClick: () => actions.setSoundEnabled(!state.soundEnabled),
    className: "zs-toggle w-11 h-6 rounded-full relative flex-shrink-0",
    style: {
      backgroundColor: state.soundEnabled ? C.maroon : "#E5DFD3"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all",
    style: {
      left: state.soundEnabled ? "20px" : "2px"
    }
  })))));
}

/* ---------------- Impulse Buddy approval modal ---------------- */

function ApprovalModal({
  request,
  onApprove,
  onDeny
}) {
  if (!request) return null;
  const buddy = request.buddy || {
    name: "your Impulse Buddy",
    phone: ""
  };
  const isVault = request.type === "vaultUnlock";
  const isThreshold = request.type === "threshold";
  const title = isVault ? "Vault unlock needs approval" : isThreshold ? "Price threshold change needs approval" : "High-value night purchase needs approval";
  const itemName = isThreshold ? "Price threshold" : isVault ? request.items.length > 1 ? `${request.items.length}-item bundle` : request.items[0].name : request.cart ? request.cart.name : "";
  const itemPrice = isThreshold ? request.newValue : isVault ? request.items.reduce((s, x) => s + x.price, 0) : request.cart ? request.cart.price : 0;
  const messageBody = isVault ? `Requesting early unlock of ${itemName} (${fmt(itemPrice)}) from the vault.` : isThreshold ? `Requesting to change the price threshold to ${fmt(itemPrice)}.` : `Requesting approval to buy ${itemName} (${fmt(itemPrice)}) during night curfew.`;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 flex items-center justify-center p-4",
    style: {
      backgroundColor: "rgba(42,24,16,0.45)",
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      scale: 0.92,
      y: 12
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 26
    },
    className: "rounded-3xl p-6 w-full max-w-full",
    style: {
      backgroundColor: C.white,
      boxShadow: "0 20px 60px rgba(74,4,4,0.25)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-3 py-2 rounded-xl mb-4",
    style: {
      backgroundColor: rgba(C.sage, 0.15)
    }
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 14,
    color: C.sage
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium",
    style: {
      color: C.ink
    }
  }, "Request sent to ", buddy.name, " — waiting on their response.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0",
    style: {
      backgroundColor: rgba(C.terracotta, 0.12)
    }
  }, /*#__PURE__*/React.createElement(ShieldQuestion, {
    size: 20,
    color: C.terracotta
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "zs-display text-base font-semibold",
    style: {
      color: C.maroon
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: C.muted
    }
  }, itemName, " · ", fmt(itemPrice)))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 mb-4",
    style: {
      backgroundColor: "#FAF8F3"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs flex items-center gap-1.5 mb-1",
    style: {
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement(MessageCircle, {
    size: 13
  }), "Simulated WhatsApp/SMS sent to ", buddy.name, " ", buddy.phone ? `(${buddy.phone})` : ""), /*#__PURE__*/React.createElement("p", {
    className: "text-sm",
    style: {
      color: C.ink
    }
  }, "\"", messageBody, " Approval code: ", /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, request.code), "\""), isVault && /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-2 flex items-center gap-1.5",
    style: {
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement(ArrowRight, {
    size: 12
  }), " If approved, this moves straight back to the checkout sandbox — not an automatic purchase.")), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-4 mb-5",
    style: {
      backgroundColor: rgba(C.maroon, 0.04),
      border: `1px dashed ${rgba(C.maroon, 0.2)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Smartphone, {
    size: 14,
    color: C.maroon
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium",
    style: {
      color: C.maroon
    }
  }, buddy.name, "'s phone (simulated)")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mb-3",
    style: {
      color: C.muted
    }
  }, "Code ", request.code, " — approve or deny this request on ", buddy.name, "'s behalf to continue the demo."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onDeny,
    className: "zs-track flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold",
    style: {
      backgroundColor: rgba(C.terracotta, 0.12),
      color: C.terracotta
    }
  }, /*#__PURE__*/React.createElement(XCircle, {
    size: 14
  }), " Deny"), /*#__PURE__*/React.createElement("button", {
    onClick: onApprove,
    className: "zs-track flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold",
    style: {
      backgroundColor: C.maroon,
      color: C.cream
    }
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    size: 14
  }), " Approve as ", buddy.name))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-center",
    style: {
      color: "#B5AA9C"
    }
  }, "In a production build this screen would live on your buddy's device, not yours.")));
}

/* ---------------- Root ---------------- */

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');
  .zs-display { font-family: 'Fraunces', 'Georgia', serif; font-weight: 600; letter-spacing: -0.01em; }
  .zs-track { transition: all 0.2s ease; }
  .zs-track:hover { transform: translateY(-1px); filter: brightness(1.03); }
  .zs-track:active { transform: translateY(0); }
  @keyframes breatheOuter {
    0% { transform: scale(0.75); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(0.75); opacity: 0.5; }
  }
  @keyframes breatheInner {
    0% { transform: scale(0.85); opacity: 0.6; }
    50% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(0.85); opacity: 0.6; }
  }
  .breathe-circle-outer { animation: breatheOuter 4s ease-in-out infinite; }
  .breathe-circle-inner { animation: breatheInner 4s ease-in-out infinite; animation-delay: 0.3s; }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .log-enter { animation: slideIn 0.35s ease; }
  @keyframes zsSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .zs-spin { animation: zsSpin 1s linear infinite; }
`;
function ZenSpend() {
  const [page, setPage] = useState("login");
  // --- Firebase auth state (kept separate from the Demo Account flow) ---
  const [authUser, setAuthUser] = useState(null);
  const [isDemo, setIsDemo] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const initializedUidRef = useRef(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setAuthUser(user);
      setAuthChecking(false);
      if (user) {
        // A real Firebase-authenticated user is present (fresh sign-in,
        // sign-up, or a restored session on page load) — let them in.
        // Only reset app data the first time we see this uid this tab
        // session; onAuthStateChanged can also fire on silent token
        // refreshes for an already-active session, and we don't want to
        // wipe someone's in-progress cart/vault when that happens.
        if (initializedUidRef.current !== user.uid) {
          initializedUidRef.current = user.uid;
          resetToFreshProfile();
        }
        setIsDemo(false);
        setPage("dashboard");
      } else {
        initializedUidRef.current = null;
        if (!isDemo) {
          // No Firebase user and not in the middle of a demo session —
          // make sure protected pages aren't reachable.
          setPage("login");
        }
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [activeTab, setActiveTab] = useState("browse");
  const [moodIndex, setMoodIndex] = useState(3); // Stressed
  const [blocked, setBlocked] = useState({
    lateNightTech: true,
    boredomFashion: true,
    emotionalUberEats: false,
    hypeSneakers: true
  });
  const [cartIdx, setCartIdx] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [countdown, setCountdown] = useState(10);
  const [saved, setSaved] = useState(482);
  const [logs, setLogs] = useState(initialLogs());
  const [purchaseHistory, setPurchaseHistory] = useState(initialPurchaseHistory());
  const [ratio, setRatio] = useState([3, 5, 2, 6, 4, 7, 3]);
  const [streak, setStreak] = useState(4);
  const [pulseKey, setPulseKey] = useState(0);
  const [vault, setVault] = useState(initialVault());
  const [interceptedCount, setInterceptedCount] = useState(9);
  const [persona, setPersona] = useState("zen");
  const [priceThreshold, setPriceThreshold] = useState(200);
  const [curfewEnabled, setCurfewEnabled] = useState(true);
  // Demo-only override: the real curfew only fires 10pm-6am local time,
  // which makes it impossible to test/demo during the day. This flag lets
  // Settings force "it's curfew hours" on regardless of the real clock.
  const [forceCurfewDemo, setForceCurfewDemo] = useState(false);
  const [moodSpendData, setMoodSpendData] = useState({
    Calm: 1,
    Bored: 3,
    Anxious: 6,
    Stressed: 8,
    Hyper: 4
  });
  const [activePlatform, setActivePlatform] = useState("amazon");
  const [scrollLevel, setScrollLevel] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [autoSync, setAutoSync] = useState(false);
  const [scrollSensitivity, setScrollSensitivity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [buddies, setBuddies] = useState([]);
  const [pendingUnlocks, setPendingUnlocks] = useState({});
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [approvalRequest, setApprovalRequest] = useState(null);
  const [currency, setCurrencyRaw] = useState("USD");
  const timerRef = useRef(null);

  // Keep the module-level currency flag in sync so fmt() can format every
  // price in the app without threading currency through every call site.
  const setCurrency = c => {
    CURRENT_CURRENCY = c;
    setCurrencyRaw(c);
  };
  useEffect(() => {
    if (phase === "intercept" && countdown > 0) {
      timerRef.current = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [phase, countdown]);
  const addLog = text => setLogs(prev => [{
    time: timeNow(),
    text
  }, ...prev].slice(0, 10));

  // Vaults one or more items together as a single bundle (or a lone item
  // when there's only one) so they can later be unlocked or deleted as a unit.
  const vaultItemsAsBundle = (items, moodKeyOverride) => {
    if (!items || items.length === 0) return [];
    const hours = 24;
    const bundleId = items.length > 1 ? `bundle-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` : null;
    const moodKey = moodKeyOverride || MOODS[moodIndex].key;
    const newEntries = items.map(it => ({
      id: `v${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: it.name,
      price: it.price,
      tag: it.tag || "General",
      source: it.source || "",
      mood: moodKey,
      expiresAt: Date.now() + hours * 3600 * 1000,
      totalHours: hours,
      bundleId
    }));
    setVault(v => [...newEntries, ...v]);
    return newEntries;
  };
  const startCheckout = () => {
    const overItems = cartItems.filter(it => it.price > priceThreshold);
    const underItems = cartItems.filter(it => it.price <= priceThreshold);
    if (overItems.length > 0) {
      vaultItemsAsBundle(overItems);
      const label = overItems.length > 1 ? `${overItems.length} items` : overItems[0].name;
      addLog(`${label} automatically moved to your 24h Vault — over your ${fmt(priceThreshold)} threshold.`);
      playClink(soundEnabled);
    }
    if (underItems.length === 0) {
      setCartItems([]);
      if (overItems.length > 0) {
        setPhase("vaulted");
        setTimeout(() => {
          setCartIdx(i => (i + 1) % CART_ITEMS.length);
          setPhase("idle");
        }, 1800);
      }
      return;
    }
    setCartItems(underItems);
    const inCurfew = isNightCurfew(curfewEnabled, forceCurfewDemo);
    const moodKey = MOODS[moodIndex].key;
    // Routing rules:
    // - Night curfew (10pm-6am): ALWAYS pause for the breathing exercise,
    //   regardless of mood — even Calm.
    // - Day time + Calm: skip the pause entirely, straight to checkout.
    // - Day time + any other mood: pause for the breathing exercise too.
    const needsPause = inCurfew || moodKey !== "Calm";
    if (needsPause) {
      setPhase("intercept");
      setCountdown(10);
      setPulseKey(k => k + 1);
      setInterceptedCount(c => c + 1);
    } else {
      // Calm mood during day time goes straight into the realistic
      // address -> payment -> fraud-analysis checkout.
      setPhase("address");
    }
  };
  const nextCart = () => {
    setCartItems([]);
    setCartIdx(i => (i + 1) % CART_ITEMS.length);
    setPhase("idle");
  };

  // Fires once the new checkout flow's fraud analysis step has been
  // acknowledged via "Complete Secure Payment".
  const completePurchase = (cart, fraudResult) => {
    addLog(`Payment of ${fmt(cart.price)} completed for ${cart.name}. Fraud check: ${fraudResult.status} (${fraudResult.score}% risk).`);
    playClink(soundEnabled);
    setPhase("success");
    // No auto-advance here anymore — the success screen now stays up until
    // the person taps "Continue shopping" (see continueShopping below).
  };

  // Called from the "Continue shopping" button on the success screen.
  // Clears the just-purchased cart, resets checkout back to idle, and sends
  // the person back to Browse so they can add new items and go again.
  const continueShopping = () => {
    nextCart();
    setActiveTab("browse");
  };
  const bumpMoodSpend = delta => {
    const key = MOODS[moodIndex].key;
    setMoodSpendData(d => ({
      ...d,
      [key]: Math.max(1, (d[key] || 1) + delta)
    }));
  };
  const resolveCancel = cart => {
    setSaved(s => Math.round((s + cart.price) * 100) / 100);
    setRatio(r => [...r.slice(1), Math.max(1, r[r.length - 1] - 2)]);
    setStreak(s => s + 1);
    addLog(LINES[persona].cancel(cart.name, cart.price));
    bumpMoodSpend(-1);
    setPhase("resolved");
    setTimeout(() => nextCart(), 1600);
  };
  const resolveConfirm = cart => {
    setRatio(r => [...r.slice(1), Math.min(9, r[r.length - 1] + 2)]);
    addLog(LINES[persona].confirm(cart.name));
    bumpMoodSpend(1);
    const moodKey = MOODS[moodIndex].key;
    const dateLabel = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    const items = cart.items && cart.items.length > 0 ? cart.items : [{
      name: cart.name,
      price: cart.price
    }];
    setPurchaseHistory(prev => [...items.map(it => ({
      id: `p${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: it.name,
      price: it.price,
      moodKey,
      date: dateLabel
    })), ...prev]);
    setPhase("resolved");
    setTimeout(() => nextCart(), 1600);
  };
  const resolveHold = cart => {
    const items = cart.items && cart.items.length > 0 ? cart.items : [{
      name: cart.name,
      price: cart.price,
      tag: cart.tag,
      source: cart.source
    }];
    vaultItemsAsBundle(items);
    addLog(LINES[persona].hold(cart.name, 24));
    bumpMoodSpend(-1);
    playClink(soundEnabled);
    setPhase("resolved");
    setTimeout(() => nextCart(), 1600);
  };
  const groupKeyOf = item => item.bundleId || item.id;

  // Operates on a whole bundle at once — giving up on a bundle means
  // giving up on everything that was vaulted together.
  const deleteVaultItem = items => {
    const list = Array.isArray(items) ? items : [items];
    if (list.length === 0) return;
    const ids = list.map(x => x.id);
    setVault(v => v.filter(x => !ids.includes(x.id)));
    const total = list.reduce((s, x) => s + x.price, 0);
    setSaved(s => Math.round((s + total) * 100) / 100);
    setStreak(s => s + 1);
    const label = list.length > 1 ? `${list.length} items` : list[0].name;
    addLog(LINES[persona].cancel(label, total));
  };

  // Approval moves the whole bundle back to the checkout sandbox, rather
  // than just deleting it — the point is to let the person actually decide,
  // not to silently finish the purchase for them.
  const unlockVaultItem = items => {
    const list = Array.isArray(items) ? items : [items];
    if (list.length === 0) return;
    const ids = list.map(x => x.id);
    setVault(v => v.filter(x => !ids.includes(x.id)));
    setCartItems(prev => [...prev, ...list.map(x => ({
      id: `c${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: x.name,
      price: x.price,
      tag: x.tag || "General",
      source: x.source || ""
    }))]);
    setActiveTab("interceptor");
    setPhase("idle");
  };

  // Any vault unlock always needs an Impulse Buddy's sign-off. When more
  // than one buddy is saved, the caller passes which one to request; with
  // exactly one saved buddy, Vault defaults to them automatically. `items`
  // is the whole bundle group sharing this item's bundleId (or just the
  // one item if it isn't part of a bundle).
  const requestUnlock = (items, buddy) => {
    const list = Array.isArray(items) ? items : [items];
    if (list.length === 0) return;
    if (buddies.length === 0) {
      addLog("Vault unlock blocked: add an Impulse Buddy in AI Persona & Rules first.");
      return;
    }
    const chosen = buddy || buddies[0];
    const code = genApprovalCode();
    const groupKey = groupKeyOf(list[0]);
    setPendingUnlocks(prev => ({
      ...prev,
      [groupKey]: {
        buddy: chosen,
        code
      }
    }));
    setApprovalRequest({
      type: "vaultUnlock",
      items: list,
      buddy: chosen,
      code
    });
    const label = list.length > 1 ? `${list.length} items` : list[0].name;
    addLog(`Unlock request sent to ${chosen.name} for ${label}.`);
  };

  // Checkout confirmation only gets gated when it's a high-value purchase
  // happening during night curfew; otherwise it goes straight through.
  const requestConfirm = cart => {
    const gated = cart.price > priceThreshold && isNightCurfew(curfewEnabled, forceCurfewDemo);
    if (!gated) {
      resolveConfirm(cart);
      return;
    }
    if (buddies.length === 0) {
      addLog(`Blocked: ${cart.name} (${fmt(cart.price)}) needs Impulse Buddy approval during curfew. Add a buddy in AI Persona & Rules.`);
      return;
    }
    setApprovalRequest({
      type: "checkout",
      cart,
      buddy: buddies[0],
      code: genApprovalCode()
    });
  };

  // Changing the price threshold always needs an Impulse Buddy's sign-off,
  // since it directly controls what gets auto-vaulted at checkout.
  const requestThresholdChange = (newValue, buddy) => {
    if (buddies.length === 0) {
      addLog(`Blocked: changing the price threshold to ${fmt(newValue)} needs Impulse Buddy approval. Add a buddy in AI Persona & Rules.`);
      return;
    }
    const chosen = buddy || buddies[0];
    setApprovalRequest({
      type: "threshold",
      newValue,
      buddy: chosen,
      code: genApprovalCode()
    });
  };
  const approveRequest = () => {
    if (!approvalRequest) return;
    const {
      buddy
    } = approvalRequest;
    if (approvalRequest.type === "vaultUnlock") {
      const items = approvalRequest.items;
      unlockVaultItem(items);
      const groupKey = groupKeyOf(items[0]);
      setPendingUnlocks(prev => {
        const next = {
          ...prev
        };
        delete next[groupKey];
        return next;
      });
      const label = items.length > 1 ? `${items.length} items` : items[0].name;
      addLog(`${buddy.name} approved unlocking ${label} — moved to your checkout sandbox.`);
    } else if (approvalRequest.type === "checkout") {
      resolveConfirm(approvalRequest.cart);
      addLog(`${buddy.name} approved the night purchase of ${approvalRequest.cart.name}.`);
    } else if (approvalRequest.type === "threshold") {
      setPriceThreshold(approvalRequest.newValue);
      addLog(`${buddy.name} approved changing your price threshold to ${fmt(approvalRequest.newValue)}.`);
    }
    setApprovalRequest(null);
  };
  const denyRequest = () => {
    if (!approvalRequest) return;
    const {
      buddy
    } = approvalRequest;
    if (approvalRequest.type === "vaultUnlock") {
      const items = approvalRequest.items;
      const groupKey = groupKeyOf(items[0]);
      setPendingUnlocks(prev => {
        const next = {
          ...prev
        };
        delete next[groupKey];
        return next;
      });
      const label = items.length > 1 ? `${items.length} items` : items[0].name;
      addLog(`${buddy.name} denied unlocking ${label}. It stays in the vault.`);
    } else if (approvalRequest.type === "checkout") {
      addLog(`${buddy.name} denied the night purchase of ${approvalRequest.cart.name}.`);
    } else if (approvalRequest.type === "threshold") {
      addLog(`${buddy.name} denied changing the price threshold. It stays at ${fmt(priceThreshold)}.`);
    }
    setApprovalRequest(null);
  };
  const addBuddy = b => setBuddies(prev => [...prev, {
    ...b,
    id: `b${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
  }]);
  const removeBuddy = id => setBuddies(prev => prev.filter(b => b.id !== id));
  const toggleCategory = key => setBlocked(b => ({
    ...b,
    [key]: !b[key]
  }));
  const registerScroll = rawSpeed => {
    const adjustedSpeed = rawSpeed * scrollSensitivity;
    setScrollSpeed(prev => {
      const smoothed = prev * 0.65 + adjustedSpeed * 0.35;
      const level = classifySpeed(smoothed);
      setScrollLevel(level);
      return smoothed;
    });
  };
  const decayScroll = () => {
    setScrollSpeed(prev => {
      const next = prev * 0.75;
      setScrollLevel(classifySpeed(next));
      return next;
    });
  };
  useEffect(() => {
    if (autoSync) {
      setMoodIndex(SCROLL_STATES[scrollLevel].moodIndex);
    }
  }, [scrollLevel, autoSync]);

  // Manual mood selection always wins: picking a mood by hand turns auto-sync
  // off so the choice sticks instead of getting overwritten on the next tick.
  const setMoodManually = i => {
    setAutoSync(false);
    setMoodIndex(i);
  };
  const addToCart = item => {
    setCartItems(prev => [...prev, {
      ...item,
      id: `c${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    }]);
  };
  const removeFromCart = id => {
    setCartItems(prev => prev.filter(it => it.id !== id));
  };
  const goToCheckout = () => {
    setActiveTab("interceptor");
    setPhase("idle");
  };

  // Called from Browse when the whole cart's total is already over the
  // threshold, so there's no point routing it through checkout at all.
  const vaultEntireCart = () => {
    if (cartItems.length === 0) return;
    const total = cartItems.reduce((sum, it) => sum + it.price, 0);
    vaultItemsAsBundle(cartItems);
    addLog(`Cart totaling ${fmt(total)} moved to your 24h Vault — over your ${fmt(priceThreshold)} threshold.`);
    playClink(soundEnabled);
    setCartItems([]);
  };

  // The other option from Browse when a cart is already over threshold —
  // give up on it outright instead of vaulting it for later.
  const cancelEntireCart = () => {
    if (cartItems.length === 0) return;
    const total = cartItems.reduce((sum, it) => sum + it.price, 0);
    setSaved(s => Math.round((s + total) * 100) / 100);
    setStreak(s => s + 1);
    addLog(`Cancelled a cart totaling ${fmt(total)} before it reached checkout. Nicely done.`);
    bumpMoodSpend(-1);
    setCartItems([]);
  };
  // Resets every piece of app state to the canned dummy-account scenario.
  const resetToDemoDefaults = () => {
    setActiveTab("browse");
    setMoodIndex(3);
    setPhase("idle");
    setCartIdx(0);
    setSaved(482);
    setLogs(initialLogs());
    setPurchaseHistory(initialPurchaseHistory());
    setVault(initialVault());
    setStreak(4);
    setInterceptedCount(9);
    setActivePlatform("amazon");
    setScrollLevel(0);
    setScrollSpeed(0);
    setAutoSync(false);
    setCartItems([]);
    setBuddies([]);
    setPendingUnlocks({});
    setApprovalRequest(null);
    setCurrency("USD");
    setPriceThreshold(200);
  };

  // Resets every piece of app state to a blank slate for a real account —
  // no canned demo data. There's no backend beyond Firebase Auth here, so
  // "signing in" always starts a fresh session rather than restoring
  // whatever that account had last time.
  const resetToFreshProfile = () => {
    setActiveTab("browse");
    setMoodIndex(0);
    setPhase("idle");
    setCartIdx(0);
    setSaved(0);
    setLogs([]);
    setPurchaseHistory([]);
    setVault([]);
    setStreak(0);
    setInterceptedCount(0);
    setActivePlatform("amazon");
    setScrollLevel(0);
    setScrollSpeed(0);
    setAutoSync(false);
    setCartItems([]);
    setBuddies([]);
    setPendingUnlocks({});
    setApprovalRequest(null);
    setCurrency("USD");
    setPriceThreshold(200);
    setBlocked({
      lateNightTech: true,
      boredomFashion: true,
      emotionalUberEats: false,
      hypeSneakers: true
    });
    setRatio([1, 1, 1, 1, 1, 1, 1]);
    setMoodSpendData({ Calm: 1, Bored: 1, Anxious: 1, Stressed: 1, Hyper: 1 });
    setCurfewEnabled(true);
    setPersona("zen");
    setSoundEnabled(true);
  };

  const handleDemoLogin = () => {
    setIsDemo(true);
    resetToDemoDefaults();
    setPage("dashboard");
  };
  const handleLogout = () => {
    if (authUser) {
      // Real Firebase user — sign out properly. onAuthStateChanged will
      // fire, clear initializedUidRef, and move us back to the login page.
      signOut(auth).catch(() => {});
    }
    setIsDemo(false);
    setPage("login");
    // No state resets here — the next sign-in (demo or real) resets to the
    // right starting point on its own, so logout doesn't need to guess.
  };
  if (authChecking) {
    // Briefly shown on first load while Firebase restores any existing
    // signed-in session, so we don't flash the login screen unnecessarily.
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen w-full flex items-center justify-center",
      style: {
        backgroundColor: C.cream,
        fontFamily: "'Inter', system-ui, sans-serif"
      }
    }, /*#__PURE__*/React.createElement("style", null, globalStyles), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-center gap-3"
    }, /*#__PURE__*/React.createElement(Loader2, {
      size: 24,
      color: C.maroon,
      className: "animate-spin"
    }), /*#__PURE__*/React.createElement("p", {
      className: "text-sm",
      style: {
        color: C.muted
      }
    }, "Loading ZenSpend…")));
  }
  if (page === "login") {
    return /*#__PURE__*/React.createElement(LoginScreen, {
      onDemoLogin: handleDemoLogin
    });
  }
  const state = {
    moodIndex,
    blocked,
    cartIdx,
    phase,
    countdown,
    saved,
    logs,
    ratio,
    streak,
    pulseKey,
    vault,
    interceptedCount,
    persona,
    priceThreshold,
    curfewEnabled,
    forceCurfewDemo,
    moodSpendData,
    activePlatform,
    scrollLevel,
    autoSync,
    scrollSensitivity,
    cartItems,
    buddies,
    pendingUnlocks,
    soundEnabled,
    currency,
    approvalRequest,
    purchaseHistory
  };
  const actions = {
    setMoodIndex,
    setMoodManually,
    toggleCategory,
    startCheckout,
    resolveCancel,
    resolveConfirm,
    resolveHold,
    deleteVaultItem,
    unlockVaultItem,
    requestUnlock,
    requestConfirm,
    requestThresholdChange,
    setPersona,
    setPriceThreshold,
    setCurfewEnabled,
    setForceCurfewDemo,
    setActivePlatform,
    setActiveTab,
    setAutoSync,
    setScrollSensitivity,
    registerScroll,
    decayScroll,
    addToCart,
    removeFromCart,
    goToCheckout,
    vaultEntireCart,
    cancelEntireCart,
    addBuddy,
    removeBuddy,
    setSoundEnabled,
    setCurrency,
    setPhase,
    completePurchase,
    continueShopping
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen w-full pb-10",
    style: {
      background: `radial-gradient(circle at 8% 0%, ${rgba(C.gold, 0.08)} 0%, transparent 35%), radial-gradient(circle at 100% 25%, ${rgba(C.terracotta, 0.07)} 0%, transparent 40%), radial-gradient(circle at 50% 100%, ${rgba(C.sage, 0.06)} 0%, transparent 45%), ${C.cream}`,
      fontFamily: "'Inter', system-ui, sans-serif",
      color: C.ink
    }
  }, /*#__PURE__*/React.createElement("style", null, globalStyles), /*#__PURE__*/React.createElement("div", {
    className: "pt-4"
  }, /*#__PURE__*/React.createElement(Navbar, {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    onLogout: handleLogout,
    soundEnabled: soundEnabled,
    setSoundEnabled: setSoundEnabled,
    isDemo: isDemo,
    userEmail: authUser ? authUser.displayName || authUser.email : ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "max-w-full mx-auto px-4 sm:px-6"
  }, activeTab === "browse" && /*#__PURE__*/React.createElement(Browse, {
    state: state,
    actions: actions
  }), activeTab === "interceptor" && /*#__PURE__*/React.createElement(Interceptor, {
    state: state,
    actions: actions
  }), activeTab === "vault" && /*#__PURE__*/React.createElement(Vault, {
    state: state,
    actions: actions
  }), activeTab === "analytics" && /*#__PURE__*/React.createElement(Analytics, {
    state: state
  }), activeTab === "persona" && /*#__PURE__*/React.createElement(PersonaRules, {
    state: state,
    actions: actions
  })), /*#__PURE__*/React.createElement(AnimatePresence, null, approvalRequest && /*#__PURE__*/React.createElement(ApprovalModal, {
    request: approvalRequest,
    onApprove: approveRequest,
    onDeny: denyRequest
  })));
}
export default ZenSpend;
