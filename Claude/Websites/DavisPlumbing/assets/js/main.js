/* =============================================================================
   Davis Plumbing — site interactions (vanilla JS, no dependencies)
   Progressive enhancement: everything works without JS; this adds polish.
   ========================================================================== */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: transparent → solid on scroll ---------- */
  const header = $("#site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("solid", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  const toggle = $("#nav-toggle");
  if (toggle && header) {
    const close = () => {
      header.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$(".primary-nav a").forEach((a) => a.addEventListener("click", close));
    window.addEventListener("keydown", (e) => e.key === "Escape" && close());
    window.addEventListener("resize", () => window.innerWidth > 860 && close());
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = $$("[data-reveal]");
  if (reveals.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* ---------- FAQ accordion ---------- */
  $$(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const answer = $(".faq-a", item);
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      answer.style.maxHeight = open ? answer.scrollHeight + "px" : "0";
    });
  });

  /* ---------- Gallery: filter + lightbox ---------- */
  const masonry = $("#masonry");
  if (masonry) {
    const tiles = $$(".tile", masonry);

    // Filter
    $$(".gallery-filters button").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".gallery-filters button").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        tiles.forEach((t) => {
          t.classList.toggle("hide", f !== "all" && t.dataset.cat !== f);
        });
      });
    });

    // Lightbox
    const lb = $("#lightbox");
    const lbImg = $("#lb-img");
    const lbCap = $("#lb-cap");
    let visible = [];
    let current = 0;

    const openLb = (tile) => {
      visible = tiles.filter((t) => !t.classList.contains("hide"));
      current = visible.indexOf(tile);
      render();
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
      $(".lb-close", lb).focus();
    };
    const render = () => {
      const t = visible[current];
      if (!t) return;
      lbImg.src = t.dataset.full;
      lbImg.alt = t.dataset.caption || "";
      lbCap.textContent = t.dataset.caption || "";
    };
    const closeLb = () => {
      lb.classList.remove("open");
      document.body.style.overflow = "";
    };
    const step = (d) => {
      current = (current + d + visible.length) % visible.length;
      render();
    };

    tiles.forEach((t) => {
      t.addEventListener("click", () => openLb(t));
      t.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLb(t);
        }
      });
    });
    if (lb) {
      $(".lb-close", lb).addEventListener("click", closeLb);
      $(".lb-nav.prev", lb).addEventListener("click", () => step(-1));
      $(".lb-nav.next", lb).addEventListener("click", () => step(1));
      lb.addEventListener("click", (e) => e.target === lb && closeLb());
      window.addEventListener("keydown", (e) => {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") closeLb();
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      });
    }
  }

  /* ---------- Before / after sliders ---------- */
  $$("[data-ba]").forEach((ba) => {
    const after = $(".after", ba);
    const handle = $(".handle", ba);
    const input = $("input", ba);
    if (!after || !input) return;
    const move = (v) => {
      after.style.clipPath = `inset(0 0 0 ${v}%)`;
      handle.style.left = v + "%";
    };
    input.addEventListener("input", () => move(input.value));
    move(input.value);
  });

  /* ---------- Forms: client-side validation + graceful success ---------- */
  $$("form#contact-form, form#estimate-form").forEach((form) => {
    const successId = form.id.replace("-form", "-success");
    const success = document.getElementById(successId);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      $$("[required]", form).forEach((field) => {
        const ok = field.value.trim() !== "";
        field.style.borderColor = ok ? "" : "var(--red)";
        if (!ok) valid = false;
      });
      if (!valid) return;
      /* No backend is wired yet. See README → "Connecting the forms".
         Replace this block with a POST to your form endpoint / email service. */
      if (success) {
        form.style.display = "none";
        success.classList.add("show");
        success.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
      }
    });
  });

  /* ---------- Our Work: full-screen slideshow ---------- */
  const ss = $("#slideshow");
  if (ss) {
    const slides = $$(".slide", ss);
    const dots = $$(".ss-dots button", ss);
    const thumbs = $$(".ss-thumbs button");
    const capTitle = $("#ss-title");
    const capCat = $("#ss-cat");
    const curEl = $("#ss-current");
    const progress = $("#ss-progress");
    const DURATION = 6000;
    let idx = 0;
    let timer = null;
    let playing = !prefersReduced;

    const setProgress = (run) => {
      if (!progress) return;
      progress.classList.remove("run");
      progress.style.width = "0";
      if (run) {
        // force reflow then animate
        void progress.offsetWidth;
        progress.style.transitionDuration = DURATION + "ms";
        progress.classList.add("run");
        progress.style.width = "100%";
      }
    };

    const show = (n) => {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("active", i === idx));
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      thumbs.forEach((t, i) => t.classList.toggle("active", i === idx));
      const s = slides[idx];
      if (capTitle) capTitle.textContent = s.dataset.title || "";
      if (capCat) capCat.textContent = s.dataset.cat || "";
      if (curEl) curEl.textContent = String(idx + 1).padStart(2, "0");
      // keep active thumb in view
      const at = thumbs[idx];
      if (at && at.scrollIntoView) at.scrollIntoView({ block: "nearest", inline: "center", behavior: prefersReduced ? "auto" : "smooth" });
      setProgress(playing);
    };

    const next = () => show(idx + 1);
    const prev = () => show(idx - 1);

    const start = () => {
      if (prefersReduced) return;
      stop();
      playing = true;
      setProgress(true);
      timer = setInterval(next, DURATION);
      updatePlayBtn();
    };
    const stop = () => {
      playing = false;
      if (timer) clearInterval(timer);
      timer = null;
      setProgress(false);
      updatePlayBtn();
    };
    const playBtn = $("#ss-play");
    const updatePlayBtn = () => {
      if (!playBtn) return;
      playBtn.setAttribute("aria-label", playing ? "Pause slideshow" : "Play slideshow");
      playBtn.dataset.state = playing ? "playing" : "paused";
    };

    $("#ss-next")?.addEventListener("click", () => { next(); if (playing) start(); });
    $("#ss-prev")?.addEventListener("click", () => { prev(); if (playing) start(); });
    playBtn?.addEventListener("click", () => (playing ? stop() : start()));
    dots.forEach((d, i) => d.addEventListener("click", () => { show(i); if (playing) start(); }));
    thumbs.forEach((t, i) => t.addEventListener("click", () => { show(i); if (playing) start(); }));

    ss.addEventListener("mouseenter", () => timer && clearInterval(timer));
    ss.addEventListener("mouseleave", () => playing && start());

    window.addEventListener("keydown", (e) => {
      if (!ss.getBoundingClientRect) return;
      const inView = ss.getBoundingClientRect().bottom > 0 && ss.getBoundingClientRect().top < window.innerHeight;
      if (!inView) return;
      if (e.key === "ArrowRight") { next(); if (playing) start(); }
      if (e.key === "ArrowLeft") { prev(); if (playing) start(); }
    });

    // Touch swipe
    let tx = 0;
    ss.addEventListener("touchstart", (e) => (tx = e.touches[0].clientX), { passive: true });
    ss.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); if (playing) start(); }
    }, { passive: true });

    show(0);
    if (playing) start();
  }

  /* ---------- Service-area map: locate visitor by IP, test real boundaries ---------- */
  const areamap = $("#areamap");
  const geoEl = areamap && $("#areamap-geo", areamap);
  if (areamap && geoEl) {
    let geo;
    try { geo = JSON.parse(geoEl.textContent); } catch { geo = null; }
    if (geo) {
      const frames = geo.frames;
      const cities = geo.cities;
      const statusEl = $("#areamap-status", areamap);
      const msgEl = $(".msg", statusEl);
      const pins = { west: $("#you-west", areamap), east: $("#you-east", areamap) };

      const projectF = (f, lng, lat) => [(lng - f.lngMin) * f.cos * f.scale, (f.latMax - lat) * f.scale];
      const inFrame = (f, lng, lat) => {
        const [x, y] = projectF(f, lng, lat);
        return x >= 0 && x <= f.w && y >= 0 && y <= f.h;
      };
      // ray-casting on geographic [lng,lat] rings
      const pip = (lng, lat, ring) => {
        let inside = false;
        for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
          const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
          if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
        }
        return inside;
      };
      const setStatus = (kind, html) => {
        statusEl.classList.remove("inside", "outside", "error");
        statusEl.classList.add(kind);
        msgEl.innerHTML = html;
      };
      const showPin = (frameKey, lng, lat) => {
        const f = frames[frameKey], pin = pins[frameKey];
        if (!f || !pin) return;
        let [x, y] = projectF(f, lng, lat);
        x = Math.max(6, Math.min(f.w - 6, x));
        y = Math.max(6, Math.min(f.h - 6, y));
        pin.setAttribute("transform", `translate(${x.toFixed(1)},${y.toFixed(1)})`);
        pin.style.display = "";
      };

      const place = (lng, lat, city, region) => {
        // Which served jurisdiction (if any) contains the visitor?
        let served = null;
        for (const c of Object.values(cities)) {
          if (c.rings.some((r) => pip(lng, lat, r))) { served = c; break; }
        }
        const where = city ? `${city}${region ? ", " + region : ""}` : "your location";
        const frameKey = inFrame(frames.west, lng, lat) ? "west" : inFrame(frames.east, lng, lat) ? "east" : null;
        if (frameKey) showPin(frameKey, lng, lat);

        if (served) {
          setStatus("inside", `You're in <strong>${served.name}, WA</strong> — a city we serve. <a href="/request-an-estimate/">Request an estimate</a> and we'll take it from here.`);
        } else if (frameKey) {
          setStatus("outside", `We found you near <strong>${where}</strong> — inside the region we cover, just outside the outlined city limits. <a href="/contact/">Contact us</a> to confirm we reach your address.`);
        } else {
          setStatus("outside", `We found you near <strong>${where}</strong>, outside the mapped area. We still serve much of the greater Seattle area — <a href="tel:+14254710874">give us a call</a>.`);
        }
      };

      // ipapi.co — free, no key. Fail gracefully to a friendly default.
      const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
      const t = setTimeout(() => ctrl && ctrl.abort(), 5000);
      fetch("https://ipapi.co/json/", { signal: ctrl ? ctrl.signal : undefined })
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d) => {
          clearTimeout(t);
          if (typeof d.longitude === "number" && typeof d.latitude === "number") {
            place(d.longitude, d.latitude, d.city, d.region_code || d.region);
          } else throw new Error("no coords");
        })
        .catch(() => {
          clearTimeout(t);
          setStatus("error", `We serve the greater Seattle area from Renton to the Cascades. <a href="/contact/">Check if we're in your area</a>.`);
        });
    }
  }

  /* ---------- Footer year (if any [data-year]) ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
