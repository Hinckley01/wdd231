// ===== Navigation Toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');

  // Make sure nav is hidden by default on mobile
  nav.classList.add('hidden');

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('hidden') === false; // toggle hidden class
    menuToggle.setAttribute('aria-expanded', isOpen); // update ARIA
  });
});


const yearSpan = document.getElementById("currentyear");
const lastModifiedPara = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear();
lastModifiedPara.textContent = `Last Modified: ${document.lastModified}`;




const courses = [
  { subject: 'CSE', number: 110, title: 'Programming Building Blocks', credits: 2, completed: false },
  { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 3, completed: false },
  { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: false },
  { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
  { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: false },
  { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: true },
  { subject: 'WDD', number: 331, title: 'Frontend Web Development II', credits: 2, completed: false }
];



const courseList = document.getElementById("course-list");
const totalCredits = document.getElementById("total-credits");
const filterButtons = document.querySelectorAll(".filters button");


function displayCourses(courseArray) {
  courseList.innerHTML = "";

  courseArray.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");

    if (course.completed) {
      card.classList.add("completed");
    }

    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
    `;

    courseList.appendChild(card);
  });

  calculateCredits(courseArray);
}

// Calculate total credits using reduce()
function calculateCredits(courseArray) {
  const credits = courseArray.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = credits;
}

// Filter logic
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    let filteredCourses = courses;
    if (filter !== "all") {
      filteredCourses = courses.filter(
        course => course.subject.toLowerCase() === filter
      );
    }

    displayCourses(filteredCourses);
  });
});

// Initial load
displayCourses(courses);
