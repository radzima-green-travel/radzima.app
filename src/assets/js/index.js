import "../css/index.scss";

// import "./google";

document.addEventListener("DOMContentLoaded", () => {
    const navBtn = document.querySelector(".header__nav-btn");
    if (navBtn) {
        navBtn.addEventListener('click', function(e){
            document.body.classList.toggle('mobile-nav-opened');
        });
    }
    const langLinks = document.querySelectorAll(".c-lang a");
    [].forEach.call(langLinks, (link) => {
        link.addEventListener('click', () => {
            window.localStorage.setItem('locale', link.getAttribute('href').substring(1));
        });
    });
});
