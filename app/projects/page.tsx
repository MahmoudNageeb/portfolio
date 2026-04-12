"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Proj = { year: string; company: string; area: string; ministry: string; system: string; cat: string };

const projects: Proj[] = [
  // وزارة التربية
  { year: "2020", company: "شركة العامري", area: "ديوان عام الوزارة — المنطقة الثانية", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2021", company: "شركة المزايا الإنشائية", area: "حولي — المنطقة الأولى", ministry: "وزارة الأوقاف", system: "برنامج إصدار التكاليف", cat: "أوقاف" },
  { year: "2023", company: "شركة الأداء الأول", area: "مبارك الكبير — المنطقة الثانية", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2023", company: "شركة المنذر العقارية", area: "الفروانية — المنطقة الأولى", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2023", company: "شركة ساي", area: "العاصمة — المنطقة الثانية", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2023", company: "شركة جلوبال", area: "الفروانية — المنطقة الثانية (تجديد)", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2023", company: "شركة ساي", area: "حولي — المنطقة الثانية", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2023", company: "المنتهى للعقارات والمقاولات", area: "الجهراء — المنطقة الأولى", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2023", company: "شركة المنذر العقارية", area: "ديوان عام الوزارة — المنطقة الأولى", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2023", company: "المنتهى للعقارات والمقاولات", area: "العاصمة — المنطقة الأولى", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2023", company: "شركة المزايا الإنشائية", area: "منطقة خيران", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2023", company: "شركة مفاز", area: "مبارك الكبير — المنطقة الأولى (تجديد)", ministry: "وزارة الأوقاف", system: "برنامج إصدار التكاليف", cat: "أوقاف" },
  { year: "2024", company: "شركة المزايا الإنشائية", area: "الأحمدي — المنطقة الأولى", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2025", company: "شركة النجاة الهندسية", area: "الجهراء — المنطقة الثانية", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2025", company: "شركة نيو هوب", area: "الفروانية — المنطقة الثانية", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2025", company: "شركة نيو هوب", area: "ديوان عام الوزارة — المنطقة الثانية", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  { year: "2025", company: "شركة الحميدية الأهلية", area: "الجهراء — المنطقة الثانية", ministry: "وزارة التربية", system: "برنامج إصدار أوامر العمل والفواتير", cat: "تربية" },
  // وزارة الأوقاف
  { year: "2025", company: "شركة المنتهى", area: "الجهراء (صيانة جذرية)", ministry: "وزارة الأوقاف", system: "برنامج إصدار التكاليف", cat: "أوقاف" },
  { year: "2025", company: "شركة فواز للتجارة والخدمات الهندسية", area: "الفروانية (إنشاءات)", ministry: "وزارة الأوقاف", system: "برنامج إصدار التكاليف", cat: "أوقاف" },
  { year: "2025", company: "شركة تيك نت كويت", area: "الأحمدي (صيانة جذرية)", ministry: "وزارة الأوقاف", system: "برنامج إصدار التكاليف", cat: "أوقاف" },
  { year: "2025", company: "شركة بوت كولرز", area: "حولي (صيانة جذرية)", ministry: "وزارة الأوقاف", system: "برنامج إصدار التكاليف", cat: "أوقاف" },
  { year: "2025", company: "شركة دامور", area: "حولي (صيانة جذرية)", ministry: "وزارة الأوقاف", system: "برنامج إصدار التكاليف", cat: "أوقاف" },
  { year: "2025", company: "شركة المدلول", area: "الفروانية (صيانة جذرية)", ministry: "وزارة الأوقاف", system: "برنامج إصدار التكاليف", cat: "أوقاف" },
  { year: "2025", company: "شركة تطوير الشرق الأوسط", area: "صيانة المساكن الوقفية", ministry: "وزارة الأوقاف", system: "برنامج إصدار التكاليف", cat: "أوقاف" },
  // المجلس الوطني
  { year: "2025", company: "—", area: "جميع المناطق", ministry: "المجلس الوطني للثقافة والفنون والآداب", system: "برنامج شامل لإصدار أوامر العمل", cat: "ثقافة" },
  // وزارة الصحة
  { year: "—", company: "شركة المنذر العقارية", area: "المستشفيات (تجديد)", ministry: "وزارة الصحة", system: "أعمال الصيانة", cat: "صحة" },
];

// حساب العدد الفعلي للمشاريع
const totalProjects = projects.length;

// حساب عدد الوزارات/الجهات الفريدة
const uniqueMinistries = new Set(projects.map(p => p.ministry)).size;

// حساب عدد المناطق الفريدة
const uniqueAreas = new Set(projects.map(p => p.area)).size;

const CATS = ["الكل", "تربية", "أوقاف", "ثقافة", "صحة"];

const iconMap: Record<string, string> = {
  "تربية": "fas fa-graduation-cap",
  "أوقاف": "fas fa-mosque",
  "ثقافة": "fas fa-theater-masks",
  "صحة": "fas fa-hospital",
};

const colorMap: Record<string, { bg: string; fg: string; badge: string }> = {
  "تربية": { bg: "rgba(0,212,255,.1)", fg: "var(--c1)", badge: "rgba(0,212,255,.08)" },
  "أوقاف": { bg: "rgba(168,85,247,.1)", fg: "var(--c2)", badge: "rgba(168,85,247,.08)" },
  "ثقافة": { bg: "rgba(245,158,11,.1)", fg: "var(--c4)", badge: "rgba(245,158,11,.08)" },
  "صحة": { bg: "rgba(34,197,94,.1)", fg: "var(--c3)", badge: "rgba(34,197,94,.08)" },
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState("الكل");

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.04 }
    );
    document.querySelectorAll(".anim").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filter]);

  const filtered = filter === "الكل" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <div style={{ paddingTop: "calc(var(--top-h) + var(--nav-h))" }}>
      <div className="sec">
        <div className="sec-hdr">
          <div className="sec-badge"><i className="fas fa-lock" /> المشاريع المحمية</div>
          <h2 className="sec-title">المشاريع المنجزة</h2>
          <p className="sec-desc">+{totalProjects} مشروع تم تنفيذه لوزارات وجهات رسمية وشركات خاصة — جميعها محمية بسرية تامة</p>
        </div>

        {/* Filter */}
        <div className="proj-filter">
          {CATS.map((c) => (
            <button key={c} className={`proj-fbtn${filter === c ? " active" : ""}`} onClick={() => setFilter(c)}>
              {c === "الكل" ? `الكل (${totalProjects})` : `${c} (${projects.filter((p) => p.cat === c).length})`}
            </button>
          ))}
        </div>

        <div className="cgrid">
          {filtered.map((p, i) => {
            const cl = colorMap[p.cat] || colorMap["تربية"];
            return (
              <div key={`${p.company}-${p.area}-${i}`} className="proj-card anim" style={{ transitionDelay: `${(i % 12) * 0.04}s` }}>
                <div className="proj-top">
                  <div className="proj-ico" style={{ background: cl.bg, color: cl.fg }}>
                    <i className={iconMap[p.cat] || "fas fa-file-invoice"} />
                  </div>
                  <i className="fas fa-lock proj-lock" />
                </div>
                <span className="proj-badge" style={{ background: cl.badge, color: cl.fg }}>{p.ministry}</span>
                <h3>{p.system}</h3>
                <p>{p.company} — {p.area}</p>
                <div className="proj-techs">
                  <span className="proj-tech">{p.year}</span>
                  <span className="proj-tech">{p.cat}</span>
                  <span className="proj-tech">محمي</span>
                </div>
                <div className="proj-prot">
                  <i className="fas fa-shield-alt" style={{ color: "var(--c5)" }} />
                  <span>مشروع محمي بسرية تامة</span>
                </div>
                <div className="proj-ov">
                  <i className="fas fa-lock" />
                  <p>مشروع محمي</p>
                  <span className="sub">تواصل معي للاطلاع على التفاصيل</span>
                  <Link href="/contact" className="btn-p" style={{ marginTop: ".5rem", fontSize: ".88rem" }}>
                    <i className="fas fa-paper-plane" /> تواصل الآن
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="proj-note anim" style={{ transitionDelay: ".2s" }}>
          <i className="fas fa-exclamation-triangle" />
          <div>
            <strong style={{ color: "var(--tx-0)" }}>ملاحظة مهمة:</strong> جميع المشاريع المعروضة محمية بسرية تامة وتتضمن معلومات حساسة خاصة بالجهات المتعاقدة. للاطلاع على تفاصيل أي مشروع يُرجى{" "}
            <Link href="/contact" style={{ color: "var(--c1)", textDecoration: "underline" }}>التواصل المباشر</Link>.
          </div>
        </div>

        <div className="sbar">
          <div className="sbar-item anim" style={{ transitionDelay: ".3s" }}><span className="sbar-n">+25</span><span className="sbar-l">مشروع منجز</span></div>
          <div className="sbar-item anim" style={{ transitionDelay: ".4s" }}><span className="sbar-n">{uniqueMinistries}</span><span className="sbar-l">وزارات وجهات</span></div>
          <div className="sbar-item anim" style={{ transitionDelay: ".5s" }}><span className="sbar-n">+20</span><span className="sbar-l">مناطق</span></div>
        </div>
      </div>
    </div>
  );
}
