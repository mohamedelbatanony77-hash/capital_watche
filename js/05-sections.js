/* 05-sections - Page sections: carousels and tabs, testimonial, news, categories */

carousel($("#car1"), T.m);
carousel($("#car2"), ["a01", "a02", "a03", "a04", "p05", "p03"]);
$$("#tabs button").forEach((b) => b.onclick = () => {
  $$("#tabs button").forEach((x) => x.classList.remove("on"));
  b.classList.add("on");
  const r = $("#car1");
  gsap.to(r, { opacity: 0, y: 12, duration: 0.25, onComplete: () => {
    carousel(r, T[b.dataset.t]);
    cmpBar();
    gsap.to(r, { opacity: 1, y: 0, duration: 0.55 });
  } });
});
const Q = [["Daniel Reeves", "Collector, London", "The Noir Chronograph arrived in a walnut box and <em>keeps better time than any watch I own.</em> The finish rivals pieces at three times the price.", "t01", "p01"], ["Amira Haddad", "Architect, Dubai", "I bought the Pearl Milanese as a gift and ended up ordering a second for myself. <em>The concierge team answered every question within minutes.</em>", "t02", "p05"], ["Lucas Meyer", "Engineer, Zurich", "The skeleton dial is the real thing. <em>I can see the movement work in daylight and in lamp light.</em>", "t03", "p04"]];
let qi = 0;
const tm = $("#tm");
tm.innerHTML = `<div class="tmg"><div class="tmt"><h2>Customer Testimonial</h2><div class="qm" aria-hidden="true">&ldquo;</div><div class="qt" aria-live="polite"></div><div class="stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><div class="who"><div class="av"><span class="mono"></span><img alt=""><svg class="rg" viewBox="0 0 64 64" aria-hidden="true"><rect x=".5" y=".5" width="63" height="63" rx="31.5" pathLength="100"/></svg></div><div><b class="wn"></b><small class="wr"></small><span class="vb"><i class="fa-solid fa-circle-check"></i> Verified buyer</span></div></div><div class="tnav">${ARW("l", "Previous")}<span class="cnt"></span>${ARW("r", "Next")}</div></div><div class="tms"><div class="dial" aria-hidden="true"></div><div class="flr" aria-hidden="true"></div><img class="pp" alt=""><div class="pn"></div></div></div>`;
const wd = (s) => {
  let e = 0;
  return s.split(/(<\/?em>)/).map((t) => t == "<em>" ? (e = 1, "") : t == "</em>" ? (e = 0, "") : t.split(" ").filter(Boolean).map((w) => `<span class="w${e ? " e" : ""}">${w}</span>`).join(" ")).join(" ");
};
function fill() {
  const q = Q[qi], p = byId(q[4]);
  $(".qt", tm).innerHTML = wd(q[2]);
  $(".wn", tm).textContent = q[0];
  $(".wr", tm).textContent = q[1];
  const im = $(".av img", tm), mo = $(".av .mono", tm);
  im.style.display = q[3] ? "" : "none";
  mo.style.display = q[3] ? "none" : "";
  if (q[3]) {
    im.src = "assets/" + q[3] + ".jpg";
    im.alt = q[0];
  } else mo.textContent = q[0][0];
  const pp = $(".pp", tm);
  pp.src = "assets/cut/" + q[4] + ".webp";
  pp.alt = p.n;
  $(".pn", tm).innerHTML = `<small>Purchased</small>${p.n}`;
  $(".cnt", tm).textContent = `0${qi + 1} / 0${Q.length}`;
  $$(".pg circle", tm).forEach((c) => c.style.strokeDasharray = `${(qi + 1) / Q.length * 100} 100`);
}
function show(d) {
  const pp = $(".pp", tm);
  if (RM) {
    fill();
    return;
  }
  const go = () => {
    fill();
    gsap.fromTo($$(".w", tm), { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(pp, { x: d * 140, scale: 0.75, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" });
    gsap.fromTo(".tmt .stars,.tmt .who,.tmt .pn,.tms .pn", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, stagger: 0.08 });
  };
  gsap.to($$(".w", tm), { opacity: 0, y: -10, duration: 0.25, stagger: 0.01 });
  gsap.to(pp, { x: -d * 90, scale: 0.6, opacity: 0, duration: 0.45, ease: "power2.in", onComplete: go });
}
fill();
$$(".arw", tm).forEach((b) => b.onclick = () => {
  const d = b.classList.contains("r") ? 1 : -1;
  qi = (qi + d + Q.length) % Q.length;
  show(d);
});
$("#news").innerHTML = [["b01", "Craftsmanship", "Inside the watchmaker's bench"], ["b02", "Style guide", "How to choose a strap that lasts"], ["b03", "Boutique", "A walk through our flagship boutique"]].map((n) => `<article><figure><img src="assets/${n[0]}.jpg" alt="${n[2]}" loading="lazy"></figure><small>${n[1]}</small><h3>${n[2]}</h3><a class="rm" href="#">Read more</a></article>`).join("");
$("#bur").onclick = () => $("#menu").classList.toggle("open");
const NEWS = [
  { img: "b01", cat: "Craftsmanship", title: "Inside the watchmaker's bench", text: "How a movement is serviced by hand, from the first loupe check to the final regulation.", date: "Oct 12, 2026", read: "6 min read" },
  { img: "b02", cat: "Style guide", title: "How to choose a strap that lasts", text: "Leather, alligator grain and rubber: what to look for before you buy.", date: "Oct 5, 2026", read: "4 min read" },
  { img: "b03", cat: "Boutique", title: "A walk through our flagship boutique", text: "A look at the cabinets, the lighting and the people behind the counter.", date: "Sep 28, 2026", read: "3 min read" }
];
const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h17M14 6l6 6-6 6"/></svg>';
const newsCard = (n) => `<article class="nc"><a href="#"><img src="assets/${n.img}.jpg" alt="${n.title}" loading="lazy"><span class="pill">${n.cat}</span><div class="nb"><div class="meta">${n.date} &middot; ${n.read}</div><h3>${n.title}</h3><p>${n.text}</p><span class="more">Read more ${ARROW}</span></div></a></article>`;
$("#news").innerHTML = `<div class="news-grid">${NEWS.map(newsCard).join("")}</div>`;
$$(".cat small").forEach((s) => {
  s.textContent = T[s.dataset.set].length + " references";
});
