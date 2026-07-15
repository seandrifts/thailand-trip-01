/* global React, ReactDOM, TRIP */
const {
  useState,
  useEffect,
  useMemo
} = React;
const ICONS = {
  "🏠": "home",
  "📅": "calendar_month",
  "🗺️": "map",
  "ℹ️": "info",
  "🎒": "backpack",
  "✈️": "flight",
  "✈": "flight",
  "🏨": "hotel",
  "🍜": "ramen_dining",
  "🚇": "directions_subway",
  "🛍️": "shopping_bag",
  "🍽️": "restaurant",
  "🎭": "theater_comedy",
  "🌃": "nightlife",
  "🏢": "apartment",
  "🚶": "directions_walk",
  "🏮": "festival",
  "⛪": "temple_buddhist",
  "🚐": "directions_bus",
  "☕": "local_cafe",
  "🚂": "train",
  "🛥️": "directions_boat",
  "⚠️": "warning",
  "💆": "spa",
  "🚕": "local_taxi",
  "📌": "push_pin",
  "📍": "location_on",
  "🛂": "badge",
  "💱": "currency_exchange",
  "🕐": "schedule",
  "🔌": "power",
  "🧾": "receipt_long",
  "🌦️": "rainy",
  "☀️": "sunny",
  "🌤️": "partly_cloudy_day",
  "⛅": "partly_cloudy_day",
  "☁️": "cloud",
  "🌫️": "foggy",
  "🌧️": "rainy",
  "⛈️": "thunderstorm",
  "🌡️": "thermostat",
  "☔": "umbrella",
  "🎉": "celebration",
  "❤️": "favorite",
  "👗": "checkroom",
  "📸": "photo_camera",
  "🌸": "local_florist",
  "🌉": "landscape"
};
function Ic({
  e
}) {
  const n = ICONS[e];
  return n ? /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded"
  }, n) : /*#__PURE__*/React.createElement("span", null, e);
}

