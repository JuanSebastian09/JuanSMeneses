/* =========================================
   ELEMENTOS DEL MENÚ
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");
const navLinks = document.querySelectorAll(".nav-link");


/* =========================================
   MENÚ DE NAVEGACIÓN
========================================= */

menuToggle.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("open");

    menuToggle.classList.toggle("open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));

});


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuToggle.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        closeProjectPage(false);

    });

});


/* =========================================
   AÑO AUTOMÁTICO
========================================= */

document.getElementById("current-year").textContent =
    new Date().getFullYear();


/* =========================================
   BASE DE DATOS DE PROYECTOS
========================================= */

/*
    PARA AGREGAR UN PROYECTO:

    1. Copia un objeto completo de esta lista.
    2. Pégalo después del anterior y sepáralo con una coma.
    3. Cambia el título, descripción y demás información.
    4. Guarda su imagen en img/proyectos/.
    5. Escribe la ruta correcta en la propiedad image.

    No necesitas modificar el HTML para agregar proyectos.
*/

const projects = [
    {
        id: 1,
        title: "GasShield 5LP: Shield de monitoreo de gases",
        category: "INSTRUMENTACIÓN Y SISTEMAS EMBEBIDOS",
        image: "img/proyectos/gasshield/gasshield-01-prototipo.png",
        description: "Diseño de una tarjeta de expansión para PSoC 5LP orientada al monitoreo preventivo de gases durante procesos de calcinación en laboratorio.",
        fullDescription: "GasShield 5LP es una tarjeta de expansión desarrollada para la plataforma PSoC 5LP (CY8CKIT-059). El proyecto busca facilitar el monitoreo preventivo de gases mediante sensores de la familia MQ, con indicación visual y sonora ante las condiciones detectadas. El trabajo partió de un producto mínimo viable enfocado en monóxido de carbono (CO) y evolucionó hacia dos propuestas de diseño de una tarjeta con dos canales de sensado.",
        objective: "Diseñar una tarjeta de expansión compatible con el PSoC 5LP que permita acondicionar y leer sensores de gases, controlar sus etapas de calentamiento cuando corresponda y comunicar las mediciones mediante indicadores visuales, alarma sonora e interfaces de expansión.",
        technologies: [
            "PSoC 5LP (CY8CKIT-059)",
            "PSoC Creator",
            "Lenguaje C",
            "Sensores MQ-7 y MQ-2–MQ-9",
            "ADC Delta-Sigma de 12 bits",
            "UART 115200 baudios",
            "MOSFET AO3400A",
            "EasyEDA",
            "Diseño de PCB de dos capas",
            "Fresado CNC"
        ],
        development: `El PMV se centró en el sensor MQ-7 para la detección de CO. Su ciclo de calentamiento alterna una fase alta de 5 V durante 60 s y una fase baja cercana a 1,4 V durante 90 s. En la primera implementación se utilizó un transistor 2N2222 para controlar el calentamiento. El firmware, desarrollado en C mediante PSoC Creator, incorpora lectura con ADC Delta-Sigma de 12 bits, comunicación UART a 115200 baudios y temporización mediante interrupciones.

A partir del PMV se planteó GasShield 2.0, con dos canales de sensores, dos semáforos indicadores, buzzer, conector para pantalla LCD por I2C, selector DEMO/NORMAL y conexión al kit PSoC. Posteriormente se propuso GasShield 2.1 como una alternativa de menor costo, simplificando la alimentación y algunos componentes sin eliminar las funciones principales previstas. Las versiones 2.0 y 2.1 corresponden a diseños y verificaciones digitales; su fabricación y validación física quedaron pendientes.`,
        results: `El PMV fue fabricado mediante fresado CNC y probado en protoboard y PCB. Se midieron 4,59 V y 140,2 mA en la fase alta del calentador, y 1,39 V y 47,5 mA en la fase baja. La salida del sensor pasó de 1,945 V en aire limpio a 3,698 V ante humo, un incremento aproximado del 90 %. En una prueba con humo de papel, la indicación cambió de verde a rojo en aproximadamente 10 s y regresó a verde al dispersarse el humo. También se verificó la indicación de falla por desconexión del sensor.

En la revisión digital, las versiones 2.0 y 2.1 alcanzaron ERC sin errores y DRC con cero errores. La cotización comparativa de PCB fue de USD 29,98 para 2.0 y USD 15,65 para 2.1, sin incluir envío ni componentes THT. Estos resultados no equivalen a una validación física de las nuevas versiones. Los valores de concentración son indicativos y no constituyen mediciones certificadas.`,
        gallery: [
            {
                image: "gasshield-01-prototipo.png",
                caption: "Prototipo inicial"
            },
            {
                image: "gasshield-02-diseno-inicial.png",
                caption: "Diseño inicial"
            },
            {
                image: "gasshield-03-pcb-v20.png",
                caption: "Diseño de PCB · versión 2.0"
            },
            {
                image: "gasshield-04-ruteo.png",
                caption: "Distribución y ruteo de pistas"
            },
            {
                image: "gasshield-05-pcb-v21.png",
                caption: "Diseño de PCB · versión 2.1"
            },
            {
                image: "gasshield-06-prueba-sensor.png",
                caption: "Pruebas del sensor"
            },
            {
                image: "gasshield-07-prueba-alertas.png",
                caption: "Verificación de alertas"
            },
            {
                image: "gasshield-08-mach3.png",
                caption: "Preparación del fresado CNC"
            },
            {
                image: "gasshield-09-fresado.png",
                caption: "Proceso de fresado"
            },
            {
                image: "gasshield-10-muestreo-inicial.png",
                caption: "Muestreo inicial"
            },
            {
                image: "gasshield-11-muestreo-final.png",
                caption: "Muestreo final"
            }
        ]
    }
];


