import "../css/index.scss";

// import "./google";

document.addEventListener("DOMContentLoaded", () => {
    const navBtn = document.querySelector(".header__nav-btn");
    if (navBtn) {
        navBtn.addEventListener('click', function(e){
            document.body.classList.toggle('mobile-nav-opened');
        });
    }

    const extLinks = document.querySelectorAll("a");
    [].forEach.call(extLinks, (a) => {
        const link = a.getAttribute("href");
        if (link.indexOf("http") === 0) {
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener");
        }
    });

});
