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
    { label: "discord", value: "@servfur", href: "https://discord.com/users/744890716878012508" },
    { label: "github", value: "@heliynn", href: "https://github.com/heliynn" },
    { label: "offsets", value: "dashboard", href: "offsets.html" }
  ],

  /* The button under the rows. It opens the server list. */
  server: {
    label: "join the servers"
  },

  /* The Discord servers shown in the popup.
     `invite` is the part after https://discord.gg/
     `role` is shown under the server name.
     `image` is the server icon. */
  servers: [
    {
      name: "servyy's archive",
      invite: "zJGbBw3yep",
      role: "Owner",
      image: "assets/server-archive.png?v=15"
    },
    {
      name: "Sources.gg",
      invite: "sourcesgg",
      role: "Master Poster",
      image: "assets/server-sourcesgg.png?v=15"
    }
  ],

  /* The two pictures at the edges. Delete a line to hide one.
     Update width and height if you swap in a different image. */
  art: {
    left: { src: "assets/art-left.png?v=15", width: 217, height: 320 },
    right: { src: "assets/art-right.png?v=15", width: 228, height: 340 }
  }
};