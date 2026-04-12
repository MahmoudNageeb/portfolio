"use client";
import { useEffect, useState, useRef, FormEvent } from "react";

export default function ContactPage() {
  const [st, setSt] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.06 }
    );
    document.querySelectorAll(".anim").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setSt("sending");
    const d = new FormData(form.current);
    try {
      const r = await fetch("https://formsubmit.co/ajax/advacc2000@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: d.get("name"),
          email: d.get("email"),
          message: d.get("message"),
          _subject: "رسالة جديدة من موقع ADVACC",
        }),
      });
      if (r.ok) {
        setSt("ok"); form.current.reset();
        setTimeout(() => setSt("idle"), 5000);
      } else throw new Error();
    } catch {
      const n = d.get("name"), em = d.get("email"), msg = d.get("message");
      window.location.href = `mailto:advacc2000@gmail.com?subject=رسالة من ${n}&body=${encodeURIComponent(`الاسم: ${n}\nالإيميل: ${em}\n\n${msg}`)}`;
      setSt("err");
      setTimeout(() => setSt("idle"), 5000);
    }
  };

  return (
    <div style={{ paddingTop: "calc(var(--top-h) + var(--nav-h))" }}>
      <div className="sec">
        <div className="sec-hdr">
          <div className="sec-badge"><i className="fas fa-paper-plane" /> تواصل معي</div>
          <h2 className="sec-title">ابقَ على تواصل</h2>
          <p className="sec-desc">أسعد دائماً بالتواصل معكم. لا تتردد في الاتصال بي لأي استفسار أو فرصة عمل</p>
        </div>

        <div className="ct-grid">
          <div className="ct-cards">
            <a href="tel:+96566134944" className="ct-card anim" style={{ transitionDelay: "0s" }}>
              <div className="ct-ico" style={{ background: "rgba(0,212,255,.1)", color: "var(--c1)" }}><i className="fas fa-phone-alt" /></div>
              <div><h4>الهاتف (الكويت)</h4><p dir="ltr">+965 6613 4944</p></div>
            </a>
            <a href="tel:+201069519416" className="ct-card anim" style={{ transitionDelay: ".05s" }}>
              <div className="ct-ico" style={{ background: "rgba(34,197,94,.1)", color: "var(--c3)" }}><i className="fas fa-phone-alt" /></div>
              <div><h4>الهاتف (مصر)</h4><p dir="ltr">+20 106 951 9416</p></div>
            </a>
            <a href="mailto:advacc2000@gmail.com" className="ct-card anim" style={{ transitionDelay: ".1s" }}>
              <div className="ct-ico" style={{ background: "rgba(168,85,247,.1)", color: "var(--c2)" }}><i className="fas fa-envelope" /></div>
              <div><h4>البريد الإلكتروني</h4><p>advacc2000@gmail.com</p></div>
            </a>
            <div className="ct-card anim" style={{ transitionDelay: ".15s" }}>
              <div className="ct-ico" style={{ background: "rgba(245,158,11,.1)", color: "var(--c4)" }}><i className="fas fa-map-marker-alt" /></div>
              <div><h4>الموقع</h4><p>دولة الكويت</p></div>
            </div>
            <a href="https://wa.me/96566134944" target="_blank" rel="noopener noreferrer" className="ct-card anim" style={{ transitionDelay: ".2s" }}>
              <div className="ct-ico" style={{ background: "rgba(37,211,102,.1)", color: "#25d366" }}><i className="fab fa-whatsapp" /></div>
              <div><h4>واتساب</h4><p dir="ltr">+965 6613 4944</p></div>
            </a>
            <div className="social-row anim" style={{ transitionDelay: ".25s" }}>
              <a href="mailto:advacc2000@gmail.com" className="soc-btn" title="Email"><i className="fas fa-envelope" /></a>
              <a href="https://wa.me/96566134944" target="_blank" rel="noopener noreferrer" className="soc-btn" title="WhatsApp"><i className="fab fa-whatsapp" /></a>
            </div>
          </div>

          <div className="ct-form anim" style={{ transitionDelay: ".08s" }}>
            <h3><i className="fas fa-paper-plane" /> أرسل رسالة</h3>
            <form ref={form} onSubmit={submit}>
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <div className="fg">
                <label htmlFor="name"><i className="fas fa-user" /> الاسم الكامل</label>
                <input type="text" id="name" name="name" placeholder="أدخل اسمك الكامل" required />
              </div>
              <div className="fg">
                <label htmlFor="email"><i className="fas fa-envelope" /> البريد الإلكتروني</label>
                <input type="email" id="email" name="email" placeholder="أدخل بريدك الإلكتروني" required />
              </div>
              <div className="fg">
                <label htmlFor="message"><i className="fas fa-comment" /> الرسالة</label>
                <textarea id="message" name="message" placeholder="اكتب رسالتك هنا..." required />
              </div>
              <button type="submit" className="f-submit" disabled={st === "sending"}>
                {st === "sending" ? <><i className="fas fa-spinner fa-spin" /> جاري الإرسال...</> :
                 st === "ok" ? <><i className="fas fa-check" /> تم الإرسال بنجاح!</> :
                 <><i className="fas fa-paper-plane" /> إرسال الرسالة</>}
              </button>
              {st === "ok" && <div className="f-status ok"><i className="fas fa-check-circle" /> تم إرسال رسالتك بنجاح! سيتم الرد عليك في أقرب وقت.</div>}
              {st === "err" && <div className="f-status err"><i className="fas fa-info-circle" /> تم فتح تطبيق البريد لإرسال الرسالة.</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
