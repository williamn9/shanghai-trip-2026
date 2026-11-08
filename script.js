const header = document.querySelector(".site-header");

const onScroll = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const places = {
  westKowloon: {
    name: "香港西九龍站",
    lat: 22.3038,
    lng: 114.1655,
    note: "G900 動臥出發",
  },
  hongqiao: {
    name: "上海虹橋駅",
    lat: 31.1946,
    lng: 121.3202,
    note: "G900 抵達",
  },
  hotel: {
    name: "虹橋荷逸唐（北新涇）",
    lat: 31.2182,
    lng: 121.3745,
    note: "15–18 · 兩間露台大床房",
  },
  parkHotel: {
    name: "國際飯店",
    lat: 31.2345,
    lng: 121.4705,
    note: "Art Deco 起點",
  },
  peaceHotel: {
    name: "和平飯店",
    lat: 31.2412,
    lng: 121.4855,
    note: "外灘 Art Deco",
  },
  dahuchun: {
    name: "大壺春（生煎）",
    lat: 31.2388,
    lng: 121.485,
    note: "外灘側午餐錨點",
  },
  fuxingPark: {
    name: "復興公園",
    lat: 31.2195,
    lng: 121.4635,
    note: "法租界散步收尾",
  },
  yuyuan: { name: "豫園／城隍廟", lat: 31.2272, lng: 121.492, note: "園林與小吃" },
  bund: { name: "外灘", lat: 31.2404, lng: 121.4905, note: "天際線與夜景" },
  wukang: { name: "武康路", lat: 31.2065, lng: 121.4385, note: "前法租界輕逛" },
  xintiandi: {
    name: "新天地",
    lat: 31.2198,
    lng: 121.4745,
    note: "石庫門街區",
  },
  suzhou: {
    name: "蘇州駅一帶",
    lat: 31.331,
    lng: 120.605,
    note: "轉往園林區",
  },
  zhuozheng: {
    name: "拙政園",
    lat: 31.3245,
    lng: 120.629,
    note: "經典園林（擇一）",
  },
  pingjiang: {
    name: "平江路",
    lat: 31.3165,
    lng: 120.6335,
    note: "水巷步道",
  },
  pudong: {
    name: "上海浦東機場",
    lat: 31.1443,
    lng: 121.8083,
    note: "MU725 返港",
  },
  hkg: {
    name: "香港國際機場",
    lat: 22.308,
    lng: 113.9185,
    note: "00:15+1 抵達",
  },
};

const shortLabels = {
  westKowloon: "西九",
  hongqiao: "虹橋",
  hotel: "飯店",
  parkHotel: "國際",
  peaceHotel: "和平",
  dahuchun: "生煎",
  fuxingPark: "復興",
  yuyuan: "豫園",
  bund: "外灘",
  wukang: "武康",
  xintiandi: "新天地",
  suzhou: "蘇州",
  zhuozheng: "拙政",
  pingjiang: "平江",
  pudong: "浦東",
  hkg: "HKG",
};

const dateLabels = {
  day0: "11/14",
  day1: "11/15",
  day2: "11/16",
  day3: "11/17",
  day4: "11/18",
};

const routeMeta = {
  day0: {
    caption: "11/14：香港西九龍 → G900 動臥過夜 → 翌日虹橋。",
  },
  day1: {
    caption: "11/15：虹橋 → 北新涇荷逸唐 → Art Deco／外灘。",
  },
  day2: {
    caption: "11/16：武康路 → 安福／復興公園 → 新天地。",
  },
  day3: {
    caption: "11/17：虹橋 → 蘇州 → 拙政園／平江路 → 晚回酒店。",
  },
  day4: {
    caption: "11/18：市區輕鬆 → 浦東機場 MU725 → 香港。",
  },
};

