document.addEventListener("DOMContentLoaded", function () {
  loadGames();
  loadServers();
  setInterval(loadGames, 5000);
  setInterval(loadServers, 5000);
});

function loadGames() {
  fetch("https://api.playerreborn.com/games_table")
    .then((res) => res.json())
    .then((data) => {
      const gameContainer = document.getElementById("game-container");
      let playerCount = 0;

      gameContainer.innerHTML = "";

      data.forEach((game) => {
        if (
          game.game_image === null ||
          game.game_image === "null" ||
          game.game_image === ""
        ) {
          game.game_image = "./assets/images/game-cover/custom-image.png";
        }

        gameContainer.innerHTML += `

            <div class="col-lg-2 col-md-4 col-6">
              <div class="card h-100">
                <img src="${game.game_image}" alt="${game.game_name}" height="200"
                  width="100%">

                <div class="card-body">
                  <p class="mb-0">${game.game_name}</p>

                  <div class="d-flex align-items-center">
                    <i class="bi bi-people-fill icon"></i>
                    <p class="m-0 ms-2 highlight">${game.player_count} Online</p>
                  </div>
                </div>
              </div>
            </div>
            
          `;

        playerCount += game.player_count;
      });

      const memberCount = document.getElementById("online-count");
      memberCount.textContent = `${playerCount}`;
    })
    .catch(() => {
      document.getElementById("online-count").textContent = 0;
      loadFakeGames();
    });
}

function loadServers() {
  fetch("https://api.playerreborn.com/servers_table")
    .then((res) => res.json())
    .then((data) => {
      const serverPlayerCountId = document.querySelector(
        ".online-server-count",
      );
      const serverCountId = document.getElementById("server-count");
      const serverContainerId = document.getElementById("server-container");

      let serverPlayerCount = 0;
      let serverCount = 0;

      serverContainerId.innerHTML = "";

      data.forEach((server) => {
        let seconds = Math.floor(server.uptime / 1000);
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);

        if (server.current_state === "running") {
          serverContainerId.innerHTML += `
            <div class="row align-items-center mb-4 mt-2">

              <div class="col-md-4 col-12">
                <div>${server.server_name}</div>
                <small class="muted">play.playerreborn.com</small>
              </div>

              <div class="col-md-2 col-3">${server.game_type}</div>

              <div class="col-md-2 col-3 d-flex align-items-center">
                <span class="status-dot status-online me-2"></span>
                <span>Online</span>
              </div>

              <div class="col-md-2 col-3">${server.player_count}/${server.max_players}</div>

              <div class="col-md-2 col-3">${hours}h ${minutes}m</div>

            </div>
          `;

          serverPlayerCount += server.player_count;
          serverCount += 1;
        } else {
          serverContainerId.innerHTML += `
            <div class="row align-items-center mb-4 mt-2">

              <div class="col-md-4 col-12">
                <div>${server.server_name}</div>
                <small class="muted">play.playerreborn.com</small>
              </div>

              <div class="col-md-2 col-3">${server.game_type}</div>

              <div class="col-md-2 col-3 d-flex align-items-center">
                <span class="status-dot status-offline me-2"></span>
                <span>Offline</span>
              </div>

              <div class="col-md-2 col-3">${server.player_count}/${server.max_players}</div>

              <div class="col-md-2 col-3">${server.uptime}</div>

            </div>
          `;
        }
      });

      serverPlayerCountId.textContent = `${serverPlayerCount}`;
      serverCountId.textContent = `${serverCount}`;
    })
    .catch(() => {
      document.querySelector(".online-server-count").textContent = 0;
      document.getElementById("server-count").textContent = 0;
      loadFakeServers();
    });
}

function loadFakeGames() {
  const gameContainer = document.getElementById("game-container");
  const games = [
    {
      game_name: "Halo Inifinte",
      game_image: "/assets/images/game-cover/halo-infinite.jpeg",
    },
    {
      game_name: "Phasmophobia",
      game_image: "/assets/images/game-cover/phasmophobia.jpeg",
    },
    {
      game_name: "Palworld",
      game_image: "/assets/images/game-cover/palworld.jpeg",
    },
    {
      game_name: "Minecraft",
      game_image: "/assets/images/game-cover/minecraft.jpeg",
    },
    {
      game_name: "Baldurs Gate 3",
      game_image: "/assets/images/game-cover/baldurs-gate-3.jpeg",
    },
    {
      game_name: "Rocket League",
      game_image: "/assets/images/game-cover/rocket-league.jpeg",
    },
  ];

  gameContainer.innerHTML = "";

  games.forEach((game) => {
    gameContainer.innerHTML += `

        <div class="col-lg-2 col-md-4 col-6">
              <div class="card h-100">
                <img src="${game.game_image}" alt="baldurs gate 3 cover art" height="200"
                  width="100%">

                <div class="card-body">
                  <p class="mb-0">${game.game_name}</p>

                  <div class="d-flex align-items-center">
                    <i class="bi bi-people-fill icon"></i>
                    <p class="m-0 ms-2 highlight">0 Online</p>
                  </div>
                </div>
              </div>
            </div>

      `;
  });
}

function loadFakeServers() {
  const serverContainerId = document.getElementById("server-container");
  const servers = [
    {
      server_name: "Minecraft Survival",
      game_type: "Paper",
    },
    {
      server_name: "Player Reborn - Conan Exiles",
      game_type: "Conan Exiles Enhanced",
    },
  ];

  serverContainerId.innerHTML = "";

  servers.forEach((server) => {
    serverContainerId.innerHTML += `
    <div class="row align-items-center mb-4 mt-2">
      <div class="col-md-4 col-12">
        <div>${server.server_name}</div>
        <small class="muted">play.playerreborn.com</small>
      </div>

      <div class="col-md-2 col-3">${server.game_type}</div>

      <div class="col-md-2 col-3 d-flex align-items-center">
        <span class="status-dot status-offline me-2"></span>
        <span>Offline</span>
      </div>

      <div class="col-md-2 col-3">0/20</div>

      <div class="col-md-2 col-3">N/A</div>
    </div>
    `;
  });
}