// ---- shared bits ----
const TABS = [{
  id: "home",
  label: "首頁",
  icon: "🏠"
}, {
  id: "days",
  label: "每日行程",
  icon: "📅"
}, {
  id: "extras",
  label: "備選清單",
  icon: "🗺️"
}, {
  id: "info",
  label: "實用資訊",
  icon: "ℹ️"
}, {
  id: "pack",
  label: "行李清單",
  icon: "🎒"
}];
function useHashTab(defaultTab) {
  const [tab, setTab] = useState(() => {
    const h = window.location.hash.replace("#", "");
    return TABS.find(t => t.id === h) ? h : defaultTab;
  });
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (TABS.find(t => t.id === h)) setTab(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = id => {
    window.location.hash = id;
    setTab(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return [tab, go];
}
function daysUntil(target) {
  const t = new Date(target + "T00:00:00+08:00");
  const now = new Date();
  return Math.ceil((t - now) / 86400000);
}

// 旅程目前狀態
function getTripPhase() {
  const start = new Date(TRIP.meta.startDate + "T00:00:00+08:00");
  const end = new Date(TRIP.meta.endDate + "T23:59:59+08:00");
  const now = new Date();
  if (now < start) {
    return {
      phase: "before",
      daysLeft: Math.ceil((start - now) / 86400000),
      todayDay: null
    };
  }
  if (now > end) {
    return {
      phase: "after",
      daysLeft: 0,
      todayDay: null
    };
  }
  const diffDays = Math.floor((now - start) / 86400000);
  return {
    phase: "during",
    daysLeft: 0,
    todayDay: diffDays + 1
  };
}

// 撒花動畫 (出發日 / 旅遊中)
function Confetti() {
  const pieces = useMemo(() => Array.from({
    length: 36
  }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: -Math.random() * 5,
    duration: 4 + Math.random() * 4,
    emoji: ["🎉", "🎊", "✨", "🌺", "💛", "🏖️"][i % 6],
    size: 14 + Math.random() * 12,
    drift: (Math.random() - 0.5) * 60
  })), []);
  return /*#__PURE__*/React.createElement("div", {
    className: "confetti",
    "aria-hidden": "true"
  }, pieces.map(p => /*#__PURE__*/React.createElement("span", {
    key: p.id,
    style: {
      left: p.left + "%",
      animationDelay: p.delay + "s",
      animationDuration: p.duration + "s",
      fontSize: p.size + "px",
      ["--drift"]: p.drift + "px"
    }
  }, p.emoji)));
}

// ---- Helpers: MapLink + BookingStatus ----
function MapLink({
  q,
  url: directUrl,
  area
}) {
  if (!q && !directUrl) return null;
  const url = directUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([q, area, "Bangkok"].filter(Boolean).join(" "))}`;
  return /*#__PURE__*/React.createElement("a", {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "map-link",
    title: "\u958B\u555F Google \u5730\u5716",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\uD83D\uDCCD"
  }));
}
function BookingStatus({
  id
}) {
  const [s, setS] = useState(() => localStorage.getItem("book-" + id) || "none");
  const cycle = e => {
    e.stopPropagation();
    const order = {
      none: "todo",
      todo: "booked",
      booked: "none"
    };
    const next = order[s];
    setS(next);
    localStorage.setItem("book-" + id, next);
  };
  const label = {
    none: "+ 加入訂位",
    todo: "⏳ 待訂",
    booked: "✓ 已訂"
  }[s];
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "book-pill is-" + s,
    onClick: cycle,
    title: "\u9EDE\u9078\u5207\u63DB\u72C0\u614B"
  }, label);
}

// ---- Header ----
function Header({
  tab,
  go
}) {
  const m = TRIP.meta;
  return /*#__PURE__*/React.createElement("header", {
    className: "hdr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hdr-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hdr-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-mark"
  }, "\uD83D\uDC18"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "brand-zh"
  }, m.title), /*#__PURE__*/React.createElement("div", {
    className: "brand-en"
  }, m.startDate.replace(/-/g, "."), " \u2013 ", m.endDate.replace(/-/g, "."))))), /*#__PURE__*/React.createElement("nav", {
    className: "tabs",
    role: "tablist"
  }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    role: "tab",
    "aria-selected": tab === t.id,
    className: "tab " + (tab === t.id ? "is-active" : ""),
    onClick: () => go(t.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "tab-ic"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: t.icon
  })), /*#__PURE__*/React.createElement("span", null, t.label)))));
}

// ---- HOME ----
function Home({
  go
}) {
  const m = TRIP.meta;
  const {
    phase,
    daysLeft,
    todayDay
  } = getTripPhase();
  const showConfetti = phase === "during";
  return /*#__PURE__*/React.createElement("section", {
    className: "page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kicker"
  }, "2026 SUMMER \xB7 4 DAYS \xB7 \uD83D\uDC18"), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title",
    style: {
      textAlign: "left"
    }
  }, "\u66FC\u8C37\uFF0C", /*#__PURE__*/React.createElement("br", {
    className: "mobile-break"
  }), "\u6211\u5011\u4F86\u4E86\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, "\u4E03\u6708\u7684\u66FC\u8C37\uFF0C\u7A7A\u6C23\u88E1\u5E36\u8457\u4E00\u9EDE\u71B1\u3001\u4E00\u9EDE\u751C\u3002", /*#__PURE__*/React.createElement("br", null), "\u9019\u56DB\u5929\uFF0C\u6211\u5011\u628A\u6642\u9593\u9084\u7D66\u81EA\u5DF1\u2014\u2014", /*#__PURE__*/React.createElement("br", null), "\u597D\u597D\u5403\u4E00\u9813\u98EF\u3001\u597D\u597D\u901B\u4E00\u689D\u8857\u3001\u597D\u597D\u5728 SPA \u88E1\u653E\u7A7A\u3002", /*#__PURE__*/React.createElement("br", null), "\u884C\u7A0B\u3001\u8A02\u4F4D\u3001\u90A3\u4E9B\u503C\u5F97\u8A18\u4E0B\u4F86\u7684\u4E8B\uFF0C\u90FD\u5728\u9019\u88E1\u4E86\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => go("days")
  }, "\u770B\u6BCF\u65E5\u884C\u7A0B \u2192"), /*#__PURE__*/React.createElement("button", {
    className: "btn-ghost",
    onClick: () => go("info")
  }, "\u5BE6\u7528\u8CC7\u8A0A"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "countdown-card phase-" + phase
  }, showConfetti && /*#__PURE__*/React.createElement(Confetti, null), phase === "before" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cd-label"
  }, "\u8DDD\u96E2\u51FA\u767C\u9084\u6709"), /*#__PURE__*/React.createElement("div", {
    className: "cd-num"
  }, daysLeft), /*#__PURE__*/React.createElement("div", {
    className: "cd-unit"
  }, "\u5929"), /*#__PURE__*/React.createElement("div", {
    className: "cd-meta"
  }, m.startDate.replace(/-/g, "/"), " (\u4E09) ", /*#__PURE__*/React.createElement(Ic, {
    e: "\u2708"
  }), " TPE \u2192 BKK")), phase === "during" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cd-label"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\uD83C\uDF89"
  }), " \u65C5\u7A0B\u9032\u884C\u4E2D ", /*#__PURE__*/React.createElement(Ic, {
    e: "\uD83C\uDF89"
  })), /*#__PURE__*/React.createElement("div", {
    className: "cd-num cd-num-mid"
  }, "Day ", todayDay), /*#__PURE__*/React.createElement("div", {
    className: "cd-unit"
  }, TRIP.itinerary[todayDay - 1]?.title), /*#__PURE__*/React.createElement("div", {
    className: "cd-meta"
  }, "\u73A9\u5F97\u958B\u5FC3 \xB7 \u6CE8\u610F\u5B89\u5168")), phase === "after" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cd-label"
  }, "\u65C5\u7A0B\u7D50\u675F"), /*#__PURE__*/React.createElement("div", {
    className: "cd-num cd-num-mid"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\u2764\uFE0F"
  })), /*#__PURE__*/React.createElement("div", {
    className: "cd-unit"
  }, "\u671F\u5F85\u4E0B\u6B21\u76F8\u805A"), /*#__PURE__*/React.createElement("div", {
    className: "cd-meta"
  }, m.startDate.replace(/-/g, "/"), " \u2013 ", m.endDate.replace(/-/g, "/")))))), /*#__PURE__*/React.createElement("div", {
    className: "live-row"
  }, /*#__PURE__*/React.createElement(WeatherWidget, null)), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "\u822A\u73ED & \u98EF\u5E97 ", /*#__PURE__*/React.createElement("span", {
    className: "h2-en"
  }, "Flight & Hotel")), /*#__PURE__*/React.createElement(FlightHotelCard, null), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "\u6BCF\u65E5\u91CD\u9EDE ", /*#__PURE__*/React.createElement("span", {
    className: "h2-en"
  }, "Daily Highlights")), /*#__PURE__*/React.createElement("div", {
    className: "day-grid"
  }, TRIP.itinerary.map(d => /*#__PURE__*/React.createElement("button", {
    key: d.day,
    className: "day-card " + (d.day === todayDay ? "is-today" : ""),
    onClick: () => {
      go("days");
      setTimeout(() => document.getElementById("day-" + d.day)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      }), 200);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-day"
  }, "DAY ", d.day, d.day === todayDay && /*#__PURE__*/React.createElement("span", {
    className: "today-badge"
  }, "\u4ECA\u65E5")), /*#__PURE__*/React.createElement("div", {
    className: "dc-date"
  }, d.date, " (", d.weekday, ")")), /*#__PURE__*/React.createElement("div", {
    className: "dc-title"
  }, d.title), /*#__PURE__*/React.createElement("div", {
    className: "dc-theme"
  }, d.theme)))), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "\u51FA\u767C\u524D To-Do"), /*#__PURE__*/React.createElement(Checklist, {
    storageKey: "predepart",
    items: ["機票訂好（去 / 回）", "飯店已訂", "Day 2 Chom Arun 已訂位（7/16 17:15）", "確認所有人護照效期 6 個月以上", "投保旅遊平安險", "Day 4 近郊包車：美功鐵道市集 → 安帕瓦", "換泰銖現金（或出發後到 Super Rich 換）", "辦泰國 SIM 卡 / eSIM", "下載 Grab App + Google Maps 離線地圖", "備好藥品：止瀉藥、防蚊液、退燒藥"]
  }));
}
function Stat({
  label,
  value,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "stat-sub"
  }, sub));
}
function FamilyRoster() {
  const [names, setNames] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("family")) || TRIP.family;
    } catch {
      return TRIP.family;
    }
  });
  useEffect(() => {
    localStorage.setItem("family", JSON.stringify(names));
  }, [names]);
  return /*#__PURE__*/React.createElement("div", {
    className: "roster"
  }, names.map((n, i) => /*#__PURE__*/React.createElement("input", {
    key: i,
    className: "roster-pill",
    value: n,
    onChange: e => setNames(names.map((v, j) => j === i ? e.target.value : v))
  })), /*#__PURE__*/React.createElement("button", {
    className: "roster-add",
    onClick: () => setNames([...names, "新成員"])
  }, "+ \u65B0\u589E\u6210\u54E1"));
}
function Checklist({
  storageKey,
  items
}) {
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("chk-" + storageKey)) || {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem("chk-" + storageKey, JSON.stringify(checked));
  }, [checked, storageKey]);
  const total = items.length;
  const done = items.filter(i => checked[i]).length;
  return /*#__PURE__*/React.createElement("div", {
    className: "chklist"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chk-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chk-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chk-fill",
    style: {
      width: done / total * 100 + "%"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "chk-count"
  }, done, " / ", total)), items.map(it => /*#__PURE__*/React.createElement("label", {
    key: it,
    className: "chk-item " + (checked[it] ? "is-done" : "")
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !!checked[it],
    onChange: e => setChecked({
      ...checked,
      [it]: e.target.checked
    })
  }), /*#__PURE__*/React.createElement("span", {
    className: "chk-box"
  }), /*#__PURE__*/React.createElement("span", {
    className: "chk-txt"
  }, it))));
}

// ---- DAYS ----
function Days() {
  const {
    todayDay
  } = getTripPhase();
  const [open, setOpen] = useState(todayDay || 1);
  return /*#__PURE__*/React.createElement("section", {
    className: "page"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "\u6BCF\u65E5\u884C\u7A0B ", /*#__PURE__*/React.createElement("span", {
    className: "page-en"
  }, "4-Day Itinerary")), /*#__PURE__*/React.createElement("div", {
    className: "timeline"
  }, TRIP.itinerary.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.day,
    id: "day-" + d.day,
    className: "tl-day " + (open === d.day ? "is-open " : "") + (d.day === todayDay ? "is-today" : "")
  }, /*#__PURE__*/React.createElement("button", {
    className: "tl-head",
    onClick: () => setOpen(open === d.day ? 0 : d.day)
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-num"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-day-label"
  }, "DAY"), /*#__PURE__*/React.createElement("div", {
    className: "tl-day-n"
  }, d.day)), /*#__PURE__*/React.createElement("div", {
    className: "tl-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-date"
  }, d.date, " ", /*#__PURE__*/React.createElement("span", {
    className: "tl-wk"
  }, "(", d.weekday, ")"), d.day === todayDay && /*#__PURE__*/React.createElement("span", {
    className: "today-badge"
  }, "\u4ECA\u65E5")), /*#__PURE__*/React.createElement("div", {
    className: "tl-title"
  }, d.title), /*#__PURE__*/React.createElement("div", {
    className: "tl-sum"
  }, d.summary.split(" → ").slice(0, 3).join(" · "), d.summary.split(" → ").length > 3 ? " …" : "")), /*#__PURE__*/React.createElement("div", {
    className: "tl-toggle"
  }, open === d.day ? "−" : "+")), open === d.day && /*#__PURE__*/React.createElement("div", {
    className: "tl-body"
  }, d.blocks.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-time"
  }, b.time), /*#__PURE__*/React.createElement("div", {
    className: "block-ic"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: b.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "block-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-title"
  }, /*#__PURE__*/React.createElement("span", null, b.title), /*#__PURE__*/React.createElement(MapLink, {
    q: b.mapurl ? null : b.nomap ? null : b.title,
    url: b.mapurl
  }), b.book && /*#__PURE__*/React.createElement(BookingStatus, {
    id: `d${d.day}-${i}`
  })), /*#__PURE__*/React.createElement("div", {
    className: "block-detail"
  }, b.detail)))), d.tips && /*#__PURE__*/React.createElement("div", {
    className: "tip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tip-tag"
  }, "\u5C0F\u63D0\u9192"), /*#__PURE__*/React.createElement("span", {
    className: "tip-txt"
  }, d.tips)))))));
}

// ---- FOOD ----
function Extras() {
  const days = (TRIP.extras || []).filter(d => d.items && d.items.length > 0).sort((a, b) => a.day - b.day);
  const typeLabel = {
    food: "美食",
    shop: "購物",
    spa: "按摩",
    spot: "景點"
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "page"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "\u5099\u9078\u6E05\u55AE ", /*#__PURE__*/React.createElement("span", {
    className: "page-en"
  }, "Explore")), /*#__PURE__*/React.createElement("p", {
    className: "page-lead"
  }, "\u81EA\u7531\u884C\u6642\u9593\u7684\u5099\u9078\u53BB\u8655\uFF0C\u4E0D\u5728\u4E3B\u884C\u7A0B\u5167\uFF0C\u53EF\u8996\u9AD4\u529B\u5B89\u6392\u3002"), days.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "extras-empty"
  }, "\u9084\u6C92\u6709\u5099\u9078\u9805\u76EE\uFF0C\u4E4B\u5F8C\u9678\u7E8C\u65B0\u589E\u3002") : days.map(group => /*#__PURE__*/React.createElement("div", {
    key: group.day,
    className: "extras-group"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "extras-day-h"
  }, "Day ", group.day, " ", /*#__PURE__*/React.createElement("span", {
    className: "extras-date"
  }, group.date, "\uFF08", group.weekday, "\uFF09"), group.area && /*#__PURE__*/React.createElement("span", {
    className: "extras-area-label"
  }, "\xB7 ", group.area)), /*#__PURE__*/React.createElement("div", {
    className: "extras-list"
  }, group.items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "extras-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "extras-card-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "extras-badge xt-" + it.type
  }, typeLabel[it.type] || it.type), /*#__PURE__*/React.createElement("span", {
    className: "extras-name"
  }, it.name), it.price && /*#__PURE__*/React.createElement("span", {
    className: "extras-price"
  }, it.price), /*#__PURE__*/React.createElement(MapLink, {
    q: it.mapurl ? null : it.name,
    url: it.mapurl,
    area: it.area
  })), it.area && /*#__PURE__*/React.createElement("div", {
    className: "extras-loc"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\uD83D\uDCCD"
  }), " ", it.area), /*#__PURE__*/React.createElement("div", {
    className: "extras-note"
  }, it.note)))))));
}

// ---- INFO ----
function Info() {
  const p = TRIP.practical;
  return /*#__PURE__*/React.createElement("section", {
    className: "page"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "\u5BE6\u7528\u8CC7\u8A0A ", /*#__PURE__*/React.createElement("span", {
    className: "page-en"
  }, "Essentials")), /*#__PURE__*/React.createElement("div", {
    className: "info-grid"
  }, /*#__PURE__*/React.createElement(InfoCard, {
    title: "\u7C3D\u8B49",
    icon: "\uD83D\uDEC2"
  }, p.visa), /*#__PURE__*/React.createElement(InfoCard, {
    title: "\u8CA8\u5E63",
    icon: "\uD83D\uDCB1"
  }, p.currency), /*#__PURE__*/React.createElement(InfoCard, {
    title: "\u5929\u6C23",
    icon: "\uD83C\uDF26\uFE0F"
  }, p.weather), /*#__PURE__*/React.createElement(InfoCard, {
    title: "\u6642\u5DEE",
    icon: "\uD83D\uDD50"
  }, p.time), /*#__PURE__*/React.createElement(InfoCard, {
    title: "\u96FB\u58D3 / \u63D2\u5EA7",
    icon: "\uD83D\uDD0C"
  }, p.plug), /*#__PURE__*/React.createElement(InfoCard, {
    title: "VAT Refund",
    icon: "\uD83E\uDDFE"
  }, p.vat)), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "\u4EA4\u901A\u65B9\u5F0F"), /*#__PURE__*/React.createElement("div", {
    className: "trans-list"
  }, p.transport.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.type,
    className: "trans-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "trans-type"
  }, t.type), /*#__PURE__*/React.createElement("div", {
    className: "trans-note"
  }, t.note)))), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "\u7DCA\u6025\u806F\u7D61"), /*#__PURE__*/React.createElement("div", {
    className: "em-grid"
  }, p.emergency.map(e => /*#__PURE__*/React.createElement("a", {
    key: e.name,
    className: "em-card",
    href: "tel:" + e.phone.replace(/[^\d+]/g, "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "em-name"
  }, e.name, /醫院|Hospital/i.test(e.name) && /*#__PURE__*/React.createElement(MapLink, {
    q: e.name
  })), /*#__PURE__*/React.createElement("div", {
    className: "em-phone"
  }, e.phone)))), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "\u5E38\u7528\u6CF0\u8A9E"), /*#__PURE__*/React.createElement("div", {
    className: "phrase-grid"
  }, p.phrases.map(ph => /*#__PURE__*/React.createElement("div", {
    key: ph.zh,
    className: "phrase"
  }, /*#__PURE__*/React.createElement("div", {
    className: "phrase-zh"
  }, ph.zh), /*#__PURE__*/React.createElement("div", {
    className: "phrase-th"
  }, ph.th), /*#__PURE__*/React.createElement("div", {
    className: "phrase-py"
  }, ph.th_zh)))));
}
function InfoCard({
  title,
  icon,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-ic"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "info-title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "info-body"
  }, children));
}

// ---- PACKING ----
function Pack() {
  return /*#__PURE__*/React.createElement("section", {
    className: "page"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "\u884C\u674E\u6E05\u55AE ", /*#__PURE__*/React.createElement("span", {
    className: "page-en"
  }, "Packing List")), TRIP.packing.map(group => /*#__PURE__*/React.createElement("div", {
    key: group.cat,
    className: "pack-group"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "pack-h"
  }, group.cat), /*#__PURE__*/React.createElement("ul", {
    className: "pack-list"
  }, group.items.map((item, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "pack-item"
  }, item))))));
}

// ---- Flight / Hotel ----
const defaultFH = {
  outFlight: "CX407 / CX653 國泰航空（經香港轉機）",
  outTime: "7/15 (三) 08:00 TPE T1 → 14:00 BKK 素萬那普",
  retFlight: "SL396 泰國獅航",
  retTime: "7/19 (日) 03:00 DMK 廊曼 T1 → 07:55 TPE T1",
  hotelName: "Adelphi Suites Bangkok",
  hotelAddr: "Soi Sukhumvit 8",
  hotelPhone: ""
};
function FlightHotelCard() {
  const [data, setData] = useState(defaultFH);
  useEffect(() => {
    localStorage.setItem("flighthotel_v2", JSON.stringify(data));
  }, [data]);
  const upd = (k, v) => setData({
    ...data,
    [k]: v
  });
  const hotelQuery = [data.hotelName, data.hotelAddr, "Bangkok"].filter(Boolean).join(" ").trim();
  const mapUrl = data.hotelName || data.hotelAddr ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelQuery)}` : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fh-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fh-flight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fh-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fh-h"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\u2708\uFE0F"
  }), " \u53BB\u7A0B"), /*#__PURE__*/React.createElement("div", {
    className: "fh-in",
    style: {
      whiteSpace: "normal",
      wordBreak: "break-word",
      lineHeight: 1.5
    }
  }, data.outFlight), /*#__PURE__*/React.createElement("div", {
    className: "fh-in",
    style: {
      whiteSpace: "normal",
      wordBreak: "break-word",
      lineHeight: 1.5
    }
  }, data.outTime)), /*#__PURE__*/React.createElement("div", {
    className: "fh-section",
    style: {
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fh-h"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\u2708\uFE0F"
  }), " \u56DE\u7A0B"), /*#__PURE__*/React.createElement("div", {
    className: "fh-in",
    style: {
      whiteSpace: "normal",
      wordBreak: "break-word",
      lineHeight: 1.5
    }
  }, data.retFlight), /*#__PURE__*/React.createElement("div", {
    className: "fh-in",
    style: {
      whiteSpace: "normal",
      wordBreak: "break-word",
      lineHeight: 1.5
    }
  }, data.retTime))), /*#__PURE__*/React.createElement("div", {
    className: "fh-hotel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fh-h"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\uD83C\uDFE8"
  }), " \u98EF\u5E97"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "14px",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/img/hotel.jpg",
    alt: "Adelphi Suites Bangkok",
    style: {
      width: "130px",
      minWidth: "130px",
      height: "120px",
      borderRadius: "8px",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fh-in",
    style: {
      whiteSpace: "normal",
      wordBreak: "break-word",
      lineHeight: 1.5
    }
  }, data.hotelName), data.hotelAddr && /*#__PURE__*/React.createElement("div", {
    className: "fh-in",
    style: {
      whiteSpace: "normal",
      wordBreak: "break-word",
      lineHeight: 1.5
    }
  }, data.hotelAddr), data.hotelPhone && /*#__PURE__*/React.createElement("div", {
    className: "fh-in",
    style: {
      whiteSpace: "normal",
      wordBreak: "break-word",
      lineHeight: 1.5
    }
  }, data.hotelPhone), mapUrl && /*#__PURE__*/React.createElement("a", {
    className: "fh-map",
    href: mapUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\uD83D\uDCCD"
  }), " \u5728 Google \u5730\u5716\u958B\u555F")))));
}

