const nav = document.querySelector('.nav');
window.addEventListener('scroll', fixNav);

// FAQ and About Buttons
const toggles = document.querySelectorAll('.faq-toggle');
const abouts = document.querySelectorAll('.about-toggle');

toggles.forEach(toggle =>{
    toggle.addEventListener('click', () => {
        toggle.parentNode.classList.toggle('active');
    })
})

abouts.forEach(toggle =>{
    toggle.addEventListener('click', () => {
        toggle.parentNode.classList.toggle('active');
    })
})

function fixNav() {
    if(window.scrollY > nav.offsetHeight){
        nav.classList.add('active');
    }
    else{
        nav.classList.remove('active');
    }
}

