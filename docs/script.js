document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:5000/status")
    // fetch("https://discord.com/api/guilds/1330977532824129616/widget.json")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("online-count").textContent =
        "Online Members: " + data.discord_online;

      if (data.minecraft.status === "online") {
        document.querySelector(".minecraft-status").innerHTML =
          "<span class='text-success'>● Online</span>";
      }
    })
    .catch(() => {
      document.getElementById("online-count").textContent =
        // "Unable to load member count";
        "6";
    });
});