/* =========================================
   ELEMENTOS DEL CARRUSEL
========================================= */

const projectsSection = document.getElementById("proyectos");

const projectsTrack = document.getElementById("projects-track");

const projectsPrev = document.getElementById("projects-prev");

const projectsNext = document.getElementById("projects-next");

const projectCounter = document.getElementById("project-counter");

const carouselIndicators = document.getElementById("carousel-indicators");

const projectEmpty = document.getElementById("project-empty");

let currentProject = 0;


/* =========================================
   GENERAR TARJETAS DEL CARRUSEL
========================================= */

function renderProjects() {

    projectsTrack.replaceChildren();

    carouselIndicators.replaceChildren();


    // COMPROBAR SI EXISTEN PROYECTOS

    if (projects.length === 0) {

        projectEmpty.hidden = false;

        projectsPrev.disabled = true;

        projectsNext.disabled = true;

        projectCounter.textContent = "0 proyectos";

        return;

    }


    projectEmpty.hidden = true;


    // CREAR CADA PROYECTO

    projects.forEach((project, index) => {

        const slide = document.createElement("div");

        slide.className = "project-slide";


        const card = document.createElement("article");

        card.className = "project-card";


        /* IMAGEN */

        const imageContainer = document.createElement("div");

        imageContainer.className = "project-image";


        const image = document.createElement("img");

        image.src = project.image;

        image.alt = project.title;

        image.loading = "lazy";


        image.onerror = () => {

            imageContainer.style.background = "#DCE9ED";

            image.style.display = "none";

        };


        const tag = document.createElement("span");

        tag.className = "project-tag";

        tag.textContent = project.category;


        imageContainer.append(image, tag);


        /* INFORMACIÓN */

        const info = document.createElement("div");

        info.className = "project-info";


        const number = document.createElement("span");

        number.className = "project-number";

        number.textContent =
            `PROYECTO ${String(index + 1).padStart(2, "0")}`;


        const title = document.createElement("h3");

        title.textContent = project.title;


        const description = document.createElement("p");

        description.textContent = project.description;


        /* BOTÓN CONOCER PROYECTO */

        const button = document.createElement("button");

        button.className = "project-link";

        button.type = "button";

        button.innerHTML =
            'Conocer proyecto <i class="fas fa-arrow-right"></i>';


        button.addEventListener("click", () => {

            openProjectPage(project);

        });


        info.append(number, title, description, button);

        card.append(imageContainer, info);

        slide.appendChild(card);

        projectsTrack.appendChild(slide);


        /* INDICADORES */

        const dot = document.createElement("button");

        dot.className = "carousel-dot";

        dot.type = "button";

        dot.setAttribute(
            "aria-label",
            `Mostrar proyecto ${index + 1}`
        );


        dot.addEventListener("click", () => {

            currentProject = index;

            updateCarousel();

        });


        carouselIndicators.appendChild(dot);

    });


    currentProject = 0;

    updateCarousel();

}