// ---- Weather (Open-Meteo, no key) ----
const WMO = {
  0: ["☀️", "晴"],
  1: ["🌤️", "大致晴"],
  2: ["⛅", "局部多雲"],
  3: ["☁️", "陰"],
  45: ["🌫️", "霧"],
  48: ["🌫️", "凍霧"],
  51: ["🌦️", "微毛雨"],
  53: ["🌦️", "毛雨"],
  55: ["🌦️", "強毛雨"],
  61: ["🌧️", "小雨"],
  63: ["🌧️", "雨"],
  65: ["🌧️", "大雨"],
  80: ["🌦️", "陣雨"],
  81: ["🌧️", "強陣雨"],
  82: ["⛈️", "豪雨"],
  95: ["⛈️", "雷雨"],
  96: ["⛈️", "雷雨+冰雹"],
  99: ["⛈️", "強雷雨"]
};
const wcode = c => WMO[c] || ["🌡️", "—"];
function WeatherWidget() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=13.7563&longitude=100.5018&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&timezone=Asia/Bangkok&forecast_days=7").then(r => r.json()).then(setData).catch(() => setErr(true));
  }, []);
  if (err) return /*#__PURE__*/React.createElement("div", {
    className: "widget-card weather-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "widget-h"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\uD83C\uDF26\uFE0F"
  }), " \u66FC\u8C37\u5929\u6C23"), /*#__PURE__*/React.createElement("div", {
    className: "widget-err"
  }, "\u8F09\u5165\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66"));
  if (!data) return /*#__PURE__*/React.createElement("div", {
    className: "widget-card weather-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "widget-h"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\uD83C\uDF26\uFE0F"
  }), " \u66FC\u8C37\u5929\u6C23"), /*#__PURE__*/React.createElement("div", {
    className: "widget-loading"
  }, "\u8F09\u5165\u4E2D\u2026"));
  const cur = data.current;
  const [icon, desc] = wcode(cur.weather_code);
  return /*#__PURE__*/React.createElement("div", {
    className: "widget-card weather-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "widget-h"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\uD83C\uDF26\uFE0F"
  }), " \u66FC\u8C37\u5929\u6C23 ", /*#__PURE__*/React.createElement("span", {
    className: "widget-sub"
  }, "\u5373\u6642 + 7 \u65E5\u9810\u5831")), /*#__PURE__*/React.createElement("div", {
    className: "weather-now"
  }, /*#__PURE__*/React.createElement("div", {
    className: "weather-ic"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: icon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "weather-temp"
  }, Math.round(cur.temperature_2m), "\xB0C"), /*#__PURE__*/React.createElement("div", {
    className: "weather-desc"
  }, desc))), /*#__PURE__*/React.createElement("div", {
    className: "weather-days"
  }, data.daily.time.slice(0, 7).map((d, i) => {
    const [ic] = wcode(data.daily.weather_code[i]);
    const dt = new Date(d);
    const md = dt.getMonth() + 1 + "/" + dt.getDate();
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      className: "wd"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wd-d"
    }, md), /*#__PURE__*/React.createElement("div", {
      className: "wd-i"
    }, /*#__PURE__*/React.createElement(Ic, {
      e: ic
    })), /*#__PURE__*/React.createElement("div", {
      className: "wd-t"
    }, Math.round(data.daily.temperature_2m_min[i]), "\u2013", Math.round(data.daily.temperature_2m_max[i]), "\xB0"), /*#__PURE__*/React.createElement("div", {
      className: "wd-p"
    }, /*#__PURE__*/React.createElement(Ic, {
      e: "\u2614"
    }), data.daily.precipitation_probability_max[i], "%"));
  })));
}

