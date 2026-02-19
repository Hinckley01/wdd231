const container = document.querySelector("#gamesContainer");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

const modal = document.querySelector("#gameModal");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector("#modalBody");
const closeModal = document.querySelector("#closeModal");

async function getGames() {
  const response = await fetch("games.json");
  const data = await response.json();
  displayGames(data);
}

function displayGames(games) {
  container.innerHTML = "";

  games.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    card.innerHTML = `
      <img src="images/${game.image}" alt="${game.name}" loading="lazy">
      <h3>${game.name}</h3>
      <p><strong>Genre:</strong> ${game.genre}</p>
      <p><strong>Platform:</strong> ${game.platform}</p>
      <p><strong>Rating:</strong> ⭐ ${game.rating}</p>
    `;

    card.addEventListener("click", () => {
      modalTitle.textContent = game.name;
      modalBody.innerHTML = `
        Genre: ${game.genre} <br>
        Platform: ${game.platform} <br>
        Rating: ⭐ ${game.rating}
      `;
      modal.showModal();
    });

    container.appendChild(card);
  });
}

gridBtn.addEventListener("click", () => {
  container.className = "grid";
});

listBtn.addEventListener("click", () => {
  container.className = "list";
});

closeModal.addEventListener("click", () => {
  modal.close();
});

// Footer
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;


getGames();
