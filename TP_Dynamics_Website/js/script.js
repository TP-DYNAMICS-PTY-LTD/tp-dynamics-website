document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  const progress = document.getElementById("scrollProgress");
  const backTop = document.getElementById("backTop");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  // Mobile navigation
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Scroll effects
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 20);
    backTop.classList.toggle("show", y > 650);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;

    const sections = [...document.querySelectorAll("main section[id]")];
    const current = sections.reduce((active, section) => {
      return y + 140 >= section.offsetTop ? section.id : active;
    }, "home");

    nav.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Reveal animation
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Service modals
  const modal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");

  const serviceDescriptions = {
    "Company Registration": "Get practical support with the steps involved in setting up your business professionally, from registration guidance to the basic digital presence your new company needs.",
    "Graphic Design": "Build a stronger visual identity with professional graphics for branding, social media, marketing materials, presentations and business communication.",
    "Business Emails": "Give your business a more professional presence with branded email setup, configuration guidance and a communication structure suited to your organisation.",
    "Website Design & Hosting": "Get a modern, responsive website designed around your customers, with a clean experience and hosting-ready structure for your business.",
    "IT Support": "Keep your business productive with practical technical assistance, troubleshooting, setup support and technology guidance when you need it.",
    "Software Development": "Turn repetitive processes and business challenges into custom software that saves time, improves organisation and supports growth.",
    "Mobile App Development": "Create a mobile experience that connects your customers, team or services through a focused, modern application."
  };

  const openModal = service => {
    modalTitle.textContent = service;
    modalText.textContent = serviceDescriptions[service] || "Let's discuss your requirements and design a practical solution around your goals.";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  document.querySelectorAll(".service-card").forEach(card => {
    card.querySelector(".service-link").addEventListener("click", () => openModal(card.dataset.service));
  });

  modal.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  // Contact form -> WhatsApp
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    const phone = data.get("phone");
    const service = data.get("service");
    const message = data.get("message");

    const text =
      `Hello TP Dynamics!%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      `Service: ${encodeURIComponent(service)}%0A` +
      `Project: ${encodeURIComponent(message)}`;

    note.textContent = "Opening WhatsApp with your enquiry…";
    window.open(`https://wa.me/27814570001?text=${text}`, "_blank");
  });
});