const routes = {
  day0: {
    color: "#5c6f7d",
    path: ["westKowloon", "hongqiao"],
    markers: ["westKowloon", "hongqiao"],
  },
  day1: {
    color: "#1f5f6b",
    path: ["hongqiao", "hotel", "parkHotel", "peaceHotel", "dahuchun", "bund", "yuyuan", "hotel"],
    markers: ["hongqiao", "hotel", "parkHotel", "peaceHotel", "dahuchun", "bund", "yuyuan"],
  },
  day2: {
    color: "#b08a3c",
    path: ["hotel", "wukang", "fuxingPark", "xintiandi", "hotel"],
    markers: ["hotel", "wukang", "fuxingPark", "xintiandi"],
  },
  day3: {
    color: "#0f3d48",
    path: ["hotel", "hongqiao", "suzhou", "zhuozheng", "pingjiang", "suzhou", "hongqiao", "hotel"],
    markers: ["hotel", "hongqiao", "zhuozheng", "pingjiang"],
  },
  day4: {
    color: "#8a6230",
    path: ["hotel", "pudong", "hkg"],
    markers: ["hotel", "pudong", "hkg"],
  },
};

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#e6edf2" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#3a4553" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#eef2f6" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "simplified" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#f5f8fa" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#ced8e0" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#a9c5cf" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#b5c2cc" }],
  },
];

let activeDay = "day1";
let mapRouteController = null;

const tabCopy = {
  info: {
    title: "行程資訊",
    lede: "總覽、已訂交通、乘客名單與實用提醒。",
  },
  day: {
    title: "每日行程",
    lede: "頂部選日期，只顯示當日骨架與實用提醒。",
  },
};

function toLatLng(place) {
  return { lat: place.lat, lng: place.lng };
}

function showMapSetup() {
  const setup = document.getElementById("map-setup");
  if (setup) setup.hidden = false;
}

function hideMapSetup() {
  const setup = document.getElementById("map-setup");
  if (setup) setup.hidden = true;
}

function markerIcon(label, isHub = false) {
  const size = isHub ? 38 : 32;
  const bg = isHub ? "#b08a3c" : "#0f3d48";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="${bg}" stroke="#f7f9fb" stroke-width="2"/>
      <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
        fill="#f7f9fb" font-size="${isHub ? 10 : 11}" font-family="sans-serif" font-weight="700">${label}</text>
    </svg>`;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new google.maps.Size(size, size),
    anchor: new google.maps.Point(size / 2, size / 2),
  };
}

function selectDay(dayKey, { scroll = false } = {}) {
  const isInfo = dayKey === "info";
  if (!isInfo && !routes[dayKey]) return;
  activeDay = dayKey;

  document.querySelectorAll(".day-tab").forEach((tab) => {
    const selected = tab.dataset.day === dayKey;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", selected ? "true" : "false");
  });

  document.querySelectorAll(".day-panel").forEach((panel) => {
    const selected = panel.dataset.day === dayKey;
    panel.classList.toggle("is-active", selected);
    panel.hidden = !selected;
  });

  const title = document.getElementById("days-title");
  const lede = document.getElementById("days-lede");
  const copy = isInfo ? tabCopy.info : tabCopy.day;
  if (title) title.textContent = copy.title;
  if (lede) lede.textContent = copy.lede;

  const mapBlock = document.querySelector(".day-map-block");
  if (mapBlock) mapBlock.hidden = isInfo;

  if (!isInfo) {
    const caption = document.getElementById("map-caption");
    if (caption && routeMeta[dayKey]) {
      caption.textContent = routeMeta[dayKey].caption;
    }
    if (mapRouteController) {
      mapRouteController(dayKey);
    }
  }

  if (scroll) {
    const daysSection = document.getElementById("days");
    if (daysSection) {
      daysSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function initDayTabs() {
  const tabs = Array.from(document.querySelectorAll(".day-tab"));
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      selectDay(tab.dataset.day, { scroll: true });
      history.replaceState(null, "", `#${tab.dataset.day}`);
    });
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const next =
        event.key === "ArrowRight"
          ? tabs[(index + 1) % tabs.length]
          : tabs[(index - 1 + tabs.length) % tabs.length];
      next.focus();
      selectDay(next.dataset.day, { scroll: true });
      history.replaceState(null, "", `#${next.dataset.day}`);
    });
  });

  document.querySelectorAll("[data-select-day]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const key = link.getAttribute("data-select-day");
      if (!key) return;
      event.preventDefault();
      selectDay(key, { scroll: true });
      history.replaceState(null, "", `#${key}`);
    });
  });

  const hashDay = (location.hash || "").replace(/^#/, "");
  if (hashDay === "info" || routes[hashDay]) {
    activeDay = hashDay;
  }

  selectDay(activeDay);
}

