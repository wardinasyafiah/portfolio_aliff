const projects = [
  {
    number: "01",
    script: "First",
    title: "PROJECT",
    label: "FIRST / VISUAL IDENTITY",
    description: "This project represents one of my creative design explorations, where ideas are developed through research, experimentation, and visual development. Throughout the project, I explored different concepts, layouts, colours, typography, and visual elements to create a design that communicates the intended message effectively.",
    images: [
      {
        src: "assets/project1-art.png",
        alt: "First project visual identity and merchandise artwork"
      }
    ]
  },

  {
    number: "02",
    script: "Second",
    title: "PROJECT",
    label: "SECOND / BRAND SYSTEM",
    description: "The project began with an idea that was developed through observation, research, and creative exploration. I focused on understanding the purpose of the project and identifying the right visual direction to communicate the concept clearly.",
    images: [
      {
        src: "assets/project2-art.png",
        alt: "Second project corporate identity, packaging and promotional artwork"
      }
    ]
  },

  {
    number: "03",
    script: "Third",
    title: "PROJECT",
    label: "THIRD / PROMOTIONAL DESIGN",
    description: "The design was developed through research and experimentation, exploring different colours, typography, layouts, and visual elements to achieve a cohesive final outcome.",
    images: [
      {
        src: "assets/project3-chicken.png",
        alt: "Fried chicken promotional designs"
      },
      {
        src: "assets/project3-playground.png",
        alt: "Playground promotional design and packaging"
      }
    ]
  }
];


/* =========================================================
   HEADER / MOBILE NAVIGATION
   ========================================================= */

const header = document.getElementById("siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );
  });
}

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    if (nav) {
      nav.classList.remove("open");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});


/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );
  });
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add("visible");
  });

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections = [
  ...document.querySelectorAll("main section[id]")
];

const navLinks = [
  ...document.querySelectorAll(".nav a")
];

if ("IntersectionObserver" in window) {

  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
              "#" + entry.target.id
            );

          });

        }

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

}


/* =========================================================
   PROJECT SHOWCASE
   ========================================================= */

const projectTabs = [
  ...document.querySelectorAll(".project-tab")
];

const featuredNumber =
  document.getElementById("featuredNumber");

const featuredScript =
  document.getElementById("featuredScript");

const featuredTitle =
  document.getElementById("featuredTitle");

const featuredDescription =
  document.getElementById("featuredDescription");

const featuredLabel =
  document.getElementById("featuredLabel");

const featuredCount =
  document.getElementById("featuredCount");

const featuredProgress =
  document.getElementById("featuredProgress");

const featuredImage =
  document.getElementById("featuredImage");

const miniGallery =
  document.getElementById("miniGallery");

const featuredOpen =
  document.getElementById("featuredOpen");

const imageExpand =
  document.getElementById("imageExpand");

const visualPrev =
  document.getElementById("visualPrev");

const visualNext =
  document.getElementById("visualNext");


let currentProject = 0;
let currentImage = 0;


/* =========================================================
   MINI PROJECT GALLERY
   ========================================================= */

function buildMiniGallery(project) {

  if (!miniGallery) return;

  miniGallery.innerHTML = "";

  if (project.images.length <= 1) {
    return;
  }

  project.images.forEach((image, index) => {

    const button =
      document.createElement("button");

    button.type = "button";

    button.className =
      "mini-thumb" +
      (index === currentImage ? " active" : "");

    button.setAttribute(
      "aria-label",
      `View image ${index + 1}`
    );

    button.innerHTML = `
      <img
        src="${image.src}"
        alt="${image.alt}"
      >
    `;

    button.addEventListener("click", () => {

      currentImage = index;

      renderFeatured(false);

    });

    miniGallery.appendChild(button);

  });
}


/* =========================================================
   RENDER FEATURED PROJECT
   ========================================================= */

function renderFeatured(animate = true) {

  const project =
    projects[currentProject];

  const image =
    project.images[currentImage];

  if (!project || !image) {
    return;
  }


  /* Active project tab */

  projectTabs.forEach((tab, index) => {

    const active =
      index === currentProject;

    tab.classList.toggle(
      "active",
      active
    );

    tab.setAttribute(
      "aria-selected",
      active ? "true" : "false"
    );

  });


  /* Image fade animation */

  if (
    animate &&
    featuredImage
  ) {

    featuredImage.style.opacity = "0";

  }


  /* Project information */

  if (featuredNumber) {
    featuredNumber.textContent =
      project.number;
  }

  if (featuredScript) {
    featuredScript.textContent =
      project.script;
  }

  if (featuredTitle) {
    featuredTitle.textContent =
      project.title;
  }

  if (featuredDescription) {
    featuredDescription.textContent =
      project.description;
  }

  if (featuredLabel) {
    featuredLabel.textContent =
      project.label;
  }

  if (featuredCount) {

    featuredCount.textContent =
      `${String(currentImage + 1).padStart(2, "0")} / ${String(project.images.length).padStart(2, "0")}`;

  }

  if (featuredImage) {

    featuredImage.alt =
      image.alt;

  }

  if (featuredProgress) {

    featuredProgress.style.width =
      `${((currentProject + 1) / projects.length) * 100}%`;

  }


  /* Change image */

  const swapImage = () => {

    if (!featuredImage) {
      return;
    }

    featuredImage.src =
      image.src;

    featuredImage.style.opacity =
      "1";

  };


  if (animate) {

    setTimeout(
      swapImage,
      150
    );

  } else {

    swapImage();

  }


  /* Build thumbnails */

  buildMiniGallery(project);

}


