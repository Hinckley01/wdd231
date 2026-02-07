document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cardsContainer");
  const visitMessage = document.getElementById("visitMessage");

  // ===== Visit Tracking =====
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! This is your first visit 🎮";
  } else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    visitMessage.textContent =
      days === 0
        ? "Welcome back! You visited today 🔥"
        : `Welcome back! It's been ${days} day(s) since your last visit.`;
  }

  localStorage.setItem("lastVisit", now);

  // ===== Fetch JSON =====
  fetch("./discover.json")
    .then(response => response.json())
    .then(data => {
      data.locations.forEach(location => {
        const card = document.createElement("article");
        card.className = "location-card";

        card.innerHTML = `
          <img src="${location.image}" alt="${location.name}" loading="lazy"
               onerror="this.src='images/placeholder.webp'">
          <h4>${location.name}</h4>
          <p class="address">${location.address}</p>
          <p>${location.description}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error(error);
      container.innerHTML = "<p>Failed to load locations.</p>";
    });
});
