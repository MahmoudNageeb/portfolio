"use client";
import { useEffect } from "react";

const cats = [
  { title: "المهارات المحاسبية", icon: "fas fa-chart-bar", c: "c", bg: "rgba(0,212,255,.1)", fc: "var(--c1)",
    items: [
      "إعداد الميزانيات العمومية والقوائم المالية",
      "التحليل المالي المتقدم وإعداد التقارير",
      "إدارة الحسابات والدفاتر المحاسبية",
      "التدقيق المحاسبي ومراجعة القيود",
      "معالجة الفواتير والمستندات المالية",
      "إعداد الإقرارات الضريبية والتسويات البنكية",
    ] },
  { title: "المهارات التقنية", icon: "fas fa-code", c: "p", bg: "rgba(168,85,247,.1)", fc: "var(--c2)",
    items: [
      "تصميم وتطوير قواعد البيانات المتقدمة",
      "برامج المحاسبة الإلكترونية والجاهزة",
      "أنظمة إدارة الموارد البشرية",
      "برامج إصدار الفواتير وأوامر العمل",
      "أتمتة العمليات والأنظمة المكتبية",
      "تطوير أنظمة إدارة المناقصات والعقود",
    ] },
  { title: "مهارات إدارية", icon: "fas fa-tasks", c: "g", bg: "rgba(34,197,94,.1)", fc: "var(--c3)",
    items: [
      "إدارة الفرق (15+ موظف)",
      "إدارة المشاريع والعقود",
      "التخطيط الاستراتيجي والتنظيمي",
      "إدارة الموارد البشرية المتكاملة",
      "حل المشاكل المعقدة واتخاذ القرارات",
      "تنسيق العمليات بين الأقسام",
    ] },
  { title: "المهارات اللغوية", icon: "fas fa-language", c: "y", bg: "rgba(245,158,11,.1)", fc: "var(--c4)",
    items: [
      "اللغة العربية — مستوى ممتاز",
      "اللغة الإنجليزية — مستوى جيد",
      "الكتابة التقنية والإدارية",
      "التواصل الفعّال والعرض التقديمي",
      "إعداد التقارير والمراسلات الرسمية",
      "الطباعة السريعة +60 كلمة/دقيقة (عربي + إنجليزي)",
    ] },
  { title: "الشهادات والدورات", icon: "fas fa-certificate", c: "r", bg: "rgba(244,63,94,.1)", fc: "var(--c5)",
    items: [
      "بكالوريوس تجارة — شعبة محاسبة (2012)",
      "ICDL — الرخصة الدولية لقيادة الحاسب",
      "محاسبة إلكترونية — جامعة أسيوط (موثقة من الخارجية)",
      "Tech Typing — 60+ كلمة/دقيقة (عربي + إنجليزي)",
      "دورة اللغة الإنجليزية — موثقة من وزارة الخارجية",
      "دورة البرمجة — الجامعة البريطانية (موثقة من الخارجية)",
    ] },
];

const colorMap: Record<string, string> = { c: "var(--c1)", p: "var(--c2)", g: "var(--c3)", y: "var(--c4)", r: "var(--c5)" };

export default function SkillsPage() {
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
          <div className="sec-badge"><i className="fas fa-cogs" /> القدرات والمهارات</div>
          <h2 className="sec-title">المهارات الاحترافية</h2>
          <p className="sec-desc">مجموعة متنوعة من المهارات المتقدمة مقسمة إلى ٥ فئات رئيسية تغطي المحاسبة والتقنية والإدارة</p>
        </div>

        <div className="cgrid">
          {cats.map((cat, i) => (
            <div key={i} className="crd anim" data-c={cat.c} style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="crd-icon" style={{ background: cat.bg, color: cat.fc }}><i className={cat.icon} /></div>
              <h3>{cat.title}</h3>
              <ul className="crd-list">
                {cat.items.map((item, j) => (
                  <li key={j}><span className="dt" style={{ background: colorMap[cat.c] }} />{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="sbar">
          <div className="sbar-item anim" style={{ transitionDelay: ".3s" }}><span className="sbar-n">+14</span><span className="sbar-l">سنوات خبرة</span></div>
          <div className="sbar-item anim" style={{ transitionDelay: ".4s" }}><span className="sbar-n">+25</span><span className="sbar-l">مشروع منجز</span></div>
          <div className="sbar-item anim" style={{ transitionDelay: ".5s" }}><span className="sbar-n">5</span><span className="sbar-l">فئات مهارات</span></div>
        </div>
      </div>
    </div>
  );
}
