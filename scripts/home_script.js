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
let expanded = 0;

for (let i = 0; i < panels.length; i++) {
    let panel = panels[i];
    panel.addEventListener('click', () => {
        removeActiveClasses(0);
        panel.classList.add('active');
        expanded = i;
        updateStaticImages();
    })
}

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    })
}

// Apple -> 0, Samsung -> 1, Google -> 2
const recentListings = [
    ['../images/phones/Apple/iphone_15.png','../images/phones/Apple/iphone_14.png','../images/phones/Apple/iphone_13.png','../images/phones/Apple/iphone_12.png'],
    ['../images/phones/Samsung/galaxy_S24_ultra.png','../images/phones/Samsung/galaxy_S22_ultra.png','../images/phones/Samsung/galaxy_Zfold5.png','../images/phones/Samsung/galaxy_Zfold4.png'],
    ['../images/phones/Google/pixel_8.png','../images/phones/Google/pixel_7.png','../images/phones/Google/pixel_6.png','../images/phones/Google/pixel_5.png']
]
const listingNames = [
    ['iPhone 15','iPhone 14','iPhone 13','iPhone 12'],
    ['Galaxy S24 Ultra','Galaxy S22 Ultra','Galaxy Z Fold 5','Galaxy Z Fold 4'],
    ['Pixel 8','Pixel 7','Pixel 6','Pixel 5']
]

const staticImages = document.querySelectorAll(".branded")

// Whenever you click on an expanding image, it will update these phone images to
// match the brand of the presently expanded/focused brand.
function updateStaticImages() {
    for (let i = 0; i < staticImages.length; i++) {
        staticImages[i].innerHTML = "<img src="+ recentListings[expanded][i] +">" +
            "<h4>"+listingNames[expanded][i]+"</h4>";
    }
}

updateStaticImages();