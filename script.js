// ======================================
// SCROLL ANIMATION (ABOUT)
// ======================================
const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.25 }
);

hiddenElements.forEach((el) => observer.observe(el));

// ======================================
// SKILLS SCROLL ANIMATION
// ======================================
const skillItems = document.querySelectorAll(".skill-item");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  { threshold: 0.2 }
);

skillItems.forEach((item) => skillObserver.observe(item));

// ======================================
// PREMIUM LOADER
// ======================================
function startLoader() {
  const loadingNumber = document.querySelector(".loading-number");
  const loadingProgress = document.querySelector(".loading-progress");
  const loader = document.querySelector("#loader");

  // Kalau GSAP tersedia, pakai GSAP
  if (typeof gsap !== "undefined") {
    gsap.to(".logo", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    });

    const progress = { value: 0 };

    gsap.to(progress, {
      value: 100,
      duration: 2.5,
      ease: "power2.out",
      onUpdate() {
        loadingNumber.innerHTML = Math.floor(progress.value) + "%";
        gsap.set(loadingProgress, { width: progress.value + "%" });
      },
      onComplete() {
        const tl = gsap.timeline();

        tl.to("#loader", {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
        });

        tl.set(
          [
            ".hero-title",
            ".hero-subtitle",
            ".hero-heading",
            ".hero-description",
            ".hero-btn",
          ],
          { visibility: "visible" }
        );

        tl.from(".hero-title", {
          y: 100,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          ease: "power4.out",
        });

        tl.from(
          ".hero-subtitle",
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5"
        );

        tl.from(
          ".hero-heading",
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );

        tl.from(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        );

        tl.from(
          ".hero-btn",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );
      },
    });
  }
  // Fallback kalau GSAP gagal dimuat
  else {
    let value = 0;
    const interval = setInterval(() => {
      value += 2;
      loadingNumber.innerHTML = value + "%";
      loadingProgress.style.width = value + "%";

      if (value >= 100) {
        clearInterval(interval);
        loader.style.transform = "translateY(-100%)";
        loader.style.transition = "transform 1.2s ease";

        setTimeout(() => {
          document
            .querySelectorAll(
              ".hero-title, .hero-subtitle, .hero-heading, .hero-description, .hero-btn"
            )
            .forEach((el) => (el.style.visibility = "visible"));
        }, 600);
      }
    }, 40);
  }
}

// Jalankan loader setelah halaman siap
window.addEventListener("load", startLoader);
// ===============================
// Skills Title Animation
// ===============================

const skillsSection = document.querySelector("#skills");
const skillsTitle = skillsSection.querySelector(".section-title");
const skillsSubtitle = skillsSection.querySelector(".section-subtitle");

const titleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillsTitle.classList.add("show");
        skillsSubtitle.classList.add("show");
      }
    });
  },
  {
    threshold: 0.3,
  }
);

titleObserver.observe(skillsSection);

// kursorr======//

const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
});

// ======================================
// PROJECT SCROLL ANIMATION
// ======================================

const projectItems = document.querySelectorAll(".item");

const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

projectItems.forEach((item) => {
  projectObserver.observe(item);
});

// ======================================
// PROJECT VIDEO HOVER
// ======================================

document.querySelectorAll(".item video").forEach((video) => {
  video.pause();

  video.parentElement.addEventListener("mouseenter", () => {
    video.play();
  });

  video.parentElement.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});
// ======================================
// EDUCATION SCROLL ANIMATION
// ======================================

const educationSection = document.querySelector("#education");
const educationItems = document.querySelectorAll(".education-item");
const educationTitle = educationSection?.querySelector(".section-title");
const educationSubtitle = educationSection?.querySelector(".section-subtitle");

const educationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        educationTitle?.classList.add("show");
        educationSubtitle?.classList.add("show");
        educationItems.forEach((item) => item.classList.add("show"));
      } else {
        educationTitle?.classList.remove("show");
        educationSubtitle?.classList.remove("show");
        educationItems.forEach((item) => item.classList.remove("show"));
      }
    });
  },
  { threshold: 0.2 }
);

if (educationSection) {
  educationObserver.observe(educationSection);
}

// ======================================
// CONTACT SCROLL ANIMATION
// ======================================

const contactSection = document.querySelector("#contact");
const contactElements = document.querySelectorAll(
  ".contact-small, .contact-title, .contact-btn, .contact-links, .copyright"
);

const contactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        contactElements.forEach((el) => el.classList.add("show"));
      } else {
        contactElements.forEach((el) => el.classList.remove("show"));
      }
    });
  },
  { threshold: 0.25 }
);

if (contactSection) {
  contactObserver.observe(contactSection);
}
