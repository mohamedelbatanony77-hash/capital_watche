/* 08-ui - UI details: nav rings, newsletter, clock, card tilt, heart, cart bindings, customizer */

function rings() {
  $$(".menu>li>a,.ic a,.top a").forEach((a) => {
    let s = $(".rg", a);
    if (!s) {
      s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      s.setAttribute("class", "rg");
      s.setAttribute("aria-hidden", "true");
      s.innerHTML = '<rect pathLength="100"/>';
      a.appendChild(s);
    }
    const w = a.offsetWidth, h = a.offsetHeight, r = $("rect", s);
    if (!w) return;
    s.setAttribute("viewBox", `0 0 ${w} ${h}`);
    Object.entries({ x: 0.5, y: 0.5, width: w - 1, height: h - 1, rx: h / 2 }).forEach(([k, v]) => r.setAttribute(k, v));
  });
}
rings();
addEventListener("resize", rings);
document.fonts && document.fonts.ready.then(rings);
$("#bur").addEventListener("click", () => setTimeout(rings, 0));
$("#nlf").onsubmit = (e) => {
  e.preventDefault();
  const b = $(".sub", e.target);
  b.classList.add("done");
  toast("Subscribed. Check your inbox.");
  setTimeout(() => {
    b.classList.remove("done");
    e.target.reset();
  }, 2600);
};
const tick = () => {
  const d = /* @__PURE__ */ new Date();
  $("#ct").textContent = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  $("#clk-h").style.transform = `rotate(${(d.getHours() % 12 + d.getMinutes() / 60) * 30}deg)`;
  $("#clk-m").style.transform = `rotate(${d.getMinutes() * 6}deg)`;
};
tick();
setInterval(tick, 1e3);
if (matchMedia("(hover:hover)").matches && !RM) {
  document.addEventListener("pointermove", (e) => {
    const f = e.target.closest && e.target.closest(".cd figure");
    if (!f) return;
    const r = f.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    f.style.setProperty("--rx", -y * 14 + "deg");
    f.style.setProperty("--ry", x * 18 + "deg");
    f.style.setProperty("--mx", x);
  });
  document.addEventListener("pointerout", (e) => {
    const f = e.target.closest && e.target.closest(".cd figure");
    if (f && !f.contains(e.relatedTarget)) {
      f.style.setProperty("--rx", "0deg");
      f.style.setProperty("--ry", "0deg");
      f.style.setProperty("--mx", 0);
    }
  });
}
(function() {
  const cr = $(".cr"), hr = $(".hrt");
  if (!cr || RM) return;
  cr.addEventListener("mouseenter", () => {
    for (let i = 0; i < 10; i++) {
      const s = document.createElement("span");
      s.className = "spk";
      const a = Math.random() * 6.28, r = 14 + Math.random() * 18;
      s.style.setProperty("--dx", Math.cos(a) * r + "px");
      s.style.setProperty("--dy", Math.sin(a) * r - 8 + "px");
      hr.appendChild(s);
      setTimeout(() => s.remove(), 950);
    }
  });
})();
cartRender();
$(".ic a.bg").addEventListener("click", (e) => {
  e.preventDefault();
  drawer(true);
});
$("#dsc").onclick = () => drawer(false);
$("#chk").onclick = () => toast("Checkout is a demo in this build");
new IntersectionObserver(([e]) => $(".tsec").classList.toggle("off", !e.isIntersecting)).observe($(".tsec"));
