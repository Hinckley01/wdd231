// ===== Hamburger Menu =====
const menuBtn = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");

menuBtn.addEventListener("click", () => {
  navList.classList.toggle("open");
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", !expanded);
});

// ===== Fetch Games =====
async function getGames() {
  try {
    const response = await fetch("./games.json");

    if (!response.ok) throw new Error("Failed to fetch games data.");

    const games = await response.json();
    displayGames(games);

  } catch (error) {
    console.error("Error:", error);
    document.getElementById("gamesContainer").innerHTML = 
      "<p style='text-align:center; color:red;'>Failed to load games. Check console.</p>";
  }
}

// ===== Display Games =====
function displayGames(games) {
  const container = document.getElementById("gamesContainer");

  container.innerHTML = games.map(game => `
    <article class="game-card">
      <img src="images/${game.image}" 
           alt="${game.name}" 
           loading="lazy" 
           width="300" 
           height="200"
           onerror="this.src='images/placeholder.jpg'">
      <h3>${game.name}</h3>
      <p><strong>Genre:</strong> ${game.genre}</p>
      <p><strong>Platform:</strong> ${game.platform}</p>
      <p><strong>Rating:</strong> ${game.rating}</p>
      <button data-name="${game.name}" data-genre="${game.genre}">View Details</button>
    </article>
  `).join("");

  setupModal();
}

// ===== Modal Setup =====
function setupModal() {
  const modal = document.getElementById("gameModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const closeModal = document.getElementById("closeModal");

  document.querySelectorAll(".game-card button").forEach(btn => {
    btn.addEventListener("click", () => {
      modalTitle.textContent = btn.dataset.name;
      modalBody.textContent = `Genre: ${btn.dataset.genre}`;
      modal.showModal();
    });
  });

  closeModal.addEventListener("click", () => modal.close());
}

// ===== Grid/List Toggle =====
document.getElementById("grid").addEventListener("click", () => {
  document.getElementById("gamesContainer").className = "grid";
});
document.getElementById("list").addEventListener("click", () => {
  document.getElementById("gamesContainer").className = "list";
});

// ===== Footer Info =====
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Initialize
getGames();
