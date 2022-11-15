const ACCORDIONS = [...document.querySelectorAll('.accordion .container')];

ACCORDIONS.forEach((accordion) => {
    accordion.addEventListener('click', (event) => {
        accordion.classList.toggle('is-active');
    });
});
