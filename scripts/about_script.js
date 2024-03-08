const nav = document.querySelector('.nav');


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



