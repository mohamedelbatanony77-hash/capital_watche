/* 02-cards - Product cards, glass buttons, arrows and the carousel component */

const RG = '<svg class="rg" viewBox="0 0 44 44" aria-hidden="true"><rect x=".5" y=".5" width="43" height="43" rx="21.5" pathLength="100"/></svg>';
const btn = (a, ic, tip, i) => `<button data-a="${a}" data-tip="${tip}" style="--i:${i}" aria-label="${tip}">${RG}<i class="${ic}"></i></button>`;
const ARW = (c, l) => `<button class="arw ${c}" aria-label="${l}"><svg class="rg" viewBox="0 0 54 54" aria-hidden="true"><rect x=".5" y=".5" width="53" height="53" rx="26.5" pathLength="100"/></svg><svg class="pg" viewBox="0 0 54 54" aria-hidden="true"><circle cx="27" cy="27" r="25.5" pathLength="100"/></svg><svg class="ar" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h17M14 6l6 6-6 6"/></svg></button>`;
const card = (id) => {
  const p = byId(id);
  return `<div class="cd" data-id="${id}"><figure><div class="pw"><img class="pi" src="assets/cut/${id}.webp" alt="${p.n}" loading="lazy"><i class="gl" style="--m:url(assets/cut/${id}.webp)"></i></div><div class="act">${btn("cart", "fa-solid fa-cart-shopping", "Add to cart", 0)}${btn("wish", "fa-regular fa-heart", "Wishlist", 1)}${btn("qv", "fa-solid fa-magnifying-glass-plus", "Quick view", 2)}${p.sp ? btn("cmp", "fa-solid fa-code-compare", "Compare", 3) : ""}</div></figure><h4>${p.n}</h4><div class="pr"><b>${money(p.p)}</b>${p.o ? `<s>${money(p.o)}</s>` : ""}</div></div>`;
};
const vis = () => innerWidth > 1e3 ? 4 : innerWidth > 600 ? 2 : 1;
function carousel(root, ids) {
  root.innerHTML = `<div class="cw">${ARW("l", "Previous")}<div class="vp"><div class="tr">${ids.map(card).join("")}</div></div>${ARW("r", "Next")}</div>`;
  const tr = $(".tr", root);
  let i = 0;
  const pg = () => {
    const m = Math.max(1, ids.length - vis() + 1);
    $$(".pg circle", root).forEach((c) => c.style.strokeDasharray = `${(i + 1) / m * 100} 100`);
  };
  pg();
  const go = (d) => {
    const mx = Math.max(0, ids.length - vis());
    i = d > 0 ? i >= mx ? 0 : i + 1 : i <= 0 ? mx : i - 1;
    gsap.to(tr, { x: -i * tr.children[0].offsetWidth, duration: RM ? 0 : 0.95, ease: "power3.inOut" });
    pg();
    gsap.fromTo(tr.children, { rotationY: d * -32, z: -90, transformPerspective: 1200 }, { rotationY: 0, z: 0, duration: RM ? 0 : 1.1, stagger: 0.06, ease: "power3.out" });
  };
  $(".l", root).onclick = () => go(-1);
  $(".r", root).onclick = () => go(1);
  addEventListener("resize", () => {
    i = Math.min(i, Math.max(0, ids.length - vis()));
    pg();
    gsap.set(tr, { x: -i * tr.children[0].offsetWidth });
  });
}
