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
