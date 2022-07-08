document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hostname === 'localhost') {
        return;
    }
    const id = 'YOUR_ID_HERE';

    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id='+id;
    script.async = true;
    document.body.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', id);
});
