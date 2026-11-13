/* Everything the page says lives here. */

window.SITE = {

  display: "servyy",
  name: "heliynn",

  statement:
    "I'm heliynn. I use AI to make small tools and websites, usually " +
    "for myself which i then share publicly :3",

  /* `copy` makes the row a copy button, `href` a link. Order matters. */
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

  /* Two different pictures are picked per visit, one per edge. Add a path to grow the pool. */
  art: {
    pool: [
      "assets/art-left.png?v=16",
      "assets/art-right.png?v=16",
      "assets/megumin-4.png?v=1",
      "assets/megumin-5.png?v=1",
      "assets/megumin-6.png?v=1"
    ]
  },

  /* One is picked per visit and can be dragged anywhere. Add a path for more moods. */
  mascot: {
    pool: [
      "assets/chomusuke-1.png?v=1",
      "assets/chomusuke-2.png?v=1"
    ]
  }
};