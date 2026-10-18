/* 07-motion - Motion: scroll animations, pinned hero, preloader intro */

gsap.registerPlugin(ScrollTrigger);
addEventListener("scroll", () => $(".nav").classList.toggle("sm", scrollY > 40), { passive: true });
if (!RM) {
  if (innerWidth > 1e3) ScrollTrigger.create({ trigger: ".hero", start: "top top", end: "+=90%", pin: true, scrub: 0.6, onUpdate: (s) => window.wtc && window.wtc.ex(Math.sin(s.progress * Math.PI)) });
  const rv = $$(".sh,.cat,.car,.tm,.nc,.ft div");
  gsap.set(rv, { opacity: 0, y: 50 });
  ScrollTrigger.batch(rv, { start: "top 90%", once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, stagger: 0.12, duration: 1.1, ease: "power3.out" }) });
}
function start() {
  const tl = gsap.timeline();
  tl.to("#pre b,#pre .ring", { opacity: 0, duration: 0.4 }).to("#pre", { yPercent: -100, duration: RM ? 0 : 1.1, ease: "power4.inOut" }, "<.15").add(() => {
    $("#pre")?.remove();
    setTimeout(intro, 650);
  }, "<.2").from(".hero .in", { y: 44, opacity: 0, stagger: 0.14, duration: RM ? 0 : 1.1, ease: "power3.out" }, "<.3");
}
addEventListener("load", () => setTimeout(start, RM ? 0 : 1200));
if (!RM) {
  ScrollTrigger.batch(".cat img", { start: "top 90%", once: true, onEnter: (b) => gsap.fromTo(b, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power3.out", stagger: 0.12 }) });
}
