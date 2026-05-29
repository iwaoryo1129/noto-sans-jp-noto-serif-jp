(() => {
  document.querySelectorAll(".faq__list").forEach((list) => {
    list.querySelectorAll(".faq__item").forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;

        list.querySelectorAll(".faq__item[open]").forEach((openItem) => {
          if (openItem !== item) openItem.removeAttribute("open");
        });
      });
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  document.documentElement.classList.add("motion-ready");

  const revealTargets = [
    ".about__copy",
    ".about__photo",
    ".benefit__card",
    ".note",
    ".menu__inner",
    ".menu-card",
    ".map",
    ".access",
    ".sns",
    ".footer"
  ];

  document.querySelectorAll(revealTargets.join(",")).forEach((node, index) => {
    node.classList.add("reveal");
    node.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

  const parallaxTargets = [
    { node: document.querySelector(".hero__image"), speed: 0.08 },
    { node: document.querySelector(".ornament"), speed: -0.05 },
    { node: document.querySelector(".about__photo"), speed: 0.04 },
    { node: document.querySelector(".benefit__card"), speed: 0.035 }
  ].filter((item) => item.node);

  let ticking = false;
  const updateParallax = () => {
    const viewportHeight = window.innerHeight || 1;
    parallaxTargets.forEach(({ node, speed }) => {
      const rect = node.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
      const y = Math.max(-28, Math.min(28, centerOffset * speed));
      node.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
    });
    ticking = false;
  };

  const requestParallax = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateParallax);
    }
  };

  updateParallax();
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax);
})();
