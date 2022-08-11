import "../css/index.scss";

// import "./google";

document.addEventListener("DOMContentLoaded", () => {
    const navBtn = document.querySelector(".header__nav-btn");
    if (navBtn) {
        navBtn.addEventListener('click', function(e){
            document.body.classList.toggle('mobile-nav-opened');
        });
    }

    const currentLang = document.querySelector('html').getAttribute('lang');
    if (currentLang) {
        window.localStorage.setItem('locale', currentLang);
    }

    const feedbackCarousel = document.querySelector('.c-feedbacks__items');
    if (feedbackCarousel && typeof Swiper === 'function') {
        new Swiper(feedbackCarousel, {
            slidesPerView: 1,
            spaceBetween: 21,
            pagination: {
              el: '.c-feedbacks__pagination',
              dynamicBullets: true,
            },
            navigation: {
                nextEl: '.c-feedbacks__next',
                prevEl: '.c-feedbacks__prev',
            },
            breakpoints: {
                1024: {
                  slidesPerView: 3,
                },
                744: {
                  slidesPerView: 2,
                },
            },
        });
    }
});
