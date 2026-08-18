/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 900);

    }, 900);

});


/* =========================
   MOBILE MENU
========================= */

const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

menu.addEventListener("click", () => {

    nav.classList.toggle("active");

});


document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


/* =========================
   SPIDER-MAN MOUSE PARALLAX
========================= */

const spider =
    document.querySelector(".spiderman");

const spiderArea =
    document.querySelector(".spiderman-area");


if (spider && spiderArea) {

    window.addEventListener("mousemove", (e) => {

        const x =
            (e.clientX / window.innerWidth - .5);

        const y =
            (e.clientY / window.innerHeight - .5);


        spider.style.transform = `
            translate(
                ${x * 18}px,
                ${y * 12}px
            )
            rotateY(${x * 8}deg)
            rotateX(${y * -5}deg)
        `;

    });

}


/* =========================
   MOVING WEB BACKGROUND
========================= */

const web =
    document.querySelector(".web-background");

window.addEventListener("mousemove", (e) => {

    if (!web) return;

    const x =
        (e.clientX / window.innerWidth - .5);

    const y =
        (e.clientY / window.innerHeight - .5);

    web.style.transform = `
        translate(
            ${x * 20}px,
            calc(-50% + ${y * 20}px)
        )
    `;

});


/* =========================
   PARTICLE MOVEMENT
========================= */

const particles =
    document.querySelectorAll(".particles i");

window.addEventListener("mousemove", (e) => {

    const x =
        e.clientX / window.innerWidth - .5;

    const y =
        e.clientY / window.innerHeight - .5;


    particles.forEach((particle, index) => {

        const strength =
            (index % 4 + 1) * 7;

        particle.style.transform = `
            translate(
                ${x * strength}px,
                ${y * strength}px
            )
        `;

    });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".section, .project-card, .skill-cards article"
    );


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: .12
        }

    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


/* =========================
   ACTIVE NAV
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("nav a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});
