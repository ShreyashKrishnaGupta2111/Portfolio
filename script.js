import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.remove();

        }, 850);

    }, 900);

});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn?.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


/* =========================================
   CUSTOM CURSOR
========================================= */

const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");


window.addEventListener("mousemove", event => {

    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;

    ring.style.left = `${event.clientX}px`;
    ring.style.top = `${event.clientY}px`;

});


document
    .querySelectorAll("a, button, .skill-node, .project-card")
    .forEach(element => {

        element.addEventListener("mouseenter", () => {

            ring.classList.add("active");

        });

        element.addEventListener("mouseleave", () => {

            ring.classList.remove("active");

        });

    });



/* =========================================
   THREE.JS 3D HERO
========================================= */

const mount = document.getElementById("three-hero");


const scene = new THREE.Scene();

scene.fog = new THREE.FogExp2(
    0x040507,
    0.045
);


const camera = new THREE.PerspectiveCamera(

    35,

    mount.clientWidth / mount.clientHeight,

    0.1,

    100

);

camera.position.set(
    0,
    0.7,
    8
);


const renderer = new THREE.WebGLRenderer({

    antialias: true,

    alpha: true

});


renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    mount.clientWidth,
    mount.clientHeight
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.25;


mount.appendChild(renderer.domElement);


/* =========================================
   LIGHTS
========================================= */

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        1.4
    )
);


const redLight =
    new THREE.PointLight(
        0xe50914,
        22,
        18
    );

redLight.position.set(
    3,
    2,
    4
);

scene.add(redLight);


const blueLight =
    new THREE.PointLight(
        0x0878ff,
        18,
        16
    );

blueLight.position.set(
    -3,
    1,
    3
);

scene.add(blueLight);


const topLight =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

topLight.position.set(
    0,
    6,
    5
);

scene.add(topLight);


/* =========================================
   MATERIALS
========================================= */

const red =
    new THREE.MeshStandardMaterial({

        color: 0xc70812,

        metalness: .55,

        roughness: .3

    });


const blue =
    new THREE.MeshStandardMaterial({

        color: 0x063e9e,

        metalness: .5,

        roughness: .35

    });


const black =
    new THREE.MeshStandardMaterial({

        color: 0x07090d,

        metalness: .7,

        roughness: .22

    });


const white =
    new THREE.MeshBasicMaterial({

        color: 0xffffff

    });


/* =========================================
   HERO CHARACTER
========================================= */

const hero =
    new THREE.Group();

hero.rotation.y = -.18;

hero.position.set(
    0,
    -.4,
    0
);

scene.add(hero);


/* Capsule helper */

function capsule(
    radius,
    length,
    material
) {

    return new THREE.Mesh(

        new THREE.CapsuleGeometry(
            radius,
            length,
            8,
            16
        ),

        material

    );

}


/* Sphere helper */

function sphere(
    radius,
    material
) {

    return new THREE.Mesh(

        new THREE.SphereGeometry(
            radius,
            32,
            20
        ),

        material

    );

}


/* =========================================
   BODY
========================================= */

const torso =
    new THREE.Mesh(

        new THREE.CapsuleGeometry(
            .7,
            1.65,
            10,
            24
        ),

        red

    );

torso.scale.set(
    1,
    1,
    .72
);

torso.position.y = .2;

hero.add(torso);


/* =========================================
   PELVIS
========================================= */

const pelvis =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            .7,
            24,
            16
        ),

        blue

    );

pelvis.scale.set(
    1,
    .65,
    .72
);

pelvis.position.y = -.9;

hero.add(pelvis);


/* =========================================
   HEAD
========================================= */

const head =
    sphere(
        .52,
        black
    );

head.scale.set(
    .9,
    1.08,
    .88
);

head.position.y =
    1.55;

hero.add(head);


/* =========================================
   EYES
========================================= */

const eyeGeo =
    new THREE.SphereGeometry(
        .14,
        16,
        12
    );


const eye1 =
    new THREE.Mesh(
        eyeGeo,
        white
    );


const eye2 =
    new THREE.Mesh(
        eyeGeo,
        white
    );


eye1.scale.set(
    .55,
    1.6,
    .35
);

eye2.scale.copy(
    eye1.scale
);


eye1.position.set(
    -.22,
    1.62,
    .46
);

eye2.position.set(
    .22,
    1.62,
    .46
);


hero.add(
    eye1,
    eye2
);


/* =========================================
   CHEST SPIDER EMBLEM
========================================= */

const emblem =
    new THREE.Group();


const body =
    new THREE.Mesh(

        new THREE.CylinderGeometry(
            .10,
            .14,
            .62,
            12
        ),

        black

    );

body.rotation.z =
    Math.PI;


emblem.add(body);


for (
    let i = 0;
    i < 4;
    i++
) {

    const leg =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                .06,
                .45,
                .06
            ),

            black

        );

    leg.rotation.z =
        (i - 1.5) * .38;

    leg.position.x =
        (i - 1.5) * .13;

    leg.position.y =
        i < 2
            ? .18
            : -.18;

    emblem.add(leg);

}


emblem.position.set(
    0,
    .45,
    .52
);

emblem.scale.set(
    .7,
    .7,
    .7
);

hero.add(emblem);