// ---- Exchange (Frankfurter, no key) ----
function ExchangeWidget() {
  const [rate, setRate] = useState(null);
  const [updated, setUpdated] = useState("");
  const [err, setErr] = useState(false);
  useEffect(() => {
    fetch("https://api.frankfurter.app/latest?from=TWD&to=THB").then(r => r.json()).then(d => {
      setRate(d.rates.THB);
      setUpdated(d.date);
    }).catch(() => setErr(true));
  }, []);
  if (err) return /*#__PURE__*/React.createElement("div", {
    className: "widget-card rate-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "widget-h"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\uD83D\uDCB1"
  }), " \u5373\u6642\u532F\u7387"), /*#__PURE__*/React.createElement("div", {
    className: "widget-err"
  }, "\u8F09\u5165\u5931\u6557"));
  if (!rate) return /*#__PURE__*/React.createElement("div", {
    className: "widget-card rate-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "widget-h"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\uD83D\uDCB1"
  }), " \u5373\u6642\u532F\u7387"), /*#__PURE__*/React.createElement("div", {
    className: "widget-loading"
  }, "\u8F09\u5165\u4E2D\u2026"));
  return /*#__PURE__*/React.createElement("div", {
    className: "widget-card rate-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "widget-h"
  }, /*#__PURE__*/React.createElement(Ic, {
    e: "\uD83D\uDCB1"
  }), " \u5373\u6642\u532F\u7387 ", /*#__PURE__*/React.createElement("span", {
    className: "widget-sub"
  }, "\u66F4\u65B0\u65BC ", updated)), /*#__PURE__*/React.createElement("div", {
    className: "rate-big"
  }, "1 TWD \u2248 ", rate.toFixed(3), " THB"), /*#__PURE__*/React.createElement("div", {
    className: "rate-rows"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rate-row"
  }, /*#__PURE__*/React.createElement("span", null, "NT$ 1,000"), /*#__PURE__*/React.createElement("span", null, "\u2248 \u0E3F ", Math.round(rate * 1000).toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "rate-row"
  }, /*#__PURE__*/React.createElement("span", null, "NT$ 5,000"), /*#__PURE__*/React.createElement("span", null, "\u2248 \u0E3F ", Math.round(rate * 5000).toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "rate-row"
  }, /*#__PURE__*/React.createElement("span", null, "NT$ 10,000"), /*#__PURE__*/React.createElement("span", null, "\u2248 \u0E3F ", Math.round(rate * 10000).toLocaleString()))), /*#__PURE__*/React.createElement("div", {
    className: "rate-meta"
  }, "\u8CC7\u6599\u4F86\u6E90 frankfurter.app\uFF08\u6B50\u6D32\u592E\u884C\uFF09"));
}

