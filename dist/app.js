// window.addEventListener('scroll', function () {
//     var header = document.querySelector('nav');
//     header.classList.toggle('sticky', window.scrollY > 0);
// });

// function toggleMenu() {
//     var menuToggle = document.querySelector('.toggle');
//     var menu = document.querySelector('.menu');
//     menuToggle.classList.toggle('active');
//     menu.classList.toggle('active');
// }





var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    effect: "creative",

    creativeEffect: {
        prev: {
            shadow: true,
            origin: "left center",
            translate: ["-5%", 0, -200],
            rotate: [0, 100, 0],
        },
        next: {
            origin: "right center",
            translate: ["5%", 0, -200],
            rotate: [0, -100, 0],
        },
    },
});



var clientSwiper = new Swiper(".client-swiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});




const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    item.querySelector('.accordion-header').addEventListener('click', function () {
        const content = this.nextElementSibling;
        if (content.classList.contains('active')) {
            content.classList.remove('active');
        } else {
            const openItem = document.querySelector('.accordion-content.active');
            if (openItem) {
                openItem.classList.remove('active');
            }
            content.classList.add('active');
        }
    });
});



// toggle function
// const toggleFunc = (className, className2) => {
//     const main = document.querySelector(className);
//     const collapse = document.querySelector(className2);

//     main.addEventListener("click", function () {
//         main.classList.toggle() = "active";
//         collapse.classList.toggle() = "active";
//     });
// }



// console.log(accordionActive);

// toggleFunc(".accordion", ".accordion-active");


// const accordion = document.querySelector("#accordion-heading");
// const accordionActive = document.querySelector("#accordion-collapse");



// accordion.addEventListener("click", function () {
//     accordion.classList.toggle("active");
//     accordionActive.classList.toggle("active");
// });


// function toggleContent(item) {
//     const content = item.nextElementSibling;
//     content.classList.toggle('hidden');
//     content.classList.toggle('h-auto');
// }





// anime js 

function fitElementToParent(el, padding) {
    var timeout = null;
    function resize() {
        if (timeout) clearTimeout(timeout);
        anime.set(el, { scale: 1 });
        var pad = padding || 0;
        var parentEl = el.parentNode;
        var elOffsetWidth = el.offsetWidth - pad;
        var parentOffsetWidth = parentEl.offsetWidth;
        var ratio = parentOffsetWidth / elOffsetWidth;
        timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
    }
    resize();
    window.addEventListener('resize', resize);
}

var sphereAnimation = (function () {

    var sphereEl = document.querySelector('.sphere-animation');
    var spherePathEls = sphereEl.querySelectorAll('.sphere path');
    var pathLength = spherePathEls.length;
    var hasStarted = false;
    var aimations = [];

    fitElementToParent(sphereEl);

    var breathAnimation = anime({
        begin: function () {
            for (var i = 0; i < pathLength; i++) {
                aimations.push(anime({
                    targets: spherePathEls[i],
                    stroke: { value: ['rgba(255,255,255,1)', 'rgba(255,255,255,.75)'], duration: 500 },
                    translateX: [2, -4],
                    translateY: [2, -4],
                    easing: 'easeOutQuad',
                    autoplay: false
                }));
            }
        },
        update: function (ins) {
            aimations.forEach(function (animation, i) {
                var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
                animation.seek(animation.duration * percent);
            });
        },
        duration: Infinity,
        autoplay: false
    });

    var introAnimation = anime.timeline({
        autoplay: false
    })
        .add({
            targets: spherePathEls,
            strokeDashoffset: {
                value: [anime.setDashoffset, 0],
                duration: 3900,
                easing: 'easeInOutCirc',
                delay: anime.stagger(190, { direction: 'reverse' })
            },
            duration: 2000,
            delay: anime.stagger(60, { direction: 'reverse' }),
            easing: 'linear'
        }, 0);

    var shadowAnimation = anime({
        targets: '#sphereGradient',
        x1: '25%',
        x2: '25%',
        y1: '0%',
        y2: '75%',
        duration: 30000,
        easing: 'easeOutQuint',
        autoplay: false
    }, 0);

    function init() {
        introAnimation.play();
        breathAnimation.play();
        shadowAnimation.play();
    }

    init();

})();


