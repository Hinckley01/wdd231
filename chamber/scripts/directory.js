// ===== Fetch Members Safely =====
async function getMembers() {
    try {
        // Make sure this path matches exactly your folder structure
        const res = await fetch('scripts/data/members.json');

        // If fetch fails (404, etc.)
        if (!res.ok) {
            throw new Error(`Cannot fetch members.json (HTTP status ${res.status})`);
        }

        const members = await res.json();

        // Check that JSON is an array
        if (!Array.isArray(members)) {
            throw new Error('members.json is not a valid array.');
        }

        return members;
    } catch (err) {
        // Print error in console
        console.error('Error loading members:', err);
        // Alert user clearly
        alert(`Error loading members:\n${err.message}\n\nCheck that your JSON file exists and the path is correct!`);
        // Return empty array to prevent breaking the page
        return [];
    }
}

// ===== Display Members =====
async function displayMembers() {
    const members = await getMembers();
    const container = document.getElementById('members');

    if (!members.length) {
        container.innerHTML = '<p style="color:red; text-align:center;">No members found. Check console for errors or JSON path.</p>';
        return;
    }

    container.innerHTML = members.map(member => {
        // Use placeholder if image missing
        const imgPath = member.image ? `images/${member.image}` : 'images/placeholder.png';
        return `
        <div class="member-card">
            <img src="${imgPath}" alt="${member.name}" 
                 onerror="this.src='images/placeholder.png'; console.warn('Missing image for ${member.name}')">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>📞 ${member.phone}</p>
            <a href="${member.website}" target="_blank">Website</a>
        </div>
        `;
    }).join('');
}

// ===== Grid/List Toggle =====
function setupToggle() {
    const gridBtn = document.getElementById('grid');
    const listBtn = document.getElementById('list');
    const container = document.getElementById('members');

    gridBtn.addEventListener('click', () => {
        container.classList.add('grid');
        container.classList.remove('list');
        gridBtn.setAttribute('aria-pressed', 'true');
        listBtn.setAttribute('aria-pressed', 'false');
    });

    listBtn.addEventListener('click', () => {
        container.classList.add('list');
        container.classList.remove('grid');
        gridBtn.setAttribute('aria-pressed', 'false');
        listBtn.setAttribute('aria-pressed', 'true');
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    displayMembers();
    setupToggle();
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
});
