/* Renders content.js into the page and handles the small interactions.
   You shouldn't need to edit this file. */

(function () {
  "use strict";

  const S = window.SITE;
  if (!S) return;

  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  /* ------------------------------------------------------------------ text */
  const setText = (sel, value) => {
    const node = $(sel);
    if (node && value) node.textContent = value;
  };

  setText("#mark-text", S.name);
  setText("#hero-name", S.name);
  setText("#hero-role", S.role);
  setText("#hero-tagline", S.tagline);
  setText("#hero-intro", S.intro);
  setText("#about-heading", S.aboutHeading);
  setText("#work-heading", S.workHeading);
  setText("#work-intro", S.workIntro);
  setText("#notes-heading", S.notesHeading);
  setText("#notes-intro", S.notesIntro);
  setText("#contact-heading", S.contactHeading);
  setText("#contact-blurb", S.contactBlurb);
  setText("#footer-note", S.footerNote);
  setText("#footer-location", S.location);
  setText("#footer-year", "© " + new Date().getFullYear());

  /* Browser tab + link preview title */
  if (S.name && S.role) document.title = S.name + " — " + S.role;

  /* ---------------------------------------------------------- availability */
  const avail = $("#availability");
  if (S.available === false) {
    avail.hidden = true;
  } else if (S.availabilityText) {
    setText("#availability-text", S.availabilityText);
  }

  /* ----------------------------------------------------------- email links */
  if (S.email) {
    ["#hero-email", "#contact-email"].forEach((sel) => {
      const link = $(sel);
      if (link) link.href = "mailto:" + S.email;
    });
    const contactText = $("#contact-email .contact__text");
    if (contactText) contactText.textContent = S.email;
  }

  /* ------------------------------------------------------------- socials */
  const socials = $("#socials");
  (S.socials || []).forEach((item) => {
    const li = el("li");
    const a = el("a", "socials__link", item.label);
    a.href = item.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    li.appendChild(a);
    socials.appendChild(li);
  });

  /* ------------------------------------------------------------- marquee */
  const track = $("#marquee-track");
  const words = S.marquee || [];
  if (words.length) {
    // Duplicate the list so the loop is seamless.
    for (let pass = 0; pass < 2; pass++) {
      words.forEach((word) => {
        const span = el("span", "marquee__item", word);
        span.appendChild(el("span", "marquee__spark", "✦"));
        track.appendChild(span);
      });
    }
  } else {
    track.parentElement.hidden = true;
  }

  /* --------------------------------------------------------------- about */
  const aboutWrap = $("#about-paragraphs");
  (S.about || []).forEach((paragraph) => aboutWrap.appendChild(el("p", null, paragraph)));

  const facts = $("#about-facts");
  (S.facts || []).forEach((fact) => {
    const row = el("div", "fact");
    row.appendChild(el("dt", "fact__label", fact.label));
    row.appendChild(el("dd", "fact__value", fact.value));
    facts.appendChild(row);
  });

  /* ------------------------------------------------------------- projects */
  const cards = $("#projects");
  (S.projects || []).forEach((project, index) => {
    const card = el("a", "card reveal");
    card.href = project.href || "#";
    if (!project.href || project.href === "#") card.removeAttribute("target");
    else {
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }
    card.style.transitionDelay = index * 70 + "ms";

    const top = el("div", "card__top");
    top.appendChild(el("span", "card__index", String(index + 1).padStart(2, "0")));
    top.appendChild(el("span", "card__year", project.year || ""));
    card.appendChild(top);

    card.appendChild(el("h3", "card__title", project.title));
    card.appendChild(el("p", "card__blurb", project.blurb));

    const bottom = el("div", "card__bottom");
    const tags = el("ul", "tags");
    (project.tags || []).forEach((tag) => {
      const li = el("li", "tag", tag);
      tags.appendChild(li);
    });
    bottom.appendChild(tags);

    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    arrow.setAttribute("viewBox", "0 0 24 24");
    arrow.setAttribute("class", "card__arrow");
    arrow.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M7 17 17 7M9 7h8v8");
    arrow.appendChild(path);
    bottom.appendChild(arrow);

    card.appendChild(bottom);
    cards.appendChild(card);
  });

  /* ---------------------------------------------------------------- notes */
  const noteList = $("#notes-list");
  (S.notes || []).forEach((note) => {
    const li = el("li", "note");
    const a = el("a", "note__link");
    a.href = note.href || "#";
    a.appendChild(el("span", "note__date", note.date || ""));
    a.appendChild(el("span", "note__title", note.title));

    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    arrow.setAttribute("viewBox", "0 0 24 24");
    arrow.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M7 17 17 7M9 7h8v8");
    arrow.appendChild(path);
    a.appendChild(arrow);

    li.appendChild(a);
    noteList.appendChild(li);
  });

  /* ---------------------------------------------------------------- theme */
  const root = document.documentElement;
  const toggle = $("#theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function paintTheme() {
    const dark = root.getAttribute("data-theme") === "dark";
    toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    if (themeMeta) themeMeta.setAttribute("content", dark ? "#0f0e0d" : "#f6f3ee");
  }

  toggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    paintTheme();
  });

  paintTheme();

  /* --------------------------------------------------- scroll progress bar */
  const bar = $("#progress-bar");
  let ticking = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = "scaleX(" + Math.min(1, Math.max(0, ratio)) + ")";
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  updateProgress();

  /* --------------------------------------------------------- reveal on view */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealables = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach((node) => node.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealables.forEach((node) => io.observe(node));
  }

  /* --------------------------------------------------- active section link */
  const links = Array.from(document.querySelectorAll(".nav a"));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            const active = link.getAttribute("href") === "#" + entry.target.id;
            if (active) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => spy.observe(section));
  }

  /* ------------------------------------------- pointer spotlight on cards */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", event.clientX - rect.left + "px");
        card.style.setProperty("--my", event.clientY - rect.top + "px");
      });
    });
  }
})();
