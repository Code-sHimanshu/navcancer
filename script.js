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

// Human Interface Modal Logic (API Connected)
if (window.location.pathname.endsWith('human_interface.html')) {
  const modal = document.getElementById('humanInterfaceModal');
  const closeBtn = document.getElementById('closeHumanModal');
  const authSection = document.getElementById('authSection');
  const mainSection = document.getElementById('mainSection');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const authError = document.getElementById('authError');
  const expertsList = document.querySelector('.experts-list');
  const appointmentForm = document.getElementById('appointmentForm');
  const notificationPopup = document.getElementById('notificationPopup');
  const closePopup = document.getElementById('closePopup');

  let currentUser = null;
  let selectedExpertId = null;

  // Show modal on load
  modal.style.display = 'block';

  // Close modal
  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };

  // Switch between login and signup tabs
  loginTab.onclick = () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    authError.textContent = '';
  };
  signupTab.onclick = () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
    authError.textContent = '';
  };

  // Signup API
  signupForm.onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    if (password.length < 6) {
      authError.textContent = 'Password must be at least 6 characters';
      return;
    }
    try {
      const res = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        authError.textContent = 'Signup successful! Please login.';
        loginTab.click();
        signupForm.reset();
      } else {
        authError.textContent = data.error || 'Signup failed.';
      }
    } catch (err) {
      authError.textContent = 'Network error.';
    }
  };

  // Login API
  loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        currentUser = email;
        authSection.style.display = 'none';
        mainSection.style.display = 'block';
        authError.textContent = '';
        loadExperts();
      } else {
        authError.textContent = data.error || 'Login failed.';
      }
    } catch (err) {
      authError.textContent = 'Network error.';
    }
  };

  // Load experts from backend
  async function loadExperts() {
    expertsList.innerHTML = '<p>Loading experts...</p>';
    try {
      const res = await fetch('http://127.0.0.1:8000/api/experts/');
      const data = await res.json();
      if (res.ok && data.experts.length) {
        expertsList.innerHTML = '';
        data.experts.forEach(expert => {
          const card = document.createElement('div');
          card.className = 'card expert-card';
          card.innerHTML = `
            <img src="${expert.photo || 'assets/expert1.jpg'}" alt="${expert.name}" class="expert-photo" />
            <div class="expert-info">
              <h3>${expert.name}</h3>
              <p class="designation">${expert.designation}</p>
              <p class="specialization">Specialization: ${expert.specialization}</p>
              <div class="expert-rating">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>
                <span>(${expert.reviews} reviews)</span>
              </div>
              <button class="book-btn" data-expert="${expert.id}">Book Appointment</button>
            </div>
          `;
          expertsList.appendChild(card);
        });
        // Add event listeners for book buttons
        document.querySelectorAll('.book-btn').forEach(btn => {
          btn.onclick = (e) => {
            selectedExpertId = btn.getAttribute('data-expert');
            appointmentForm.style.display = 'block';
            appointmentForm.scrollIntoView({ behavior: 'smooth' });
          };
        });
      } else {
        expertsList.innerHTML = '<p>No experts found.</p>';
      }
    } catch (err) {
      expertsList.innerHTML = '<p>Failed to load experts.</p>';
    }
  }

  // Appointment form submit (API)
  appointmentForm.onsubmit = async (e) => {
    e.preventDefault();
    if (!selectedExpertId) {
      alert('Please select an expert.');
      return;
    }
    const formData = new FormData();
    formData.append('email', currentUser);
    formData.append('expert_id', selectedExpertId);
    formData.append('date', document.getElementById('appointmentDate').value);
    formData.append('time', document.getElementById('appointmentTime').value);
    formData.append('additional_info', document.getElementById('additionalInfo').value);
    const reportFile = document.getElementById('reportUpload').files[0];
    if (reportFile) formData.append('report', reportFile);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/appointments/', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        appointmentForm.reset();
        appointmentForm.style.display = 'none';
        notificationPopup.style.display = 'flex';
      } else {
        alert(data.error || 'Failed to book appointment.');
      }
    } catch (err) {
      alert('Network error.');
    }
  };

  // Close notification popup
  closePopup.onclick = () => {
    notificationPopup.style.display = 'none';
    mainSection.style.display = 'block';
  };

  // Close modal when clicking outside
  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
    if (e.target === notificationPopup) {
      notificationPopup.style.display = 'none';
    }
  };
}