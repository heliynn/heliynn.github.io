/* ============================================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Change the text inside the "quotes". Keep the punctuation around it
   (the commas, the square brackets, the curly braces) exactly as it is.
   Save the file, refresh the page — done.
   ========================================================================= */

window.SITE = {
  /* --- Basics ------------------------------------------------------------- */
  name: "LF",                                  // shown huge in the header and in the browser tab
  role: "Designer & developer",                // one or two words under your name
  location: "Earth",                           // city or region, shown in the footer
  email: "hello@example.com",                  // your real email address

  available: true,                             // true shows the green "open to work" dot
  availabilityText: "Open to new work",        // the label next to that dot

  tagline: "I make calm, useful things for the web.",

  intro:
    "I'm LF. I design interfaces and build them, mostly for the web. Currently " +
    "interested in small tools, clear writing, and software that respects your attention.",

  /* Links that appear next to "Say hello". Add or remove lines freely. */
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Email", href: "mailto:hello@example.com" },
  ],

  /* Words that scroll past in the strip under the hero. */
  marquee: [
    "Interface design",
    "Front-end",
    "Prototyping",
    "Design systems",
    "Writing",
    "Photography",
  ],

  /* --- About ------------------------------------------------------------- */
  aboutHeading: "A little about me",

  about: [
    "I've spent the last few years learning how to make things that feel obvious " +
      "to use. That usually means a lot of sketching, a lot of deleting, and a small " +
      "amount of code that actually ships.",
    "Outside of work I read, take long walks with a camera, and collect half-finished " +
      "side projects. This site is one of the finished ones.",
  ],

  facts: [
    { label: "Now", value: "Building small things" },
    { label: "Based in", value: "Earth" },
    { label: "Focus", value: "Design & front-end" },
    { label: "Tools", value: "Figma, HTML, CSS, JS" },
  ],

  /* --- Work -------------------------------------------------------------- */
  workHeading: "Things I've made",
  workIntro:
    "A few projects I'm happy with. Replace these with your own — the sample " +
    "entries below are just placeholders.",

  projects: [
    {
      title: "Northwind",
      year: "2026",
      blurb:
        "A quiet reading tracker that remembers what you've read without asking " +
        "you to maintain a spreadsheet.",
      tags: ["Product", "Front-end"],
      href: "https://example.com",
    },
    {
      title: "Grid Studies",
      year: "2025",
      blurb:
        "An ongoing series of layout experiments — small, self-contained pages " +
        "built to test one idea at a time.",
      tags: ["Design", "Code"],
      href: "https://example.com",
    },
    {
      title: "Field Notes",
      year: "2025",
      blurb:
        "A writing project about making things on the internet, collected in one " +
        "place instead of scattered across social media.",
      tags: ["Writing"],
      href: "https://example.com",
    },
  ],

  /* --- Notes ------------------------------------------------------------- */
  notesHeading: "Thinking out loud",
  notesIntro: "Occasional writing about design, code, and the space between them.",

  notes: [
    { date: "Oct 2026", title: "The interface is the argument", href: "#" },
    { date: "Aug 2026", title: "Fewer features, better defaults", href: "#" },
    { date: "Jun 2026", title: "Notes on building in public", href: "#" },
  ],

  /* --- Contact ----------------------------------------------------------- */
  contactHeading: "Let's make something good.",
  contactBlurb:
    "I'm open to freelance projects, collaborations, and the occasional " +
    "interesting conversation. The fastest way to reach me is email.",

  footerNote: "Built by hand. Hosted on GitHub Pages.",
};
