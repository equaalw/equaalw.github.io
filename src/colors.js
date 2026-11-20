import gsap from "gsap";
import Lenis from "lenis";

const lenis = new Lenis({
    smoothWheel: true,
    lerp: 0.08
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const text = document.querySelector(".color-text");

const brightColors = [
    "#ff4b4b",
    "#4b7bff",
    "#ffe34b",
    "#55c878",
    "#b85cff",
    "#ff914b",
    "#4bd9d9",
    "#ff70b8"
];

const pastelColors = [
    "#F7C6D9",
    "#F4B8CC",
    "#F8D1DC",
    "#EFB6C8",
    "#F6C8B8",
    "#F3B8B8",
    "#F9D6DF",
    "#EFC4D4"
];

const originalText = text.textContent.trim();

text.innerHTML = "";

const letters = [];

[...originalText].forEach((char, index) => {

    const letter = document.createElement("span");

    letter.className = "color-letter";

    if (char === " ") {
        letter.classList.add("space");
        letter.textContent = "\u00A0";
        text.appendChild(letter);
        return;
    }

    letter.textContent = char;

    letter.style.backgroundColor =
        pastelColors[index % pastelColors.length];

    // letter.addEventListener("mouseenter", () => {
    //     gsap.to(letter, {
    //         scale: 3,
    //         duration: 0.5,
    //         ease: "elastic.out(1,0.3)"
    //     });
    // });

    // letter.addEventListener("mouseleave", () => {
    //     gsap.to(letter, {
    //         scale: 1,
    //         duration: 1,
    //         ease: "power2.out"
    //     });
    // });



    text.appendChild(letter);

    letters.push(letter);

});

// const mouse = { x: 0, y: 0 };

// window.addEventListener("mousemove", (e) => {
//     mouse.x = e.clientX;
//     mouse.y = e.clientY;

//     letters.forEach((letter) => {
//         const rect = letter.getBoundingClientRect();

//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;

//         const dx = mouse.x - centerX;
//         const dy = mouse.y - centerY;

//         const distance = Math.sqrt(dx * dx + dy * dy);

//         const radius = 150;

//         let scale = 1;

//         if (distance < radius) {
//             const strength = 1 - distance / radius;

//             scale = 1 + strength * 1.5;
//         }

//         gsap.to(letter, {
//             scale,
//             duration: 0.2,
//             overwrite: true,
//             ease: "power2.out"
//         });
//     });
// });

function getLines() {

    const lines = {};

    letters.forEach(letter => {

        const y = letter.offsetTop;

        if (!lines[y]) {
            lines[y] = [];
        }

        lines[y].push(letter);

    });

    return Object.values(lines);

}


const lines = getLines();


window.addEventListener("mousemove", (e) => {

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const distance = Math.hypot(
        e.clientX - centerX,
        e.clientY - centerY
    );

    const radius = 600;

    const strength = Math.max(
        0,
        1 - distance / radius
    );

    letters.forEach((letter, index) => {

        const color = gsap.utils.interpolate(
            pastelColors[index % pastelColors.length],
            brightColors[index % brightColors.length],
            strength
        );

        letter.style.backgroundColor = color;

    });

});

window.addEventListener("mousemove", (e) => {

    letters.forEach((letter) => {

        const rect = letter.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.hypot(
            e.clientX - centerX,
            e.clientY - centerY
        );

        const radius = 100;

        const strength = Math.max(
            0,
            1 - distance / radius
        );

        const scale = 1 + Math.pow(strength, 3) * 1;

        gsap.to(letter, {
            scale: scale,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
        });

    });

});


const video = document.querySelector(".color-video-section video");

if (video) {

    lenis.on("scroll", ({ velocity }) => {

        // const blur = Math.abs(velocity) * 2;

        const blur = gsap.utils.clamp(
            0,
            1,
            Math.abs(velocity) * 2
        );

        gsap.to(video, {
            filter: `blur(${blur}px)`,
            duration: 0.2,
            overwrite: true
        });

    });

}

// const video = document.querySelector(".color-video-section video");

// if (video) {

//     lenis.on("scroll", ({ velocity }) => {

//         const blur = Math.max(
//             1 - Math.abs(velocity) * 2,
//             0
//         );

//         gsap.to(video, {
//             filter: `blur(${blur}px)`,
//             duration: 0.2,
//             overwrite: true
//         });

//     });

// }

// TEST
const videoFollow = document.querySelector(".video-follow");

if (videoFollow) {

    videoFollow.addEventListener("mousemove", (e) => {

        const rect = videoFollow.getBoundingClientRect();

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = 0;
        const centerY = 0;

        const x = Math.max(0, (mouseX - centerX) * 2.5);
        const y = Math.max(0, (mouseY - centerY) * 2.5);

        gsap.to(videoFollow, {
            x: x,
            y: y,
            duration: 12,
            ease: "power3.out"
        });

    });

    videoFollow.addEventListener("mouseleave", () => {

        gsap.to(videoFollow, {
            x: 0,
            y: 0,
            duration: 20,
            ease: "power3.out"
        });

    });

}