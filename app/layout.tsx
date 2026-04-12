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

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [path]);

  // Prevent body scroll when menu is open
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
      {/* Bismillah top bar */}
      <div className="topbar">
        <span>بسم الله الرحمن الرحيم</span>
      </div>

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <Link href="/" className="nav-brand" onClick={closeMenu}>
          <span className="nav-logo">A</span>
          <span>ADVACC</span>
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

      {/* Mobile menu - FIXED: using visibility+opacity instead of display:none */}
      <div className={`mob-menu${open ? " open" : ""}`}>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={path === n.href ? "active" : ""} onClick={closeMenu}>
            <i className={n.icon} />{n.label}
          </Link>
        ))}
      </div>

      {/* Overlay to close menu */}
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
      <p className="footer-copy">&copy; {new Date().getFullYear()} advacc — جميع الحقوق محفوظة.</p>
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

/* ===== Professional Page Loader ===== */
function PageLoader() {
  const path = usePathname();
  const [loading, setLoading] = useState(true);
  const prevPath = useRef(path);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initial load
  useEffect(() => {
    timerRef.current = setTimeout(() => setLoading(false), 800);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // Route change
  useEffect(() => {
    if (prevPath.current !== path) {
      prevPath.current = path;
      setLoading(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setLoading(false), 600);
    }
  }, [path]);

  return (
    <div className={`page-loader${loading ? "" : " hide"}`}>
      <div className="loader-logo">A</div>
      <div className="loader-dots"><span /><span /><span /></div>
      <div className="loader-bar"><div className="loader-bar-inner" /></div>
      <p className="loader-text">ADVACC</p>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#06091a" />
        <meta name="description" content="ADVACC — الموقع الرسمي. رئيس حسابات | مدير موارد بشرية | مطوّر أنظمة وقواعد بيانات. خبرة +14 سنة في الكويت." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
        <title>ADVACC — الموقع الرسمي</title>
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
