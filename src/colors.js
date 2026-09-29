import gsap from "gsap";

const text = document.querySelector(".color-text");

const colors = [
    "#ff4b4b",
    "#4b7bff",
    "#ffe34b",
    "#55c878",
    "#b85cff",
    "#ff914b",
    "#4bd9d9",
    "#ff70b8"
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
        colors[index % colors.length];

    letter.addEventListener("mouseenter", () => {
        gsap.to(letter, {
            scale: 3,
            duration: 0.5,
            ease: "elastic.out(1,0.3)"
        });
    });

    letter.addEventListener("mouseleave", () => {
        gsap.to(letter, {
            scale: 1,
            duration: 1,
            ease: "power2.out"
        });
    });



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


lines.forEach((line, lineIndex) => {

    gsap.to(line, {

        opacity: 0,

        duration: 0.3,

        stagger: {
            each: 0.06
        },

        repeat: -1,
        yoyo: true,

        delay: lineIndex * 0.25,

        ease: "power1.inOut"

    });

});

// letters.forEach((letter, index) => {

//   gsap.to(letter, {
//     scale: 2,
//     duration: 0.3 + Math.random(),
//     repeat: -1,
//     yoyo: true,
//     delay: Math.random() * 2,
//     ease: "sine.inOut"
//   });

// });