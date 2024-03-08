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
const spanStart = text.indexOf('New');
const spanEnd = text.indexOf(' For');

let index = 1;

writeText();

function writeText() {
    let autoText = text.slice(0, index);
    if (index >= spanEnd) {
        let first = autoText.slice(0,spanStart);
        let middle = autoText.slice(spanStart, spanStart+ spanEnd-spanStart);
        let last = autoText.slice(spanEnd);
        autoText = first + "<span>" + middle + "</span>" + last;
    } else if (index >= spanStart) {
        let first = autoText.slice(0,spanStart);
        let last = autoText.slice(spanStart);
        autoText = first + "<span>" + last + "</span>";
    }
    textElement.innerHTML = autoText;


    index++;

    if (index <= text.length) {
        setTimeout(writeText, speed);
    }
}

const panels = document.querySelectorAll(".panel")

panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        removeActiveClasses(0);
        panel.classList.add('active');
    })
})

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    })
}