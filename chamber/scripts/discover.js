const message = document.getElementById("visitMessage");
const container = document.getElementById("cardsContainer");

// ---- VISIT MESSAGE ----
let lastVisit = localStorage.getItem("lastVisit");
let now = Date.now();

if (!lastVisit) {
  message.textContent = "Welcome! This looks like your first visit here.";
} else {
  let difference = now - lastVisit;
  let days = Math.floor(difference / 86400000);

  if (days < 1) {
    message.textContent = "Welcome back! You were here earlier today.";
  } else {
    message.textContent = "Welcome back! It's been " + days + " day(s) since your last visit.";
  }
}

localStorage.setItem("lastVisit", now);

// ---- LOAD JSON DATA ----
fetch("data/locations.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    data.locations.forEach(function (item, index) {
      let card = document.createElement("article");
      card.className = "card";
      card.style.gridArea = "card" + (index + 1);

      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <h4>${item.name}</h4>
        <p class="address">${item.address}</p>
        <p>${item.description}</p>
        <a href="#" class="learn-more">Learn more</a>
      `;

      container.appendChild(card);
    });
  })
  .catch(function () {
    container.innerHTML = "<p>Unable to load locations at this time.</p>";
  });