// ---- Budget ----
const DEFAULT_BUDGET = [{
  cat: "✈️ 機票",
  amount: 15000,
  per: "person"
}, {
  cat: "🏨 住宿",
  amount: 56000,
  per: "total"
}, {
  cat: "🍜 餐飲",
  amount: 1500,
  per: "person-day"
}, {
  cat: "🛍️ 購物",
  amount: 10000,
  per: "person"
}, {
  cat: "💆 SPA",
  amount: 3000,
  per: "person"
}, {
  cat: "🚕 交通",
  amount: 12000,
  per: "total"
}, {
  cat: "📌 其他",
  amount: 10000,
  per: "total"
}];
function App() {
  const [tab, go] = useHashTab("home");
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement(Header, {
    tab: tab,
    go: go
  }), /*#__PURE__*/React.createElement("main", {
    className: "main"
  }, tab === "home" && /*#__PURE__*/React.createElement(Home, {
    go: go
  }), tab === "days" && /*#__PURE__*/React.createElement(Days, null), tab === "extras" && /*#__PURE__*/React.createElement(Extras, null), tab === "info" && /*#__PURE__*/React.createElement(Info, null), tab === "pack" && /*#__PURE__*/React.createElement(Pack, null)), /*#__PURE__*/React.createElement("footer", {
    className: "ftr"
  }, /*#__PURE__*/React.createElement("div", null, "\u66FC\u8C37\u4E4B\u65C5 \xB7 2026.07.15 \u2013 07.18"), /*#__PURE__*/React.createElement("div", {
    className: "ftr-sub"
  }, "\u73A9\u5F97\u958B\u5FC3\uFF0C\u6CE8\u610F\u5B89\u5168 ", /*#__PURE__*/React.createElement(Ic, {
    e: "\u2764\uFE0F"
  }))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));