/* =========================================
   ARMS
========================================= */

function addArm(side) {

    const shoulder =
        sphere(
            .34,
            red
        );

    shoulder.position.set(
        side * .78,
        .52,
        0
    );

    hero.add(shoulder);


    const upper =
        capsule(
            .19,
            .85,
            red
        );

    upper.position.set(
        side * 1.02,
        .02,
        .02
    );

    upper.rotation.z =
        side * -.72;

    hero.add(upper);


    const fore =
        capsule(
            .16,
            .85,
            blue
        );

    fore.position.set(
        side * 1.38,
        -.48,
        .15
    );

    fore.rotation.z =
        side * -1.02;

    hero.add(fore);


    const hand =
        sphere(
            .22,
            black
        );

    hand.position.set(
        side * 1.62,
        -.82,
        .23
    );

    hero.add(hand);

}


addArm(1);
addArm(-1);


/* =========================================
   LEGS
========================================= */

function addLeg(side) {

    const thigh =
        capsule(
            .25,
            .95,
            blue
        );

    thigh.position.set(
        side * .38,
        -1.45,
        0
    );

    thigh.rotation.z =
        side * .16;

    hero.add(thigh);


    const shin =
        capsule(
            .19,
            1,
            red
        );

    shin.position.set(
        side * .52,
        -2.25,
        .12
    );

    shin.rotation.z =
        side * -.1;

    hero.add(shin);


    const boot =
        capsule(
            .22,
            .45,
            black
        );

    boot.position.set(
        side * .58,
        -2.95,
        .25
    );

    boot.rotation.z =
        side * -.25;

    hero.add(boot);

}


addLeg(1);
addLeg(-1);


/* =========================================
   WEB
========================================= */

const webGroup =
    new THREE.Group();

scene.add(webGroup);


const webMaterial =
    new THREE.LineBasicMaterial({

        color: 0xffffff,

        transparent: true,

        opacity: .18

    });


function webLine(points) {

    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);

    const line =
        new THREE.Line(
            geometry,
            webMaterial
        );

    webGroup.add(line);

}


/* radial web */

for (
    let i = 0;
    i < 14;
    i++
) {

    const angle =
        (i / 14) *
        Math.PI *
        2;

    const points = [];

    for (
        let j = 0;
        j <= 20;
        j++
    ) {

        const r =
            j * .22;

        points.push(

            new THREE.Vector3(

                Math.cos(angle) * r,

                Math.sin(angle) * r + .2,

                -1.1

            )

        );

    }

    webLine(points);

}


/* circular web */

for (
    let ring = 1;
    ring < 5;
    ring++
) {

    const points = [];

    const r =
        ring * .55;

    for (
        let i = 0;
        i <= 80;
        i++
    ) {

        const a =
            (i / 80) *
            Math.PI *
            2;

        points.push(

            new THREE.Vector3(

                Math.cos(a) * r,

                Math.sin(a) * r + .2,

                -1.1

            )

        );

    }

    webLine(points);

}


/* =========================================
   PARTICLES
========================================= */

const particleCount =
    900;

const positions =
    new Float32Array(
        particleCount * 3
    );


for (
    let i = 0;
    i < particleCount;
    i++
) {

    positions[i * 3] =
        (Math.random() - .5) * 11;

    positions[i * 3 + 1] =
        (Math.random() - .5) * 9;

    positions[i * 3 + 2] =
        (Math.random() - .5) * 5;

}


const particleGeo =
    new THREE.BufferGeometry();

particleGeo.setAttribute(

    "position",

    new THREE.BufferAttribute(
        positions,
        3
    )

);


const particles =
    new THREE.Points(

        particleGeo,

        new THREE.PointsMaterial({

            color: 0xe50914,

            size: .018,

            transparent: true,

            opacity: .7

        })

    );


scene.add(particles);


/* =========================================
   MOUSE
========================================= */

const mouse = {

    x: 0,

    y: 0

};


const target = {

    x: 0,

    y: 0

};


window.addEventListener(
    "mousemove",
    event => {

        mouse.x =
            (event.clientX /
                window.innerWidth) *
            2 - 1;

        mouse.y =
            -(event.clientY /
                window.innerHeight) *
            2 + 1;

    }
);


/* =========================================
   ANIMATION
========================================= */

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const t =
        clock.getElapsedTime();


    target.x +=
        (mouse.x - target.x) *
        .035;

    target.y +=
        (mouse.y - target.y) *
        .035;


    hero.rotation.y =
        -.18 +
        target.x * .32;


    hero.rotation.x =
        target.y * .10;


    hero.position.y =
        -.4 +
        Math.sin(t * 1.4) * .06;


    particles.rotation.y =
        t * .015;


    particles.rotation.x =
        Math.sin(t * .1) * .04;


    webGroup.rotation.z =
        t * .02;


    redLight.position.x =
        3 +
        Math.sin(t) * 1.2;


    blueLight.position.x =
        -3 +
        Math.cos(t * .8) * 1.2;


    renderer.render(
        scene,
        camera
    );

}


animate();


/* =========================================
   RESIZE
========================================= */

window.addEventListener(
    "resize",
    () => {

        const width =
            mount.clientWidth;

        const height =
            mount.clientHeight;


        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height
        );


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

    }
);