window.initTripMap = function initTripMap() {
  const mapEl = document.getElementById("trip-map");
  if (!mapEl || typeof google === "undefined" || !google.maps) return;

  hideMapSetup();

  const map = new google.maps.Map(mapEl, {
    center: toLatLng(places.hotel),
    zoom: 10,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    clickableIcons: false,
    gestureHandling: "cooperative",
    styles: mapStyles,
  });

  const info = new google.maps.InfoWindow();
  const layers = { lines: {}, markers: {} };

  const hubMarker = new google.maps.Marker({
    position: toLatLng(places.hotel),
    map,
    title: places.hotel.name,
    icon: markerIcon("飯店", true),
    zIndex: 1000,
  });

  hubMarker.addListener("click", () => {
    info.setContent(
      `<strong>${places.hotel.name}</strong><div>住宿 · ${places.hotel.note}</div>`
    );
    info.open({ map, anchor: hubMarker });
  });

  Object.entries(routes).forEach(([dayKey, route]) => {
    const path = route.path.map((id) => toLatLng(places[id]));
    const line = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: route.color,
      strokeOpacity: 0.95,
      strokeWeight: 4.5,
      map: null,
    });

    const dayMarkers = route.markers
      .filter((id) => id !== "hotel")
      .map((id) => {
        const place = places[id];
        const marker = new google.maps.Marker({
          position: toLatLng(place),
          map: null,
          title: place.name,
          icon: markerIcon(shortLabels[id] || place.name),
        });

        marker.addListener("click", () => {
          info.setContent(
            `<strong>${place.name}</strong><div>${dateLabels[dayKey] || dayKey} · ${place.note}</div>`
          );
          info.open({ map, anchor: marker });
        });

        return marker;
      });

    layers.lines[dayKey] = line;
    layers.markers[dayKey] = dayMarkers;
  });

  const fitTo = (latLngList) => {
    const bounds = new google.maps.LatLngBounds();
    latLngList.forEach((point) => bounds.extend(point));
    map.fitBounds(bounds, 56);
  };

  const setRoute = (key) => {
    const focusPoints = [toLatLng(places.hotel)];

    Object.keys(routes).forEach((dayKey) => {
      const show = key === dayKey;
      const line = layers.lines[dayKey];
      const dayMarkers = layers.markers[dayKey];

      line.setMap(show ? map : null);
      dayMarkers.forEach((marker) => {
        marker.setMap(show ? map : null);
        if (show) focusPoints.push(marker.getPosition());
      });

      if (show) {
        routes[dayKey].path.forEach((id) =>
          focusPoints.push(toLatLng(places[id]))
        );
      }
    });

    fitTo(focusPoints);
    requestAnimationFrame(() => google.maps.event.trigger(map, "resize"));
  };

  mapRouteController = setRoute;

  const revealMap = () => {
    google.maps.event.trigger(map, "resize");
    setRoute(activeDay === "info" ? "day1" : activeDay);
  };

  if ("IntersectionObserver" in window) {
    const mapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealMap();
            mapObserver.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    mapObserver.observe(mapEl);
  } else {
    revealMap();
  }

  window.addEventListener("resize", () => {
    google.maps.event.trigger(map, "resize");
  });
};

function loadGoogleMaps() {
  const key = (window.GOOGLE_MAPS_API_KEY || "").trim();
  if (!key || key === "YOUR_GOOGLE_MAPS_API_KEY") {
    showMapSetup();
    return;
  }

  if (document.getElementById("google-maps-script")) return;

  const script = document.createElement("script");
  script.id = "google-maps-script";
  script.async = true;
  script.defer = true;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
    key
  )}&callback=initTripMap`;
  script.onerror = showMapSetup;
  document.head.appendChild(script);
}

initDayTabs();
loadGoogleMaps();
