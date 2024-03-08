const nav = document.querySelector('.nav');
window.addEventListener('scroll', fixNav);

// Nav

// FAQ and About Containers
const faqContainers = document.querySelectorAll('.faq');
const aboutContainers = document.querySelectorAll('.about');

faqContainers.forEach(container => {
    container.addEventListener('click', () => {
        container.classList.toggle('active');
    })
});

aboutContainers.forEach(container => {
    container.addEventListener('click', () => {
        container.classList.toggle('active');
    })
});

function fixNav() {
    if(window.scrollY > nav.offsetHeight + 50){
        nav.classList.add('active');
    } else {
        nav.classList.remove('active');
    }
}


toggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

abouts.forEach(about => {
    about.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});