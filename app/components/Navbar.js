// ============================================================
// app/components/Navbar.js
// FIXED — No event handlers (Next.js safe)
// ============================================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../lib/ThemeContext";

const NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/chat", label: "Chat" },
  { href: "/history", label: "History" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link href="/home" className="logo">
        <span style={{ fontSize: 20 }}>⚡</span>
        <span className="logo-text">Neural PDF</span>
      </Link>

      {/* Right */}
      <div className="nav-right">

        {/* Links */}
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`nav-link ${isActive ? "active" : ""}`}
            >
              {label}
            </Link>
          );
        })}

        <div className="divider" />

        {/* Theme Button */}
        <button className="theme-btn" onClick={toggleTheme}>
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}