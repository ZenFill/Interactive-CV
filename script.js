// --- Data Mock untuk Keahlian (Skills) ---
/**
 * @typedef {Object} Skill
 * @property {string} name - Nama keahlian
 * @property {number} level - Tingkat keahlian (0-100)
 */

// [PANDUAN]: Ubah data di bawah ini sesuai keahlian Anda. Level: 0 - 100.
// Frontend
const frontendSkills = [
  { name: "HTML5 & CSS3", level: 90, icon: "fa-brands fa-html5" },
  { name: "JavaScript (ES6+)", level: 85, icon: "fa-brands fa-js" },
  { name: "Tailwind CSS", level: 90, icon: "fa-solid fa-wind" },
];

// Backend
const backendSkills = [
  { name: "PHP", level: 80, icon: "fa-brands fa-php" },
  { name: "Laravel", level: 75, icon: "fa-brands fa-laravel" },
  { name: "MySQL", level: 80, icon: "fa-solid fa-database" },
];

// Tools / DevOps (Badges only)
const devOpsTools = [
  { name: "Git", icon: "fa-brands fa-git-alt" },
  { name: "GitHub", icon: "fa-brands fa-github" },
  { name: "VS Code", icon: "fa-solid fa-code" },
  { name: "Postman", icon: "fa-solid fa-paper-plane" },
];

// --- Fungsi Utama JavaScript ---

/**
 * Inisialisasi utama saat DOM siap.
 */
document.addEventListener("DOMContentLoaded", () => {
  try {
    renderSkills();
    initializeThemeToggle();
    initializeIntersectionObserver();
  } catch (error) {
    console.error("Terjadi kesalahan saat inisialisasi aplikasi:", error);
  }
});

/**
 * 2. Rendering Keahlian (Progress Bar dan Badge)
 * Mengisi elemen HTML dengan data skills.
 */
function renderSkills() {
  const frontendContainer = document.getElementById("frontend-skills");
  const backendContainer = document.getElementById("backend-skills");
  const devopsContainer = document.getElementById("devops-skills");

  if (!frontendContainer || !backendContainer || !devopsContainer) {
    console.warn("Element container skills tidak ditemukan.");
    return;
  }

  // Render Skill Item (Modern Card Style)
  const renderSkillItem = (skill, colorClass) => `
                <div class="interactive-element bg-gray-50 dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
                    <div class="p-3 ${colorClass} bg-opacity-10 dark:bg-opacity-20 rounded-lg text-2xl">
                        <i class="${skill.icon}"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between mb-2">
                            <span class="font-bold text-gray-700 dark:text-gray-200">${
                              skill.name
                            }</span>
                            <span class="text-xs font-bold ${colorClass.replace(
                              "bg-",
                              "text-"
                            )}">${skill.level}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 overflow-hidden">
                            <div class="progress-bar-fill ${colorClass} h-2 rounded-full" style="--progress-width: ${
    skill.level
  }%"></div>
                        </div>
                    </div>
                </div>
            `;

  // Render Tool Item (Chip Style)
  const renderToolItem = (tool) => `
        <div class="interactive-element flex items-center gap-2 bg-gray-100 dark:bg-slate-700 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-slate-600 transition-colors shadow-sm">
            <i class="${tool.icon} text-indigo-500 dark:text-indigo-400"></i>
            <span class="font-medium text-sm text-gray-700 dark:text-gray-200">${tool.name}</span>
        </div>
    `;

  frontendContainer.innerHTML = frontendSkills
    .map((s) => renderSkillItem(s, "bg-emerald-500"))
    .join("");
  backendContainer.innerHTML = backendSkills
    .map((s) => renderSkillItem(s, "bg-blue-500"))
    .join("");

  // Render Badges (Tools)
  devopsContainer.innerHTML = devOpsTools.map(renderToolItem).join("");
}

/**
 * 3. Mode Gelap (Dark Mode) Toggle
 * Mengatur pergantian tema dan menyimpan preferensi ke localStorage.
 */
function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  if (!themeToggle) return;

  // Icon configurations
  const moonIcon = '<i class="fa-solid fa-moon w-5 h-5"></i>';
  const sunIcon = '<i class="fa-solid fa-sun w-5 h-5"></i>';

  // Update icon check
  const updateIcon = () => {
    const isDark = html.classList.contains("dark");
    themeToggle.innerHTML = isDark ? sunIcon : moonIcon;
    // Update aria-label for accessibility
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
    );
  };

  // Initial sync
  updateIcon();

  // Event Listener
  themeToggle.addEventListener("click", () => {
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateIcon();

    // Small animation effect
    themeToggle.classList.add("scale-90");
    setTimeout(() => themeToggle.classList.remove("scale-90"), 150);
  });
}

/**
 * 4. Smooth Scrolling untuk Navigasi Internal
 * @param {Event} event - Event click
 * @param {string} targetId - ID element tujuan
 */
function handleNavClick(event, targetId) {
  event.preventDefault();
  const targetElement = document.getElementById(targetId);

  if (!targetElement) return;

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

/**
 * Mengupdate class 'active' pada link navigasi berdasarkan posisi scroll.
 */
function updateActiveNavLink() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => link.classList.remove("active"));

  let currentActive = null;

  // Toleransi 5px untuk bagian bawah halaman
  const scrollBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;

  if (scrollBottom) {
    // Jika sudah mencapai bagian bawah, aktifkan bagian terakhir
    currentActive = sectionIds[sectionIds.length - 1];
  } else {
    // Cari bagian mana yang paling dekat dengan bagian atas viewport
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

/**
 * Menginisialisasi Intersection Observer untuk animasi scroll.
 */
function initializeIntersectionObserver() {
  // 1. Observer for Active Navigation Link
  // Gunakan throttling jika perlu untuk performance, tapi native scroll event biasanya cukup ok untuk kasus sederhana
  window.addEventListener("scroll", updateActiveNavLink);
  updateActiveNavLink();

  // 2. Observer for Scroll Animations
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Optional: unobserve after visible if you want animation only once
          // observer.unobserve(entry.target);
        } else {
          // Keep this if you want it to fade out again when scrolling up
          entry.target.classList.remove("is-visible");
        }
      });
    }, observerOptions);

    // Select elements to animate: sections, cards, and profile image
    const elementsToAnimate = document.querySelectorAll(
      "section > *, .card-base, .main-header"
    );

    elementsToAnimate.forEach((el) => {
      el.classList.add("animate-on-scroll");
      scrollObserver.observe(el);
    });
  } else {
    // Fallback for older browsers: show everything immediately
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      el.classList.add("is-visible");
    });
  }
}
