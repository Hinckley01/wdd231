// Grab query string values from the URL
const params = new URLSearchParams(window.location.search);

document.getElementById('fname').textContent = params.get('fname') || '';
document.getElementById('lname').textContent = params.get('lname') || '';
document.getElementById('email').textContent = params.get('email') || '';
document.getElementById('phone').textContent = params.get('phone') || '';
document.getElementById('organization').textContent = params.get('organization') || '';
document.getElementById('membership').textContent = params.get('membership') || '';
document.getElementById('timestamp').textContent = params.get('timestamp') || '';

// Footer dynamic info
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;
