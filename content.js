/* =========================================================
   EDIT THIS FILE: everything the page says lives here.
   After changing something, refresh the page to see it.
   ========================================================= */

window.SITE = {

  display: "servyy",
  name: "heliynn",

  statement:
    "I'm heliynn. I use AI to make small tools and websites, usually " +
    "for myself which i then share publicly :3",

  /* The card in the right margin. Order matters.
     - `copy` turns the row into a button that copies the handle.
     - `href` makes it a link. */
  notes: [
    { label: "discord", value: "@servfur", copy: "@servfur" },
    { label: "github", value: "@heliynn", href: "https://github.com/heliynn" },
    { label: "offsets", value: "offsets.json", href: "offsets.json" }
  ],

  /* The button under the rows. */
  server: {
    label: "join the sources server",
    href: "https://discord.gg/zJGbBw3yep"
  },
  servers: [
    {
      name: "Sources",
      invite: "zJGbBw3yep",
      role: "Member",
      image: "https://i.imgur.com/example1.png"
    },
    {
      name: "AI Tools",
      invite: "ai-tools-discord",
      role: "Developer",
      image: "https://i.imgur.com/example2.png"
    },
    {
      name: "Flashcards",
      invite: "flashcards-discord",
      role: "Student",
      image: "https://i.imgur.com/example3.png"
    },
    {
      name: "Sources.gg",
      invite: "sourcesgg",
      role: "Master Poster",
      image: "https://i.imgur.com/example4.png"
    }
  ],

  /* The two pictures at the edges. Delete a line to hide one.
     Update width and height if you swap in a different image. */
  art: {
    left: { src: "assets/art-left.png?v=14", width: 217, height: 320 },
    right: { src: "assets/art-right.png?v=14", width: 228, height: 340 }
  }
};
