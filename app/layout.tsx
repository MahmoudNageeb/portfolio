"use client";
import "./globals.css";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "الرئيسية", icon: "fas fa-home" },
  { href: "/experience", label: "الخبرات", icon: "fas fa-briefcase" },
  { href: "/skills", label: "المهارات", icon: "fas fa-cogs" },
  { href: "/projects", label: "المشاريع", icon: "fas fa-layer-group" },
  { href: "/goals", label: "الأهداف", icon: "fas fa-bullseye" },
  { href: "/contact", label: "تواصل", icon: "fas fa-paper-plane" },
];

function Navbar() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const s = localStorage.getItem("theme") as "dark" | "light" | null;
    const t = s || "dark";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggle = useCallback(() => {
    const n = theme === "dark" ? "light" : "dark";
    setTheme(n);
    localStorage.setItem("theme", n);
    document.documentElement.setAttribute("data-theme", n);
  }, [theme]);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      <div className="topbar">
        <span>بسم الله الرحمن الرحيم</span>
      </div>

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <Link href="/" className="nav-brand" onClick={closeMenu}>
          <span className="nav-logo">TN</span>
          <span>TAHA NAGEEB</span>
        </Link>

        <ul className="nav-links">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className={path === n.href ? "active" : ""}>{n.label}</Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="theme-btn" onClick={toggle} aria-label="Toggle theme">
            <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"} />
          </button>
          <button className={`ham${open ? " open" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mob-menu${open ? " open" : ""}`}>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={path === n.href ? "active" : ""} onClick={closeMenu}>
            <i className={n.icon} />{n.label}
          </Link>
        ))}
      </div>

      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 998,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
          onClick={closeMenu}
        />
      )}
    </>
  );
}

function ScrollProgress() {
  useEffect(() => {
    const b = document.getElementById("sp");
    const fn = () => {
      if (!b) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      b.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div id="sp" className="s-prog" />;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button className={`btt${show ? " vis" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Top">
      <i className="fas fa-chevron-up" />
    </button>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
      </div>
      <p className="footer-copy">&copy; {new Date().getFullYear()} Taha Nageeb — جميع الحقوق محفوظة.</p>
    </footer>
  );
}

function ScrollAnim() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".anim").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

/* ===== Ultra Professional Page Loader - Home Page Only ===== */
function PageLoader() {
  const path = usePathname();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [dotIndex, setDotIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const statusIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dotIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const statusTexts = ["ESTABLISHING CONNECTION", "LOADING MODULES", "SYNCHRONIZING DATA", "CALIBRATING SYSTEM", "ALMOST READY", "WELCOME BACK"];
  const dots = ["", ".", "..", "..."];

  const isHomePage = path === "/";

  useEffect(() => {
    if (!isHomePage) {
      setLoading(false);
      return;
    }

    let currentProgress = 0;
    
    // Smooth progress counter - fixed to never exceed 100
    intervalRef.current = setInterval(() => {
      currentProgress += Math.random() * 8 + 2;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, 120);

    // Status text changer
    let statusIdx = 0;
    statusIntervalRef.current = setInterval(() => {
      statusIdx = (statusIdx + 1) % statusTexts.length;
      setStatusIndex(statusIdx);
    }, 800);

    // Dot animation
    let dotIdx = 0;
    dotIntervalRef.current = setInterval(() => {
      dotIdx = (dotIdx + 1) % dots.length;
      setDotIndex(dotIdx);
    }, 300);

    // Timer to hide loader after progress reaches 100
    const checkComplete = setInterval(() => {
      if (currentProgress >= 100) {
        setTimeout(() => {
          setLoading(false);
          clearInterval(checkComplete);
        }, 500);
      }
    }, 50);

    timerRef.current = setTimeout(() => {
      if (currentProgress < 100) {
        setProgress(100);
        setTimeout(() => setLoading(false), 500);
      }
    }, 4000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);
      if (dotIntervalRef.current) clearInterval(dotIntervalRef.current);
      clearInterval(checkComplete);
    };
  }, [isHomePage]);

  if (!isHomePage) return null;

  return (
    <div className={`page-loader${loading ? "" : " hide"}`}>
      {/* Animated Background Particles */}
      <div className="loader-bg-particles">
        <div className="particle" /><div className="particle" /><div className="particle" />
        <div className="particle" /><div className="particle" /><div className="particle" />
        <div className="particle" /><div className="particle" /><div className="particle" />
        <div className="particle" /><div className="particle" /><div className="particle" />
      </div>

      {/* Main Circle Container */}
      <div className="loader-circle-container">
        <div className="loader-outer-ring" />
        <div className="loader-middle-ring" />
        <div className="loader-inner-ring" />
        <div className="loader-core-ring" />
        <div className="loader-logo">ADVACC</div>
        <div className="loader-particle" />
        <div className="loader-particle" />
        <div className="loader-particle" />
        <div className="loader-particle" />
        <div className="loader-particle" />
        <div className="loader-particle" />
      </div>
      
      {/* Progress Number */}
      <div className="loader-progress">
        <span className="progress-number">{Math.min(progress, 100)}</span>
        <span className="progress-percent">%</span>
      </div>
      
      {/* Progress Bar with Glow */}
      <div className="loader-bar-container">
        <div className="loader-bar-wrapper">
          <div className="loader-bar-bg" />
          <div className="loader-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
          <div className="loader-bar-glow" style={{ left: `${Math.min(progress, 100)}%` }} />
        </div>
        <div className="loader-bar-stats">
          <span>INITIALIZING</span>
          <span>{Math.min(progress, 100)}% COMPLETE</span>
        </div>
      </div>
      
      {/* Status Text with Typing Effect */}
      <div className="loader-status-container">
        <div className="loader-status-icon">
          <i className="fas fa-terminal" />
        </div>
        <div className="loader-status-text">
          <span className="status-message">{statusTexts[statusIndex]}</span>
          <span className="status-cursor">{dots[dotIndex]}</span>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="loader-floating-elements">
        <div className="float-element"><i className="fas fa-chart-line" /></div>
        <div className="float-element"><i className="fas fa-database" /></div>
        <div className="float-element"><i className="fas fa-code" /></div>
        <div className="float-element"><i className="fas fa-cloud-upload-alt" /></div>
      </div>
      
      {/* Brand Signature */}
      <div className="loader-signature">
        <div className="signature-line" />
        <span>TAHA NAGEEB</span>
        <div className="signature-line" />
      </div>
      <div className="loader-subtitle">Advanced Accounting & Systems Development</div>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#06091a" />
        <meta name="description" content="Taha Nageeb — الموقع الرسمي. رئيس حسابات | مدير موارد بشرية | مطوّر أنظمة وقواعد بيانات. خبرة +14 سنة في الكويت." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
        <title>Taha Nageeb — الموقع الرسمي</title>
      </head>
      <body>
        <PageLoader />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <ScrollAnim />
      </body>
    </html>
  );
}