/* =========================================
   ACTUALIZAR CARRUSEL
========================================= */

function updateCarousel() {

    if (projects.length === 0) {

        return;

    }


    projectsTrack.style.transform =
        `translateX(-${currentProject * 100}%)`;


    projectCounter.textContent =
        `Proyecto ${currentProject + 1} de ${projects.length}`;


    const dots =
        carouselIndicators.querySelectorAll(".carousel-dot");


    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentProject
        );

    });


    projectsPrev.disabled =
        projects.length <= 1 || currentProject === 0;


    projectsNext.disabled =
        projects.length <= 1 ||
        currentProject === projects.length - 1;

}


/* =========================================
   BOTÓN PROYECTO ANTERIOR
========================================= */

projectsPrev.addEventListener("click", () => {

    if (currentProject > 0) {

        currentProject--;

        updateCarousel();

    }

});


/* =========================================
   BOTÓN PROYECTO SIGUIENTE
========================================= */

projectsNext.addEventListener("click", () => {

    if (currentProject < projects.length - 1) {

        currentProject++;

        updateCarousel();

    }

});


/* =========================================
   ELEMENTOS DE LA VISTA DEL PROYECTO
========================================= */

const projectDetailSection =
    document.getElementById("project-detail");


const detailCategory =
    document.getElementById("detail-category");


const detailTitle =
    document.getElementById("detail-title");


const detailDescription =
    document.getElementById("detail-description");


const detailImage =
    document.getElementById("detail-image");


const detailFullDescription =
    document.getElementById("detail-full-description");


const detailObjective =
    document.getElementById("detail-objective");


const detailTechnologies =
    document.getElementById("detail-technologies");


const detailDevelopment =
    document.getElementById("detail-development");


const detailResults =
    document.getElementById("detail-results");

const detailGallery =
    document.getElementById("detail-gallery");


/* =========================================
   ABRIR INFORMACIÓN DE UN PROYECTO
========================================= */

