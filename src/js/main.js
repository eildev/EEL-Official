// cursor animation 

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // cursorOutline.style.left = `${posX}px`;
    // cursorOutline.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" })
})




// globe animation 
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




// accordion 
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




// swiper 
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