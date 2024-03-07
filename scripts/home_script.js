const nav = document.querySelector('.nav');
window.addEventListener('scroll', fixNav);

function fixNav() {
    if(window.scrollY > nav.offsetHeight+150){
        nav.classList.add('active');
    }
    else{
        nav.classList.remove('active');
    }
}

const textElement = document.getElementById('autotext-container');
const text = 'Find A New Home For Your Phone!';
const speed = 60;

let index = 1;

writeText();

function writeText() {
    textElement.innerText = text.slice(0, index);

    index++;

    if (index <= text.length) {
        setTimeout(writeText, speed);  
    }
}
