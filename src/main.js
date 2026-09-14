import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

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
      1 - distance / (window.innerHeight * 1)
    );

    gsap.set(project, { opacity });
  });
});
});