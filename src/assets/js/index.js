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

    const appScreenshotCarousel = document.querySelector('.c-app__imgs');
    const appScreenshot = document.querySelector('.c-app__desktop-img');
    const screenshotList = document.getElementsByClassName('c-app__grid-cell');
    const mql = window.matchMedia('(max-width: 400px)');

    if (mql.matches) {
      appScreenshot.classList.add('u-hidden');
      appScreenshotCarousel.classList.remove('u-hidden');

      Array.from(screenshotList).forEach((elem, i) => {
        elem.classList.remove('c-app__grid-cell__selected');
        if (i !== 0) {
          elem.classList.add('u-hidden');
        }
      });

      if (appScreenshotCarousel && typeof Swiper === 'function') {
        new Swiper(appScreenshotCarousel, {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
            pagination: {
              el: ".c-app__pagination",
            },
        });
      }

      appScreenshotCarousel.addEventListener('touchend', function() {
        const currentImg = document.querySelector('.swiper-slide-active');
        const currentDescription = document.getElementById(`description-${currentImg.firstElementChild.id}`);

        Array.from(screenshotList).forEach((elem) => (
          elem !== currentDescription
            ? elem.classList.add('u-hidden')
            : elem.classList.remove('u-hidden')
        ));
      });
    } else {
      [].forEach.call(document.getElementsByClassName('c-app__grid-cell'), function(elem) {
        elem.addEventListener('click', function() {
          const path = `../../images/${this.id.replace('description-','')}.png`;
          const img = document.getElementById('screenshot-app');

          img.src = path;

          Array.from(screenshotList).forEach((elem) => (
            elem !== this
              ? elem.classList.remove('c-app__grid-cell__selected')
              : elem.classList.add('c-app__grid-cell__selected')
          ));
        });
      });
    }
});
