// 🔽 Toggle dropdown visibility on click
function toggleDropdown(event, dropdownId) {
  event.stopPropagation();
  closeAllDropdownsExcept(dropdownId);
  const dropdown = document.getElementById(dropdownId);
  dropdown.classList.toggle("show-dropdown");

  // Arrow animation
  const arrowIcon = event.currentTarget.querySelector(".arrow");
  arrowIcon.classList.toggle("rotate");
}

// 🧹 Close all dropdowns except the one clicked
function closeAllDropdownsExcept(exceptId) {
  const dropdowns = document.querySelectorAll(".dropdown");
  const arrows = document.querySelectorAll(".arrow");
  dropdowns.forEach(dropdown => {
    if (dropdown.id !== exceptId) dropdown.classList.remove("show-dropdown");
  });
  arrows.forEach(arrow => arrow.classList.remove("rotate"));
}

// 📦 Close dropdowns if clicking outside
window.addEventListener("click", () => closeAllDropdownsExcept(null));

// ➕ Add new dropdown option
function addOption(listId) {
  const ul = document.getElementById(listId);
  const newOption = prompt("Enter new option:");
  if (newOption && newOption.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = newOption;
    li.addEventListener("click", () => alert(`You clicked: ${newOption}`));
    ul.appendChild(li);
  } else {
    alert("Please enter a valid option name!");
  }
}

// 🎠 Big Carousel Logic
let currentImageIndex = 0;
const images = document.querySelectorAll(".carousel-img");

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

document.querySelector(".carousel-btn.left")?.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  showImage(currentImageIndex);
});

document.querySelector(".carousel-btn.right")?.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
});

// 🚀 On window load, activate first slide
window.onload = () => {
  showImage(currentImageIndex);
}; 

 // Optional: Toggle FAQ answers like accordion
 document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    q.nextElementSibling.classList.toggle('show');
  });
});









function openTab(evt, tabId) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => tab.classList.remove('active'));

  // Remove active class from all buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));

  // Show selected tab and mark button as active
  document.getElementById(tabId).classList.add('active');
  evt.currentTarget.classList.add('active');
}




// Currently no dynamic behavior for events page.
// But if in future, you want to dynamically load events or add modals, this is the place to do it!

// Optional: Scroll animation for section reveals (just for enhancement)
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.events-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});
// Scroll fade-in animation
const scrollElements = document.querySelectorAll('.scroll-fade');

const elementInView = (el, offset = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const displayScrollElement = (element) => {
  element.classList.add('visible');
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener('scroll', () => {
  handleScrollAnimation();
});
window.addEventListener('load', () => {
  handleScrollAnimation();
});