/* =========================================================
   CHANGE PROJECT
   ========================================================= */

function setProject(index) {

  currentProject =
    (index + projects.length) %
    projects.length;

  currentImage = 0;

  renderFeatured(true);

}


projectTabs.forEach(tab => {

  tab.addEventListener(
    "click",
    () => {

      setProject(
        Number(
          tab.dataset.project
        )
      );

    }
  );

});


/* =========================================================
   PROJECT PREVIOUS / NEXT
   ========================================================= */

if (visualPrev) {

  visualPrev.addEventListener(
    "click",
    () => {

      setProject(
        currentProject - 1
      );

    }
  );

}


if (visualNext) {

  visualNext.addEventListener(
    "click",
    () => {

      setProject(
        currentProject + 1
      );

    }
  );

}


/* =========================================================
   PROJECT MODAL
   ========================================================= */

const modal =
  document.getElementById("projectModal");

const modalImage =
  document.getElementById("modalImage");

const modalTitle =
  document.getElementById("modalTitle");

const modalDescription =
  document.getElementById("modalDescription");

const modalCounter =
  document.querySelector(".modal-counter");


/* =========================================================
   RENDER MODAL
   ========================================================= */

function renderModal() {

  const project =
    projects[currentProject];

  const image =
    project.images[currentImage];

  if (!project || !image) {
    return;
  }


  if (modalImage) {

    modalImage.src =
      image.src;

    modalImage.alt =
      image.alt;

  }


  if (modalTitle) {

    modalTitle.textContent =
      `${project.number} — ${project.script} ${project.title}`;

  }


  if (modalDescription) {

    modalDescription.textContent =
      project.description;

  }


  if (modalCounter) {

    modalCounter.textContent =
      `${currentImage + 1} / ${project.images.length}`;

  }

}


/* =========================================================
   OPEN MODAL
   ========================================================= */

function openModal(
  projectIndex = currentProject,
  imageIndex = currentImage
) {

  currentProject =
    Number(projectIndex);

  currentImage =
    Number(imageIndex);

  renderModal();

  if (!modal) {
    return;
  }

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeModal() {

  if (!modal) {
    return;
  }

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


/* =========================================================
   MOVE MODAL IMAGE
   ========================================================= */

function moveModalImage(delta) {

  const count =
    projects[currentProject].images.length;

  currentImage =
    (currentImage + delta + count) %
    count;

  renderModal();

  renderFeatured(false);

}


/* =========================================================
   PROJECT MODAL BUTTONS
   ========================================================= */

if (featuredOpen) {

  featuredOpen.addEventListener(
    "click",
    () => openModal()
  );

}


if (imageExpand) {

  imageExpand.addEventListener(
    "click",
    () => openModal()
  );

}


const modalClose =
  document.querySelector(".modal-close");

const modalPrev =
  document.querySelector(".modal-prev");

const modalNext =
  document.querySelector(".modal-next");


if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeModal
  );

}


if (modalPrev) {

  modalPrev.addEventListener(
    "click",
    () => moveModalImage(-1)
  );

}


if (modalNext) {

  modalNext.addEventListener(
    "click",
    () => moveModalImage(1)
  );

}


/* =========================================================
   CLOSE MODAL BY CLICKING OUTSIDE
   ========================================================= */

if (modal) {

  modal.addEventListener(
    "click",
    event => {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );

}


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      !modal ||
      !modal.classList.contains("open")
    ) {

      return;

    }


    if (event.key === "Escape") {

      closeModal();

    }


    if (event.key === "ArrowLeft") {

      moveModalImage(-1);

    }


    if (event.key === "ArrowRight") {

      moveModalImage(1);

    }

  }
);




renderFeatured(false);



const whatsappNumber =
  "601164071715";

const whatsappMessage =
  "Hi Aliff, I found your portfolio and would like to discuss a design project.";

const whatsappLink =
  document.getElementById("whatsappLink");


if (whatsappLink) {

  whatsappLink.href =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

}