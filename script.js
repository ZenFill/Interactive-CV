// --- Data Mock untuk Keahlian (Skills) ---
/**
 * @typedef {Object} Skill
 * @property {string} name - Nama keahlian
 * @property {number} level - Tingkat keahlian (0-100)
 */

// [PANDUAN]: Ubah data di bawah ini sesuai keahlian Anda. Level: 0 - 100.
// Frontend
const frontendSkills = [
  {
    name: "HTML5 & CSS3",
    level: 90,
    icon: "fa-brands fa-html5",
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    name: "JavaScript (ES6+)",
    level: 85,
    icon: "fa-brands fa-js",
    color: "text-yellow-500 dark:text-yellow-400",
  },
  {
    name: "Tailwind CSS",
    level: 90,
    icon: "fa-solid fa-wind",
    color: "text-cyan-500 dark:text-cyan-400",
  },
];

// Backend
const backendSkills = [
  {
    name: "PHP",
    level: 80,
    icon: "fa-brands fa-php",
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    name: "Laravel",
    level: 75,
    icon: "fa-brands fa-laravel",
    color: "text-red-600 dark:text-red-500",
  },
  {
    name: "MySQL",
    level: 80,
    icon: "fa-solid fa-database",
    color: "text-blue-600 dark:text-blue-400",
  },
];

// Tools / DevOps (Badges only)
const devOpsTools = [
  {
    name: "Git",
    icon: "fa-brands fa-git-alt",
    color: "text-orange-600 dark:text-orange-500",
  },
  {
    name: "GitHub",
    icon: "fa-brands fa-github",
    color: "text-slate-800 dark:text-white",
  },
  {
    name: "VS Code",
    icon: "fa-solid fa-code",
    color: "text-blue-500 dark:text-blue-400",
  },
  {
    name: "Postman",
    icon: "fa-solid fa-paper-plane",
    color: "text-orange-500 dark:text-orange-400",
  },
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

  // Render Skill Item (Premium Card Style)
  const renderSkillItem = (skill, colorClass) => {
    // Helper to get friendly label
    const getLevelLabel = (level) => {
      if (level >= 90) return "Expert";
      if (level >= 75) return "Advanced";
      if (level >= 50) return "Intermediate";
      return "Beginner";
    };

    const levelLabel = getLevelLabel(skill.level);

    // Gunakan warna spesifik dari data jika ada, atau fallback ke default
    const specificTextColor = skill.color || "text-gray-500 dark:text-gray-400";

    // Background gradient tetap menggunakan colorClass (generic)
    const gradientColor = colorClass.replace("bg-", "text-"); // Hack untuk dapat color base

    return `
                <div class="group interactive-element relative bg-white dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-4 hover:shadow-lg dark:hover:shadow-indigo-900/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <!-- Hover Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-r ${colorClass.replace(
                      "500",
                      "50"
                    )} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                    
                    <!-- Icon Container -->
                    <div class="relative p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50 group-hover:bg-white dark:group-hover:bg-slate-800 transition-colors shadow-sm group-hover:shadow-md">
                        <i class="${
                          skill.icon
                        } ${specificTextColor} text-3xl transition-transform group-hover:scale-110 duration-300"></i>
                    </div>

                    <!-- Content -->
                    <div class="flex-1 relative z-10">
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-gray-700 dark:text-gray-200 text-lg group-hover:${gradientColor} transition-colors">${
      skill.name
    }</span>
                            <span class="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 dark:bg-slate-700/50 group-hover:bg-white dark:group-hover:bg-slate-600 border border-transparent ${specificTextColor} transition-all shadow-sm">
                                ${levelLabel}
                            </span>
                        </div>
                    </div>
                </div>
            `;
  };

  // Render Tool Item (Vertical Card)
  const renderToolItem = (tool) => {
    const specificTextColor =
      tool.color || "text-indigo-500 dark:text-indigo-400";

    return `
            <div class="group interactive-element flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-indigo-900/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
                 <!-- Hover Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>

                <div class="relative p-3 rounded-full bg-gray-50 dark:bg-slate-700/50 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <i class="${tool.icon} ${specificTextColor} text-4xl transition-transform duration-300"></i>
                </div>
                <span class="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors relative z-10">${tool.name}</span>
            </div>
        `;
  };

  // Inject content
  frontendContainer.innerHTML = frontendSkills
    .map((skill) => renderSkillItem(skill, "bg-emerald-500"))
    .join("");
  backendContainer.innerHTML = backendSkills
    .map((skill) => renderSkillItem(skill, "bg-blue-500"))
    .join("");
  devopsContainer.innerHTML = devOpsTools
    .map((tool) => renderToolItem(tool))
    .join("");
}

/**
 * 3. Mode Gelap (Dark Mode) Toggle
 * Mengatur pergantian tema dan menyimpan preferensi ke localStorage.
 */
function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  if (!themeToggle) return;

  // Toggle theme on click
  themeToggle.addEventListener("click", () => {
    html.classList.toggle("dark");
    if (html.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

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
