/* 01-core - Core: DOM helpers, product data, shared state, toast */

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia("(prefers-reduced-motion:reduce)").matches, fmt = (n) => n.toLocaleString("en-US");
const P = [
  { id: "p01", n: "Noir Chronograph", p: 1890, o: 2200, sp: ["42 mm", "Automatic chronograph", "100 m", "Black leather"], d: "A black PVD case with gold crowns and three recessed registers." },
  { id: "p02", n: "Aurum Dress Classic", p: 1450, o: 1700, sp: ["39 mm", "Automatic", "50 m", "Brown leather"], d: "A slim gold case and a sunburst champagne dial with baton markers." },
  { id: "p03", n: "Abyss Ceramic Diver", p: 2250, o: 2600, sp: ["41 mm", "Automatic", "300 m", "Ceramic bracelet"], d: "A black ceramic diver with a gold bezel and a screw-down crown." },
  { id: "p04", n: "Rose Skeleton Auto", p: 2780, o: 3100, sp: ["42 mm", "Skeleton automatic", "100 m", "Rubber"], d: "An open-worked dial showing the movement under a brushed rose-gold bezel." },
  { id: "p05", n: "Pearl Milanese", p: 980, o: 1150, sp: ["32 mm", "Quartz", "30 m", "Mesh bracelet"], d: "A mother-of-pearl dial on a soft rose-gold mesh bracelet." },
  { id: "p06", n: "Diamond Cuff", p: 2150, o: 2500, sp: ["30 mm", "Quartz", "30 m", "Gold cuff"], d: "A black dial framed by a diamond-set bezel and a polished gold cuff." },
  { id: "p07", n: "Deco Rectangle", p: 1990, o: 2300, sp: ["29 x 40 mm", "Manual wind", "30 m", "Black leather"], d: "A rectangular gold case set with diamonds on a black dial." },
  { id: "p08", n: "Eclipse Moonphase", p: 3400, o: 3800, sp: ["29 x 40 mm", "Manual wind, moonphase", "30 m", "Black leather"], d: "A moonphase sub-dial among gold stars. Limited to a small run." },
  { id: "a01", n: "Leather Watch Winder", p: 420, d: "A single-watch winder in black leather with a gold clasp." },
  { id: "a02", n: "Noir Leather Strap", p: 120, d: "Black leather with a gold buckle." },
  { id: "a03", n: "Gold Cufflinks", p: 260, d: "Brushed gold cufflinks in a velvet tray." },
  { id: "a04", n: "Walnut Display Case", p: 340, d: "A walnut case with a glass lid for three watches." }
];
const byId = (id) => P.find((x) => x.id == id), T = { m: ["p01", "p02", "p03", "p04", "p08"], w: ["p05", "p06", "p07", "p08", "p02"], l: ["p08", "p04", "p07", "p06", "p03"] };
let cmp = [];
const C = { p01: 1, p05: 1 };
function toast(t) {
  const e = $("#toast");
  e.textContent = t;
  e.classList.add("on");
  clearTimeout(e.t);
  e.t = setTimeout(() => e.classList.remove("on"), 2200);
}

// ----- Currency: prices are stored in USD and shown in Egyptian pounds -----
// Update USD_EGP whenever the exchange rate moves. Prices round to the nearest 100 EGP.
const USD_EGP = 50.5;
const egp = (usd) => Math.round(usd * USD_EGP / 100) * 100;
const money = (usd) => "EGP " + fmt(egp(usd));
