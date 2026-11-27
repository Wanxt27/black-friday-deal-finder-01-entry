// DealHound logic: search, filters, sorting, verdicts and the deal dialog.
// Everything runs from the local files; no network request is made.
(function () {
  "use strict";

  var state = { q: "", cat: "All", store: "All", minOff: 0, sort: "off" };

  function pct(d) {
    return Math.round((1 - d.sale / d.usual) * 100);
  }

  // The verdict is honest, not flattery: it reads the discount only, and
  // says so when the "usual" price is a comparable value, not a past price.
  function verdict(d) {
    var p = pct(d);
    if (d.comp) return { label: "Check the fine print", cls: "v-check", why: "Best Buy's usual price here is a comparable value, not a past price, so the headline cut may overstate the saving." };
    if (p >= 50) return { label: "True deal", cls: "v-true", why: p + "% off" + (d.atl ? ", and the lowest price the source has seen" : "") + ". A genuine Black Friday cut." };
    if (p >= 30) return { label: "Strong deal", cls: "v-strong", why: p + "% off a real usual price." };
    if (p >= 20) return { label: "Solid deal", cls: "v-solid", why: p + "% off. Worth it if you already wanted it." };
    if (p >= 10) return { label: "Mild deal", cls: "v-mild", why: "Only " + p + "% off. Fine, but not a doorbuster." };
    return { label: "Weak deal", cls: "v-weak", why: "Only " + p + "% off. This is barely a sale; wait or compare." };
  }

  function money(n) {
    return "$" + n.toFixed(2).replace(/\.00$/, "");
  }

  function storeClass(s) {
    return "st-" + s.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
  }

  function applyFilters() {
    var q = state.q.trim().toLowerCase();
    var list = DEALS.filter(function (d) {
      if (state.cat !== "All" && d.cat !== state.cat) return false;
      if (state.store !== "All" && d.store !== state.store) return false;
      if (pct(d) < state.minOff) return false;
      if (q && (d.name + " " + d.store + " " + d.cat).toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
    if (state.sort === "off") list.sort(function (a, b) { return pct(b) - pct(a); });
    else if (state.sort === "price-asc") list.sort(function (a, b) { return a.sale - b.sale; });
    else if (state.sort === "price-desc") list.sort(function (a, b) { return b.sale - a.sale; });
    else if (state.sort === "name") list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    else if (state.sort === "save") list.sort(function (a, b) { return (b.usual - b.sale) - (a.usual - a.sale); });
    return list;
  }

  function card(d) {
    var v = verdict(d);
    var src = SOURCES[d.src];
    var el = document.createElement("article");
    el.className = "card";
    el.dataset.id = d.id;
    el.innerHTML =
      '<div class="card-top"><span class="store ' + storeClass(d.store) + '">' + d.store + '</span>' +
      '<span class="cat">' + d.cat + '</span></div>' +
      '<h3>' + d.name + '</h3>' +
      '<div class="prices"><span class="sale">' + money(d.sale) + '</span>' +
      '<span class="usual">' + money(d.usual) + (d.comp ? " <i>comp. value</i>" : "") + '</span>' +
      '<span class="off">-' + pct(d) + '%</span></div>' +
      '<div class="verdict"><span class="pill ' + v.cls + '">' + v.label + '</span>' +
      (d.atl ? '<span class="atl">All-time low</span>' : '') + '</div>' +
      '<p class="note">' + d.note + '</p>' +
      '<div class="meta">Checked ' + CHECKED + ' &middot; via <a href="' + src.url + '" target="_blank" rel="noopener">' + src.name + '</a></div>' +
      '<button class="details" type="button">Why this verdict &rsaquo;</button>';
    el.querySelector(".details").addEventListener("click", function () { openDeal(d.id); });
    return el;
  }

  function render() {
    var list = applyFilters();
    var grid = document.getElementById("grid");
    grid.innerHTML = "";
    list.forEach(function (d) { grid.appendChild(card(d)); });
    document.getElementById("count").textContent =
      list.length + " of " + DEALS.length + " deals";
    document.getElementById("empty").style.display = list.length ? "none" : "block";
  }

  function renderStats() {
    var total = DEALS.length;
    var sum = 0, best = null, atlCount = 0, saved = 0;
    DEALS.forEach(function (d) {
      var p = pct(d);
      sum += p;
      saved += d.usual - d.sale;
      if (d.atl) atlCount++;
      if (!best || p > pct(best)) best = d;
    });
    document.getElementById("stat-deals").textContent = total;
    document.getElementById("stat-stores").textContent = STORES.length;
    document.getElementById("stat-avg").textContent = Math.round(sum / total) + "%";
    document.getElementById("stat-best").textContent = "-" + pct(best) + "%";
    document.getElementById("stat-atl").textContent = atlCount;
    document.getElementById("stat-saved").textContent = "$" + Math.round(saved).toLocaleString("en-US");
    document.getElementById("best-line").textContent =
      "Best cut so far: " + best.name + " at " + best.store + ", " + money(best.sale) +
      " instead of " + money(best.usual) + " (-" + pct(best) + "%).";
  }

  function openDeal(id) {
    var d = null;
    DEALS.forEach(function (x) { if (x.id === id) d = x; });
    if (!d) return;
    var v = verdict(d);
    var src = SOURCES[d.src];
    var dlg = document.getElementById("dlg");
    document.getElementById("dlg-title").textContent = d.name;
    document.getElementById("dlg-body").innerHTML =
      '<p><span class="store ' + storeClass(d.store) + '">' + d.store + '</span> &middot; ' + d.cat + '</p>' +
      '<p class="dlg-prices"><span class="sale">' + money(d.sale) + '</span> ' +
      '<span class="usual">' + money(d.usual) + (d.comp ? " (comparable value)" : " usual") + '</span> ' +
      '<span class="off">-' + pct(d) + '% &middot; save ' + money(d.usual - d.sale) + '</span></p>' +
      '<p><span class="pill ' + v.cls + '">' + v.label + '</span>' +
      (d.atl ? ' <span class="atl">All-time low</span>' : '') + '</p>' +
      '<p><strong>Why this verdict:</strong> ' + v.why + '</p>' +
      '<p>' + d.note + '</p>' +
      '<p class="meta">Price checked ' + CHECKED + ' (27 Nov 2026) as shown by ' +
      '<a href="' + src.url + '" target="_blank" rel="noopener">' + src.name + '</a>. ' +
      'Prices change during Black Friday week; check the listing before you pay.</p>';
    dlg.showModal();
    if (location.hash !== "#deal=" + id) history.replaceState(null, "", "#deal=" + id);
  }

  function closeDeal() {
    var dlg = document.getElementById("dlg");
    if (dlg.open) dlg.close();
    if (location.hash.indexOf("#deal=") === 0) history.replaceState(null, "", location.pathname);
  }

  function readHash() {
    var h = location.hash;
    if (h.indexOf("#deal=") === 0) { openDeal(h.slice(6)); return; }
    if (h.indexOf("#cat=") === 0) {
      var cat = decodeURIComponent(h.slice(5));
      if (CATEGORIES.indexOf(cat) !== -1) { state.cat = cat; syncChips(); render(); }
    }
  }

  function syncChips() {
    var chips = document.querySelectorAll("#cats .chip");
    chips.forEach(function (c) {
      c.classList.toggle("on", c.dataset.cat === state.cat);
      c.setAttribute("aria-pressed", c.dataset.cat === state.cat ? "true" : "false");
    });
  }

  function buildChips() {
    var wrap = document.getElementById("cats");
    ["All"].concat(CATEGORIES).forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (c === "All" ? " on" : "");
      b.dataset.cat = c;
      b.textContent = c;
      b.setAttribute("aria-pressed", c === "All" ? "true" : "false");
      b.addEventListener("click", function () {
        state.cat = c;
        syncChips();
        render();
      });
      wrap.appendChild(b);
    });
  }

  function buildStores() {
    var sel = document.getElementById("store");
    STORES.forEach(function (s) {
      var o = document.createElement("option");
      o.value = s;
      o.textContent = s;
      sel.appendChild(o);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildChips();
    buildStores();
    renderStats();
    render();

    document.getElementById("q").addEventListener("input", function (e) {
      state.q = e.target.value;
      render();
    });
    document.getElementById("store").addEventListener("change", function (e) {
      state.store = e.target.value;
      render();
    });
    document.getElementById("minoff").addEventListener("change", function (e) {
      state.minOff = parseInt(e.target.value, 10);
      render();
    });
    document.getElementById("sort").addEventListener("change", function (e) {
      state.sort = e.target.value;
      render();
    });
    document.getElementById("reset").addEventListener("click", function () {
      state = { q: "", cat: "All", store: "All", minOff: 0, sort: "off" };
      document.getElementById("q").value = "";
      document.getElementById("store").value = "All";
      document.getElementById("minoff").value = "0";
      document.getElementById("sort").value = "off";
      syncChips();
      render();
    });
    document.getElementById("dlg-close").addEventListener("click", closeDeal);
    document.getElementById("dlg").addEventListener("click", function (e) {
      if (e.target === this) closeDeal();
    });
    window.addEventListener("hashchange", readHash);
    readHash();
  });
})();
