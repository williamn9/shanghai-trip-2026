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
  hongqiao: { name: "上海虹橋駅", lat: 31.1946, lng: 121.3202, note: "動臥／城際樞紐" },
  hotel: {
    name: "人民廣場／南京東路酒店區",
    lat: 31.2335,
    lng: 121.476,
    note: "四晚連住基地",
  },
  yuyuan: { name: "豫園／城隍廟", lat: 31.2272, lng: 121.492, note: "園林與小吃" },
  bund: { name: "外灘", lat: 31.2404, lng: 121.4905, note: "天際線與夜景" },
  lujiazui: { name: "陸家嘴", lat: 31.2397, lng: 121.4998, note: "浦東天際線" },
  hangzhouEast: { name: "杭州東駅", lat: 30.2913, lng: 120.2122, note: "西湖一日進出" },
  westLake: { name: "西湖", lat: 30.242, lng: 120.1485, note: "斷橋／蘇堤一帶" },
  suzhou: { name: "蘇州駅一帶", lat: 31.331, lng: 120.605, note: "轉往園林區" },
  zhuozheng: { name: "拙政園", lat: 31.3245, lng: 120.629, note: "經典園林（擇一）" },
  pingjiang: { name: "平江路", lat: 31.3165, lng: 120.6335, note: "水巷步道" },
  wukang: { name: "武康路", lat: 31.2065, lng: 121.4385, note: "前法租界輕逛" },
};

const shortLabels = {
  westKowloon: "西九",
  hongqiao: "虹橋",
  hotel: "飯店",
  yuyuan: "豫園",
  bund: "外灘",
  lujiazui: "陸家嘴",
  hangzhouEast: "杭東",
  westLake: "西湖",
  suzhou: "蘇州",
  zhuozheng: "拙政",
  pingjiang: "平江",
  wukang: "武康",
};

const dateLabels = {
  day0: "11/13",
  day1: "11/14",
  day2: "11/15",
  day3: "11/16",
  day4: "11/17",
};

const routeMeta = {
  day0: {
    caption: "11/13：香港西九龍 → G900 動臥過夜 → 翌日虹橋。",
  },
  day1: {
    caption: "11/14：虹橋 → 酒店 → 豫園 → 外灘／陸家嘴。",
  },
  day2: {
    caption: "11/15：虹橋 → 杭州東 → 西湖 → 晚回上海。",
  },
  day3: {
    caption: "11/16：虹橋 → 蘇州 → 拙政園／平江路 → 晚回上海。",
  },
  day4: {
    caption: "11/17：武康路輕逛 → 虹橋 G895 動臥返港。",
  },
};

const routes = {
  day0: {
    color: "#5c6f7d",
    path: ["westKowloon", "hongqiao"],
    markers: ["westKowloon", "hongqiao"],
  },
  day1: {
    color: "#4a6d82",
    path: ["hongqiao", "hotel", "yuyuan", "bund", "lujiazui"],
    markers: ["hongqiao", "hotel", "yuyuan", "bund", "lujiazui"],
  },
  day2: {
    color: "#b86a2e",
    path: ["hotel", "hongqiao", "hangzhouEast", "westLake", "hangzhouEast", "hongqiao", "hotel"],
    markers: ["hotel", "hongqiao", "hangzhouEast", "westLake"],
  },
  day3: {
    color: "#2f4a5c",
    path: ["hotel", "hongqiao", "suzhou", "zhuozheng", "pingjiang", "suzhou", "hongqiao", "hotel"],
    markers: ["hotel", "hongqiao", "zhuozheng", "pingjiang"],
  },
  day4: {
    color: "#8a4f2a",
    path: ["hotel", "wukang", "hotel", "hongqiao"],
    markers: ["hotel", "wukang", "hongqiao"],
  },
};

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#e8eef2" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#2c3d4f" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f2f6f8" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "simplified" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#f7fafc" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d0dbe3" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#b7cdd9" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#b7c4cf" }],
  },
];

let activeDay = "day1";
let mapRouteController = null;

const tabCopy = {
  info: {
    title: "行程資訊",
    lede: "總覽、動臥高鐵、杭州／蘇州說明與實用貼士。",
  },
  day: {
    title: "每日行程",
    lede: "頂部選日期，只顯示當日行程、路線與預約連結。",
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
  const bg = isHub ? "#b86a2e" : "#2f4a5c";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="${bg}" stroke="#fafcfd" stroke-width="2"/>
      <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
        fill="#fafcfd" font-size="${isHub ? 10 : 11}" font-family="sans-serif" font-weight="700">${label}</text>
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
