/* 03-overlays - Overlays: quick view, compare, cart drawer */

function openM(s) {
  $(s).classList.add("on");
}
function closeM() {
  $$(".md").forEach((m) => m.classList.remove("on"));
}
function qv(id) {
  const p = byId(id);
  $("#qv .box").innerHTML = `<button class="x" data-a="close" aria-label="Close">&times;</button><div class="qv"><div class="zm"><div class="zi"><img src="assets/cut/${id}.webp" alt="${p.n}"></div></div><div class="qi" data-id="${id}"><h3>${p.n}</h3><div class="pr big"><b>${money(p.p)}</b>${p.o ? `<s>${money(p.o)}</s>` : ""}</div><p>${p.d}</p>${p.sp ? `<ul><li><span>Case</span>${p.sp[0]}</li><li><span>Movement</span>${p.sp[1]}</li><li><span>Water resistance</span>${p.sp[2]}</li><li><span>Strap</span>${p.sp[3]}</li></ul>` : ""}<button class="btn" data-a="cart">Add to cart</button></div></div>`;
  const z = $("#qv .zm"), zi = $(".zi", z);
  z.onmousemove = (e) => {
    const r = z.getBoundingClientRect();
    zi.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`;
    zi.style.transform = "scale(2.2)";
  };
  z.onmouseleave = () => zi.style.transform = "scale(1)";
  openM("#qv");
}
function cmpBar() {
  const b = $("#cb");
  b.classList.toggle("on", cmp.length > 0);
  $$(".cd").forEach((c) => {
    const k = $("[data-a=cmp]", c);
    k && k.classList.toggle("on", cmp.includes(c.dataset.id));
  });
  b.innerHTML = cmp.map((id) => `<img src="assets/cut/${id}.webp" alt="${byId(id).n}">`).join("") + `<button class="btn sm" data-a="cmpgo" ${cmp.length < 2 ? "disabled" : ""}>Compare ${cmp.length}/2</button><button class="x2" data-a="cmpclr" aria-label="Clear">&times;</button>`;
}
function cmpGo() {
  const [a, b] = cmp.map(byId), row = (l, f) => `<tr><td>${l}</td><td>${f(a)}</td><td>${f(b)}</td></tr>`;
  $("#cm .box").innerHTML = `<button class="x" data-a="close" aria-label="Close">&times;</button><div class="cm"><h3>Compare watches</h3><table><tr><td></td><th><img src="assets/cut/${a.id}.webp" alt=""><br>${a.n}</th><th><img src="assets/cut/${b.id}.webp" alt=""><br>${b.n}</th></tr>${row("Price", (x) => money(x.p))}${row("Case", (x) => x.sp[0])}${row("Movement", (x) => x.sp[1])}${row("Water resistance", (x) => x.sp[2])}${row("Strap", (x) => x.sp[3])}</table></div>`;
  openM("#cm");
}
function cartRender() {
  const ids = Object.keys(C).filter((k) => C[k] > 0), n = ids.reduce((s, k) => s + C[k], 0), tot = ids.reduce((s, k) => s + C[k] * egp(byId(k).p), 0);
  $("#badge").textContent = n;
  $("#dt").textContent = "EGP " + fmt(tot);
  $("#dl").innerHTML = ids.length ? ids.map((k) => {
    const p = byId(k);
    return `<li data-id="${k}"><img src="assets/cut/${k}.webp" alt=""><div><b>${p.n}</b><span>${money(p.p)}</span><div class="q"><button data-a="dq" data-d="-1" aria-label="Less">&minus;</button><em>${C[k]}</em><button data-a="dq" data-d="1" aria-label="More">+</button></div></div><button class="rm" data-a="drm" aria-label="Remove">&times;</button></li>`;
  }).join("") : '<li class="em">Your cart is empty.</li>';
}
function drawer(o) {
  $("#drw").classList.toggle("on", o);
  $("#dsc").classList.toggle("on", o);
  if (o) $("#drw .dx").focus();
}
function addCart(id) {
  C[id] = (C[id] || 0) + 1;
  cartRender();
  gsap.fromTo("#badge", { scale: 1.9 }, { scale: 1, duration: 0.7, ease: "elastic.out(1,.4)" });
  toast(byId(id).n + " added to cart");
  drawer(true);
}