function openProjectPage(project) {

    if (!project) {

        return;

    }


    /* INFORMACIÓN PRINCIPAL */

    detailCategory.textContent =
        project.category || "";


    detailTitle.textContent =
        project.title || "";


    detailDescription.textContent =
        project.description || "";


    /* IMAGEN DEL PROYECTO */

    detailImage.style.display = "block";

    detailImage.src = project.image || "";

    detailImage.alt = project.title || "Imagen del proyecto";


    detailImage.onerror = () => {

        detailImage.style.display = "none";

    };


    /* DESCRIPCIÓN COMPLETA */

    detailFullDescription.textContent =
        project.fullDescription || project.description || "";


    /* OBJETIVOS */

    detailObjective.textContent =
        project.objective || "";


    /* DESARROLLO */

    detailDevelopment.textContent =
        project.development || "";


    /* RESULTADOS */

    detailResults.textContent =
        project.results || "";


    /* GALERÍA FOTOGRÁFICA DEL PROYECTO */

    if (detailGallery) {

        detailGallery.replaceChildren();

        (project.gallery || []).forEach((photo, index) => {

            const figure = document.createElement("figure");

            figure.className = "project-gallery-item";


            const image = document.createElement("img");

            image.src =
                `img/proyectos/gasshield/${photo.image}`;

            image.alt =
                photo.caption ||
                `Fotografía ${index + 1} de ${project.title}`;

            image.loading = "lazy";


            const caption = document.createElement("figcaption");

            caption.innerHTML =
                `<span>${String(index + 1).padStart(2, "0")}</span> ${photo.caption || "Registro del proyecto"}`;


            figure.append(image, caption);

            detailGallery.appendChild(figure);

        });

    }


    /* =====================================
       GENERAR COMPONENTES Y TECNOLOGÍAS
    ===================================== */

    detailTechnologies.replaceChildren();


    (project.technologies || []).forEach((technology) => {

        const tag = document.createElement("span");

        tag.className = "technology-tag";

        tag.textContent = technology;

        detailTechnologies.appendChild(tag);

    });


    /* =====================================
       CAMBIAR A LA VISTA EXCLUSIVA
    ===================================== */

    projectsSection.hidden = true;

    projectDetailSection.hidden = false;


    /*
        Esta clase activa las reglas CSS que ocultan:
        - Encabezado y menú.
        - Inicio.
        - Sobre mí.
        - Carrusel de proyectos.
        - Equipo.
        - Contacto.
        - Pie de página.

        La única sección visible será project-detail.
    */

    document.body.classList.add("project-view-active");


    /* QUITAR ELEMENTO ACTIVO DEL MENÚ */

    navLinks.forEach((link) => {

        link.classList.remove("active");

    });


    /* CERRAR MENÚ MÓVIL */

    navigation.classList.remove("open");

    menuToggle.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");


    /* SUBIR AL INICIO */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   CERRAR PROYECTO Y VOLVER AL CARRUSEL
========================================= */

function closeProjectPage(shouldScroll = true) {

    if (projectDetailSection.hidden) {

        return;

    }


    /* QUITAR MODO DE VISTA INDIVIDUAL */

    document.body.classList.remove("project-view-active");


    /* OCULTAR DETALLE */

    projectDetailSection.hidden = true;


    /* MOSTRAR CARRUSEL */

    projectsSection.hidden = false;


    /* REGRESAR A PROYECTOS */

    if (shouldScroll) {

        window.scrollTo({

            top: projectsSection.offsetTop - 80,

            behavior: "smooth"

        });

    }

}


/* =========================================
   BOTÓN SUPERIOR: VOLVER A PROYECTOS
========================================= */

document.getElementById("back-to-projects").addEventListener(
    "click",
    () => {

        closeProjectPage(true);

    }
);


/* =========================================
   BOTÓN INFERIOR: VOLVER A PROYECTOS
========================================= */

document.getElementById("back-to-projects-bottom").addEventListener(
    "click",
    () => {

        closeProjectPage(true);

    }
);


/* =========================================
   MENÚ ACTIVO SEGÚN SECCIÓN VISIBLE
========================================= */

const observedSections = document.querySelectorAll(
    "main section[id]:not(#project-detail)"
);


const sectionObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting && !entry.target.hidden) {

                const sectionId = entry.target.id;


                navLinks.forEach((link) => {

                    link.classList.toggle(

                        "active",

                        link.getAttribute("href") === `#${sectionId}`

                    );

                });

            }

        });

    },

    {

        threshold: 0.35

    }

);


observedSections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================
   INICIALIZAR CARRUSEL
========================================= */

renderProjects();


/* =========================================
   FORMULARIO DE CONTACTO
========================================= */

/*
    El formulario utiliza FormSubmit.

    La dirección de destino y la configuración
    están definidas en index.html.

    Recuerda activar el correo mediante el primer
    mensaje de confirmación que envía FormSubmit.
*/