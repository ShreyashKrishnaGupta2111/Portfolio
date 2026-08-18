/* ================= LOADER ================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);

    }, 1200);

});


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


/* Close menu after clicking link */

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


/* ================= MOUSE SPIDER WEB ================= */

document.addEventListener("mousemove", (event) => {

    const dot = document.createElement("div");

    dot.style.position = "fixed";

    dot.style.left =
        event.clientX + "px";

    dot.style.top =
        event.clientY + "px";

    dot.style.width = "3px";

    dot.style.height = "3px";

    dot.style.background = "#e50914";

    dot.style.borderRadius = "50%";

    dot.style.pointerEvents = "none";

    dot.style.zIndex = "999";

    dot.style.boxShadow =
        "0 0 10px rgba(229,9,20,0.8)";

    document.body.appendChild(dot);


    setTimeout(() => {

        dot.style.transition = "0.6s";

        dot.style.opacity = "0";

        dot.style.transform = "scale(4)";

    }, 10);


    setTimeout(() => {

        dot.remove();

    }, 700);

});


/* ================= PROJECT HOVER ================= */

document.querySelectorAll(".project-card")
.forEach(card => {

    card.addEventListener("mousemove", (event) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -5;

        const rotateY =
            ((x / rect.width) - 0.5) * 5;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ================= CONSOLE EASTER EGG ================= */

console.log(
    "%c🕷 SHREYASH KRISHNA GUPTA",
    "color:#e50914;font-size:20px;font-weight:bold;"
);

console.log(
    "%cWith great code comes great responsibility.",
    "color:white;font-size:12px;"
);
