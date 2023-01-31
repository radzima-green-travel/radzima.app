import "../css/index.scss";

// import "./google";
import "./dialog";

document.addEventListener("DOMContentLoaded", () => {
    const langsSwt = document.querySelector('.c-lang-selector');
    if (langsSwt) {
        const langsBtn = langsSwt.querySelector('.c-lang-selector__current');
        langsBtn.addEventListener('click', function(e){
          langsSwt.classList.toggle('is-active');
        });
        document.body.addEventListener('click', function(e){
          if(!e.target.closest('.c-lang-selector')){
            langsSwt.classList.remove('is-active');
          }
        });
    }

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
            spaceBetween: 32,
            pagination: {
              el: '.c-feedbacks__pagination',
              dynamicBullets: true,
            },
            navigation: {
                nextEl: '.c-feedbacks__next',
                prevEl: '.c-feedbacks__prev',
            },
            breakpoints: {
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 32,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                744: {
                  slidesPerView: 2,
                },
            },
        });
    }
    const feedbackItems = document.querySelectorAll('.c-feedbacks__item');
    [].forEach.call(feedbackItems, (item) => {
      const body = item.querySelector('.c-feedbacks__item-body');
      const bodyCopy = body.cloneNode(true);
      bodyCopy.classList.add('not-limited');
      item.appendChild(bodyCopy);

      if(body.offsetHeight < bodyCopy.offsetHeight){
        item.querySelector('.c-feedbacks__btn-full').addEventListener('click', (e) => {
          window.openDialog({
            html: item.innerHTML,
            title: e.target.getAttribute('data-title'),
            className: 'dialog-full-feedback',
            overlayClose: false,
            back: e.target,
          });
        });
      } else {
        item.querySelector('.c-feedbacks__btn-full').remove();
      }
      bodyCopy.remove();
    });

    (() => {
      const appScreenshotCarousel = document.querySelector('.c-app__imgs');
      if (appScreenshotCarousel && typeof Swiper === 'function') {
        const buttons = document.querySelectorAll('.c-app__grid-cell');
        new Swiper(appScreenshotCarousel, {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          pagination: {
            el: ".c-app__pagination",
          },
          on: {
            init: function (swiper) {
              [].forEach.call(buttons, function(elem) {
                elem.addEventListener('click', function() {
                  swiper.slideTo(Number(elem.getAttribute('data-index')) + 1);
                });
              });
            },
            slideChange: function (swiper) {
              document.querySelector('.c-app__grid-cell__selected')?.classList.remove('c-app__grid-cell__selected');
              buttons[swiper.realIndex]?.classList.add('c-app__grid-cell__selected');
            },
          },
        });
      }
    })();
});
