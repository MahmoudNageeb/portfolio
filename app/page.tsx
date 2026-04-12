"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let c = 0; const s = Math.ceil(target / 50);
        const id = setInterval(() => { c += s; if (c >= target) { c = target; clearInterval(id); } setV(c); }, 25);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref} className="n">{v}{suffix}</span>;
}

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-orbs"><div className="hero-orb" /><div className="hero-orb" /><div className="hero-orb" /></div>

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-greeting">
            <i className="fas fa-star" /> محاسب محترف ومطوّر أنظمة
          </div>

          {/* Professional name - Taha Nageeb */}
          <div className="hero-name-wrap">
            <h1 className="hero-name">
              Taha <span className="name-accent">Nageeb</span>
            </h1>
            <div className="hero-name-line" />
            <p className="hero-name-sub">Professional Accountant & Systems Developer</p>
          </div>

          <p className="hero-role">
            <i className="fas fa-briefcase" />
            رئيس حسابات | مدير موارد بشرية | مطوّر أنظمة وقواعد بيانات
          </p>
          <p className="hero-bio">
            محاسب محترف بخبرة تمتد لأكثر من ١٤ سنة في قطاع المقاولات والتجارة بدولة الكويت.
            متخصص في إدارة الحسابات والموارد البشرية وتصميم أنظمة قواعد البيانات المتقدمة
            وبرامج إصدار أوامر العمل والفواتير للقطاعين الحكومي والخاص.
          </p>

          <div className="hero-stats">
            <div className="h-stat"><Counter target={14} suffix="+" /><span className="l">سنوات خبرة</span></div>
            <div className="h-stat"><Counter target={35} suffix="+" /><span className="l">مشروع منجز</span></div>
            <div className="h-stat"><Counter target={5} /><span className="l">فئات مهارات</span></div>
          </div>

          <div className="hero-cta">
            <a href="mailto:advacc2000@gmail.com" className="btn-o"><i className="fas fa-envelope" />البريد الإلكتروني</a>
            <Link href="/contact" className="btn-p"><i className="fas fa-paper-plane" />تواصل الآن</Link>
          </div>

          <div className="hero-phones">
            <a href="tel:+96566134944" className="hero-ph"><i className="fas fa-flag" /><span>الكويت</span><i className="fas fa-phone" /><span dir="ltr">+965 6613 4944</span></a>
            <a href="tel:+201069519416" className="hero-ph"><i className="fas fa-flag" /><span>مصر</span><i className="fas fa-phone" /><span dir="ltr">+20 106 951 9416</span></a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="pc-wrap">
            <div className="pc-ring"><div className="pc-dot" /></div>
            <div className="pc-ring"><div className="pc-dot" /></div>
            <div className="pc-ring" />
            <div className="pc-img">
              <Image 
                src="/profile.jpg" 
                alt="Taha Nageeb"
                width={220}
                height={300}
                className="profile-image"
                priority
                quality={80}
              />
            </div>
            <span className="pc-label">ADVACC</span>
          </div>
        </div>
      </div>
    </section>
  );
}
