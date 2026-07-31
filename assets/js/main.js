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

  /* ---------- Footer year (if any [data-year]) ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
