/* 04-events - Global click delegation and keyboard shortcuts */

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("md")) return closeM();
  const b = e.target.closest("[data-a]");
  if (!b) return;
  const a = b.dataset.a, id = b.closest("[data-id]")?.dataset.id;
  if (a == "close") closeM();
  if (a == "cart") {
    addCart(id);
  }
  if (a == "wish") {
    const on = b.classList.toggle("on"), ic = $("i", b);
    ic.className = on ? "fa-solid fa-heart" : "fa-regular fa-heart";
    toast(on ? "Saved to wishlist" : "Removed from wishlist");
  }
  if (a == "qv") qv(id);
  if (a == "cmp") {
    if (cmp.includes(id)) cmp = cmp.filter((x) => x != id);
    else {
      cmp.push(id);
      if (cmp.length > 2) cmp.shift();
    }
    cmpBar();
  }
  if (a == "cmpclr") {
    cmp = [];
    cmpBar();
  }
  if (a == "cmpgo") cmpGo();
  if (a == "dq") {
    const k = b.closest("[data-id]").dataset.id;
    C[k] = Math.max(0, C[k] + +b.dataset.d);
    cartRender();
  }
  if (a == "drm") {
    C[b.closest("[data-id]").dataset.id] = 0;
    cartRender();
  }
  if (a == "dclose") drawer(false);
});
addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    closeM();
    drawer(false);
  }
});
