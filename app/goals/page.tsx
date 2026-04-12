"use client";
import { useEffect } from "react";
import Link from "next/link";

const goals = [
  {
    c: "c", icon: "fas fa-lightbulb", bg: "rgba(0,212,255,.1)", fg: "var(--c1)",
    title: "أهداف قصيرة المدى", period: "6 — 12 شهر", pbg: "rgba(0,212,255,.08)",
    items: [
      "تطوير مهاراتي في تقنيات الذكاء الاصطناعي وتحليل البيانات الضخمة",
      "المساهمة في مشاريع تحديثية في القطاعين العام والخاص",
      "تدريب وتطوير الفرق التقنية في مجال الأنظمة المالية",
      "الحصول على شهادات متقدمة في مجال البيانات الضخمة والذكاء الاصطناعي",
    ],
  },
  {
    c: "p", icon: "fas fa-crosshairs", bg: "rgba(168,85,247,.1)", fg: "var(--c2)",
    title: "أهداف متوسطة المدى", period: "1 — 3 سنوات", pbg: "rgba(168,85,247,.08)",
    items: [
      "قيادة فريق متخصص في تطوير الأنظمة المالية والإدارية المتقدمة",
      "تطوير حلول تقنية مبتكرة للقطاع العام والخاص في دول الخليج",
      "نشر أفضل الممارسات في إدارة المشاريع التقنية والمحاسبية",
      "المساهمة في تطوير البنية التحتية التقنية للمؤسسات",
    ],
  },
  {
    c: "g", icon: "fas fa-rocket", bg: "rgba(34,197,94,.1)", fg: "var(--c3)",
    title: "أهداف طويلة المدى", period: "+3 سنوات", pbg: "rgba(34,197,94,.08)",
    items: [
      "أن أصبح خبيراً معترفاً به في مجال الأنظمة المالية والإدارية المتقدمة",
      "المساهمة في تطوير البنية التحتية التقنية للدول العربية",
      "نقل المعرفة والخبرة المتراكمة للأجيال القادمة من المهندسين والمحاسبين",
      "تأسيس مركز متخصص في استشارات الأنظمة التقنية والمالية",
    ],
  },
];

export default function GoalsPage() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.06 }
    );
    document.querySelectorAll(".anim").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ paddingTop: "calc(var(--top-h) + var(--nav-h))" }}>
      <div className="sec">
        <div className="sec-hdr">
          <div className="sec-badge"><i className="fas fa-bullseye" /> الرؤية المستقبلية</div>
          <h2 className="sec-title">الأهداف المهنية</h2>
          <p className="sec-desc">طموحات واضحة ومحددة مقسمة على ثلاث فترات زمنية نحو التطور المهني المستمر</p>
        </div>
        <div className="cgrid">
          {goals.map((g, i) => (
            <div key={i} className="goal-card anim" data-c={g.c} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="goal-top">
                <div className="goal-ico" style={{ background: g.bg, color: g.fg }}><i className={g.icon} /></div>
                <div>
                  <h3 style={{ fontSize: "clamp(.98rem,1.6vw,1.1rem)", marginBottom: ".2rem" }}>{g.title}</h3>
                  <span className="goal-period" style={{ background: g.pbg, color: g.fg }}>{g.period}</span>
                </div>
              </div>
              <ul className="goal-list">{g.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "clamp(1.5rem,4vw,2.5rem)" }} className="anim">
          <Link href="/contact" className="btn-p" style={{ fontSize: "1rem", padding: ".9rem 2.4rem" }}>
            <i className="fas fa-handshake" /> تواصل معي
          </Link>
        </div>
      </div>
    </div>
  );
}
