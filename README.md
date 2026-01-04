# Interactive CV / Portfolio

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

A modern, responsive, and interactive Curriculum Vitae (CV) website template built with **HTML5**, **Tailwind CSS**, and **Vanilla JavaScript**. Designed to showcase your professional profile, skills, and projects with a clean and engaging user experience.

## ✨ Key Features

- **🎨 Modern Design**: Clean UI with a focus on readability and aesthetics using Tailwind CSS.
- **🌓 Dark Mode Support**: Built-in toggle for Light and Dark themes, respecting system preferences.
- **📱 Fully Responsive**: Optimized for desktops, tablets, and mobile devices.
- **⚡ Interactive Elements**: Smooth scrolling, hover effects, and animated progress bars for skills.
- **🖨️ Printer Friendly**: Optimized CSS for printing (`Ctrl + P`) to generate a clean PDF version of the CV suitable for ATS.
- **♿ Accessible**: Semantic HTML and ARIA attributes for better accessibility.
- **🔍 SEO Optimized**: Includes meta tags for better search engine visibility.

## 🛠️ Tech Stack

- **HTML5**: Semantic structure.
- **Tailwind CSS (CDN)**: Utility-first CSS framework for rapid styling.
- **JavaScript (Vanilla)**: Logic for theme toggling, animations, and data rendering.
- **FontAwesome**: Iconography.
- **Google Fonts**: Typography (Inter font family).

## 🚀 Getting Started

1.  **Clone the repository** (or download the ZIP):
    ```bash
    git clone https://github.com/ZenFill/interactive-cv.git
    ```
2.  **Open the project**:
    Simply open the `index.html` file in your web browser. No build step or server is required!

## 📝 Customization Guide

### 1. Personal Information (`index.html`)

Edit the `index.html` file to update your personal details:

- **Profile Image**: Replace `assets/foto.jpg` with your photo.
- **Name & Title**: Search for "AL ZENDRY FILLAH AKBARY" and replace it.
- **Contact Links**: Update `href` attributes for Email, LinkedIn, Discord, and WhatsApp.
- **Experience & Education**: Modify the HTML content in the `#experience` and `#education` sections.

### 2. Skills & Tools (`script.js`)

Skill data is managed in `script.js` for easy updates. Look for the `Data Mock` section:

```javascript
// Example modification in script.js
const frontendSkills = [
  { name: "React JS", level: 85 },
  { name: "Vue JS", level: 70 },
];
```

### 3. Styling (`style.css` & Tailwind)

- Global variables for colors are defined in `style.css` under `:root`.
- You can change Tailwind classes directly in `index.html` to adjust padding, margins, or colors.

## 📄 License

This project is open-source and available for personal use and modification.

---

**Made with ❤️ by Al Zendry Fillah Akbary**
