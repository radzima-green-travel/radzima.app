import "../css/index.scss";

// import "./google";

document.addEventListener("DOMContentLoaded", () => {
    const navBtn = document.querySelector(".header__nav-btn");
    if (navBtn) {
        navBtn.addEventListener('click', function(e){
            document.body.classList.toggle('mobile-nav-opened');
        });
    }

    const langSwitches = document.querySelectorAll('.c-lang');
    [].forEach.call(langSwitches, (langSwitch) => {
        langSwitch.addEventListener('click', function(e){
            if(e.target.closest('.c-lang__val')){
                langSwitch.classList.toggle('c-lang--opened');
            }
        });
        [].forEach.call(langSwitch.querySelectorAll('.c-lang__options a'), link => {
            const curr = link.getAttribute('href');
            link.setAttribute('href', curr.substring(0,3) + window.location.pathname.substring(3));
        });
    });


    const extLinks = document.querySelectorAll("a");
    [].forEach.call(extLinks, (a) => {
        const link = a.getAttribute("href");
        if (link.indexOf("http") === 0) {
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener");
        }
    });

});
