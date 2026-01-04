// --- Data Mock untuk Keahlian (Skills) ---
// [PANDUAN]: Ubah data di bawah ini sesuai keahlian Anda. Level: 0 - 100.
// Frontend
const frontendSkills = [
  { name: "Contoh Skill 1 (e.g. HTML)", level: 90 },
  { name: "Contoh Skill 2 (e.g. CSS)", level: 85 },
  { name: "Contoh Skill 3 (e.g. JS)", level: 80 },
];

// Backend
const backendSkills = [
  { name: "Contoh Skill 4 (e.g. PHP)", level: 90 },
  { name: "Contoh Skill 5 (e.g. SQL)", level: 85 },
  { name: "Contoh Skill 6 (e.g. Laravel)", level: 75 },
];

// Tools / DevOps (Badges only)
const devOpsTools = [
  "Contoh Tool 1",
  "Contoh Tool 2",
  "Contoh Tool 3",
  "Contoh Tool 4",
];

// --- Fungsi Utama JavaScript ---

// 1. Inisialisasi Ikon Lucide
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  initializeThemeToggle();
  initializeIntersectionObserver();
});

// 2. Rendering Keahlian (Progress Bar dan Badge)
function renderSkills() {
  const frontendContainer = document.getElementById("frontend-skills");
  const backendContainer = document.getElementById("backend-skills");
  const devopsContainer = document.getElementById("devops-skills");

  // Render Progress Bar
  const renderProgressBar = (skill) => `
                <div class="interactive-element">
                    <div class="flex justify-between mb-1">
                        <span class="font-medium text-sm">${skill.name}</span>
                        <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">${skill.level}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                        <div class="progress-bar-fill bg-emerald-500 h-2.5 rounded-full" style="--progress-width: ${skill.level}%"></div>
                    </div>
                </div>
            `;

  frontendContainer.innerHTML = frontendSkills.map(renderProgressBar).join("");
  backendContainer.innerHTML = backendSkills.map(renderProgressBar).join("");

  // Render Badges
  devopsContainer.innerHTML = devOpsTools
    .map(
      (tool) => `
                <span class="badge bg-indigo-500 text-white px-3 py-1 text-sm rounded-full font-medium hover:bg-indigo-600 transition duration-150 cursor-default">
                    ${tool}
                </span>
            `
    )
    .join("");
}

// 3. Mode Gelap (Dark Mode) Toggle
function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Icon configurations
  // Icon configurations
  const moonIcon = '<i class="fa-solid fa-moon w-5 h-5"></i>';
  const sunIcon = '<i class="fa-solid fa-sun w-5 h-5"></i>';

  // Update icon check
  const updateIcon = () => {
    const isDark = html.classList.contains("dark");
    themeToggle.innerHTML = isDark ? sunIcon : moonIcon;
  };

  // Initial sync
  updateIcon();

  // Event Listener
  themeToggle.addEventListener("click", () => {
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateIcon();

    // Optional: Add a small animation class to the button itself if needed
    themeToggle.classList.add("scale-90");
    setTimeout(() => themeToggle.classList.remove("scale-90"), 150);
  });
}

// 4. Smooth Scrolling untuk Navigasi Internal
function handleNavClick(event, targetId) {
  event.preventDefault();
  const targetElement = document.getElementById(targetId);

  // Scroll ke elemen dengan offset yang mempertimbangkan sticky header
  const headerOffset = 150;
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });

  // Setelah klik, segera update tautan aktif (opsional)
  setTimeout(updateActiveNavLink, 300);
}

// 5. Menandai Navigasi yang Aktif saat Scrolling
const sectionIds = ["experience", "education", "skills", "projects", "awards"];

function updateActiveNavLink() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => link.classList.remove("active"));

  let currentActive = null;

  // Toleransi 5px untuk bagian bawah halaman
  const scrollBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;

  if (scrollBottom) {
    // Jika sudah mencapai bagian bawah, aktifkan bagian terakhir (Penghargaan)
    currentActive = sectionIds[sectionIds.length - 1];
  } else {
    // Cari bagian mana yang paling dekat dengan bagian atas viewport (dari bawah ke atas)
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const section = document.getElementById(sectionIds[i]);
      if (section) {
        const rect = section.getBoundingClientRect();
        // Jika bagian tersebut berada di atau di atas titik pemicu (200px dari atas)
        if (rect.top <= 200) {
          currentActive = sectionIds[i];
          break;
        }
      }
    }
  }

  if (currentActive) {
    const activeLink = document.querySelector(
      `.nav-link[href="#${currentActive}"]`
    );
    if (activeLink) {
      // Update active class state
      document
        .querySelectorAll(".nav-link")
        .forEach((link) => link.classList.remove("active"));
      activeLink.classList.add("active");

      // Animate Sliding Indicator
      const indicator = document.getElementById("nav-indicator");
      if (indicator) {
        indicator.style.width = `${activeLink.offsetWidth}px`;
        indicator.style.left = `${activeLink.offsetLeft}px`;
        indicator.style.opacity = "1";
      }
    }
  } else {
    // If no section active (e.g. top of page), hide indicator
    const indicator = document.getElementById("nav-indicator");
    if (indicator) indicator.style.opacity = "0";
  }
}

function initializeIntersectionObserver() {
  // 1. Observer for Active Navigation Link
  window.addEventListener("scroll", updateActiveNavLink);
  updateActiveNavLink();

  // 2. Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  }, observerOptions);

  // Select elements to animate: sections, cards, and profile image
  const elementsToAnimate = document.querySelectorAll(
    "section > *, .card-base, .main-header"
  );

  elementsToAnimate.forEach((el, index) => {
    el.classList.add("animate-on-scroll");
    // Optional: Stagger animations slightly based on index
    // if (index % 2 !== 0) el.classList.add('delay-100');
    scrollObserver.observe(el);
  });
}
