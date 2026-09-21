import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./style.css";

import { Flip } from "gsap/Flip";
import barba from "@barba/core";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger, Flip);

const lenis = new Lenis({
  lerp: 0.05,
  smoothWheel: true
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const columns = document.querySelectorAll(".column");

const greetings = [
  "HI",
  "BONJOUR",
  "GUTEN TAG",
  "HOLA",
  "CIAO",
  "こんにちは",
  "你好",
  "ПРИВЕТ"
];

const heroText = document.querySelector(".hero-text");

const greetingTimeline = gsap.timeline({
  repeat: -1
});

greetings.forEach((greeting) => {
  greetingTimeline
    .to(heroText, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    })
    .call(() => {
      heroText.textContent = greeting;
    })
    .to(heroText, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    })
    .to({}, {
      duration: 1.5
    });
});



const scrollHint = document.querySelector(".scroll-hint");

gsap.fromTo(
  scrollHint,
  {
    y: 15,
    opacity: 0
  },
  {
    y: 0,
    opacity: 1,
    duration: 1.2,
    delay: 0.8,
    ease: "power3.out"
  }
);


// const heroName = document.querySelector(".hero-name");
// const heroLogo = document.querySelector(".hero-logo");

// const logoTimeline = gsap.timeline({
//   repeat: -1,
//   repeatDelay: 5
// });

// logoTimeline
//   .to(heroName, {
//     opacity: 0,
//     duration: 0.4,
//     ease: "power2.inOut"
//   })
//   .to(heroLogo, {
//     opacity: 1,
//     scale: 1,
//     duration: 0.6,
//     ease: "back.out(1.5)"
//   })
//   .to({}, {
//     duration: 2
//   })
//   .to(heroLogo, {
//     opacity: 0,
//     scale: 0.8,
//     duration: 0.4,
//     ease: "power2.inOut"
//   })
//   .to(heroName, {
//     opacity: 1,
//     duration: 0.5,
//     ease: "power2.out"
//   });

const speeds = [3.5, 2, 3, 2.25];

const opacityStart = [
  "top 100%", // 1
  "top 90%", // 2
  "top 90%", // 3
  "top 90%"  // 4
];

const opacityEnd = [
  "top 40%", // 1
  "top 70%", // 2
  "top 60%", // 3
  "top 75%"  // 4
];
columns.forEach((column, i) => {
  gsap.fromTo(
    column,
    {
      y: 300
    },
    {
      y: -300 * speeds[i],
      ease: "none",
      scrollTrigger: {
        trigger: ".gallery",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    }
  );

  gsap.ticker.add(() => {
    document.querySelectorAll(".project").forEach((project) => {
      const rect = project.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(window.innerHeight / 2 - center);

      const opacity = gsap.utils.clamp(
        0.25,
        1,
        1 - distance / (window.innerHeight * 2)
      );

      gsap.set(project, { opacity });
    });
  });
});

const projects = document.querySelectorAll(".project");

projects.forEach((project) => {
  const image = project.querySelector("img");

  project.addEventListener("mouseenter", () => {
    gsap.to(image, {
      scale: 1.06,
      duration: 1.2,
      ease: "power2.out"
    });

    gsap.to(project, {
      "--mouse-x": "50%",
      "--mouse-y": "50%",
      duration: 0.4,
      ease: "power2.out"
    });
  });

  project.addEventListener("mousemove", (e) => {
    const rect = project.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(project, {
      "--mouse-x": `${x}px`,
      "--mouse-y": `${y}px`,
      duration: 0.25,
      ease: "power2.out"
    });
  });

  project.addEventListener("mouseleave", () => {
    gsap.to(image, {
      scale: 1,
      duration: 1,
      ease: "power2.inOut"
    });
  });
});


// barba.init({
//   transitions: [{
//     name: 'zoom-transition',
//     leave(data) {

//       return gsap.to(data.current.container, {
//         scale: 2,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power2.inOut"
//       });
//     },
//     enter(data) {

//       gsap.set(data.next.container, {
//         scale: 0.5,
//         opacity: 0
//       });


//       return gsap.to(data.next.container, {
//         scale: 1,
//         opacity: 1,
//         duration: 0.8,
//         ease: "power2.out"
//       });
//     }
//   }]
// });
// let transitionImage = null;

// barba.init({
//   transitions: [
//     {
//       name: "zoom",

//       async leave({ current }) {
//         const project = current.container.querySelector(".project");

//         if (!project) return;

//         const image = project.querySelector("img");

//         const rect = image.getBoundingClientRect();

//         const clone = image.cloneNode(true);

//         clone.classList.add("page-transition-image");

//         gsap.set(clone, {
//           position: "fixed",
//           top: rect.top,
//           left: rect.left,
//           width: rect.width,
//           height: rect.height,
//           objectFit: "cover",
//           zIndex: 9999,
//           margin: 0
//         });

//         document.body.appendChild(clone);

//         // запоминаем clone для enter
//         this.clone = clone;

//         // прячем текущую страницу
//         gsap.to(current.container, {
//           opacity: 0,
//           duration: 0.35,
//           ease: "power2.inOut"
//         });

//         // zoom
//         await gsap.to(clone, {
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//           duration: 1.1,
//           ease: "power4.inOut"
//         });
//       },

//       async enter({ next }) {
//         const clone = this.clone;

//         gsap.set(next.container, {
//           opacity: 0
//         });

//         await gsap.to(next.container, {
//           opacity: 1,
//           duration: 0.6,
//           ease: "power2.out"
//         });

//         if (clone) {
//           await gsap.to(clone, {
//             opacity: 0,
//             duration: 0.4,
//             ease: "power2.out"
//           });

//           clone.remove();
//         }
//       }
//     }
//   ]
// });


const darkSection = document.querySelector(".idiot-dark-section");

if (darkSection) {
  gsap.to(darkSection, {
    y: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".project-hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
}

const videoTitle = document.querySelector(".video-title");

if (videoTitle) {
  const titles = [
    "HEART OF THE FOREST SPIRIT",
    "HEART OF LEMON TREE"
  ];

  let index = 0;

  const titleTimeline = gsap.timeline({
    repeat: -1,
    delay: 2
  });

  titleTimeline
    .to(videoTitle, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    })
    .call(() => {
      index = (index + 1) % titles.length;
      videoTitle.textContent = titles[index];
    })
    .to(videoTitle, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    })
    .to({}, {
      duration: 2
    });
}