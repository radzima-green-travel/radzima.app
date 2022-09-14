import "../css/index.scss";

// import "./google";
import "./dialog";

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

    const appScreenshotCarousel = document.querySelector('.c-app__imgs');
    const appScreenshot = document.querySelector('.c-app__desktop-img');
    const screenshotList = document.getElementsByClassName('c-app__grid-cell');
    const mql = window.matchMedia('(max-width: 400px)');

    if (mql.matches) {
      appScreenshot.classList.add('u-hidden');
      appScreenshotCarousel.classList.remove('u-hidden');

      Array.prototype.slice.call(screenshotList).forEach((elem, i) => {
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

        Array.prototype.slice.call(screenshotList).forEach((elem) => (
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

          Array.prototype.slice.call(screenshotList).forEach((elem) => (
            elem !== this
              ? elem.classList.remove('c-app__grid-cell__selected')
              : elem.classList.add('c-app__grid-cell__selected')
          ));
        });
      });
    }
});
