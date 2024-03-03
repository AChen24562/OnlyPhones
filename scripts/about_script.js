const nav = document.querySelector('.nav');
window.addEventListener('scroll', fixNav);

// FAQ Buttons
const toggles = document.querySelectorAll('.faq-toggle');

toggles.forEach(toggle =>{
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