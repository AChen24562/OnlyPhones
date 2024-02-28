const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

// Navigation bar js
const nav = document.querySelector('.nav');
// Phone input js
const phone_input = document.getElementById('phone-model-input');
const suggestion_container = document.getElementById('suggestion-container');
window.addEventListener('scroll', fixNav);


let currentActive = 1;

next.addEventListener('click', ()=>{
    currentActive ++;
    if(currentActive > circles.length){
        currentActive = circles.length;

    }
    update();
    // console.log(currentActive);
})

prev.addEventListener('click', ()=>{
    currentActive --;
    if(currentActive < 1){
        currentActive = 1;
    }
    update();
})

function update(){
    circles.forEach((circle, idx)=>{
        if(idx < currentActive){
            circle.classList.add('active');
        }
        else{
            circle.classList.remove('active');
        }
    })
    
    const actives = document.querySelectorAll('.active');
    progress.style.width = ((actives.length-2)/(circles.length-1))*100 +'%';
    console.log(actives.length-1)
    console.log(circles.length-1)
    console.log(((actives.length-1)/(circles.length))*100 +'%')
    if(currentActive === 1){
        prev.disabled =true;
    }
    else if(currentActive === circles.length){
        next.disabled = true;
    }
    else{
        prev.disabled = false;
        next.disabled = false;
    }
}

// Navigation bar js
function fixNav() {
    if(window.scrollY > nav.offsetHeight+150){
        nav.classList.add('active');
    }
    else{
        nav.classList.remove('active');
    }
}
// End nav bar

// Phone input js
phone_map = {
    "Samsung": ["Galaxy S21", "Galaxy S20", "Galaxy S10", "Galaxy Note 20", "Galaxy Note 10"],
    "Apple": ["iPhone 15","iPhone 14","iPhone 13","iPhone 12", "iPhone 11", "iPhone X", "iPhone 8", "iPhone 7"],
    "Google": ["Pixel 5", "Pixel 4", "Pixel 3", "Pixel 2"]
}
const phoneImages = {
    'iPhone 15': '../images/phones/Apple/iphone_15.png',
    'iPhone 14': '../images/phones/Apple/iphone_14.png',
}
function updatePhoneImage(model) {
    const phoneImageElement = document.getElementById('phone-image');
    const imageUrl = phoneImages[model];

    if (imageUrl) {
        phoneImageElement.src = imageUrl;
        phoneImageElement.style.display = 'block';

        setTimeout( () =>{
            phoneImageElement.style.opacity = 1;
        })
    } else {
        phoneImageElement.style.opacity = 0;
        setTimeout(() => {
            phoneImageElement.style.display = 'none';
        }, 400);
    }
}
phone_input.addEventListener('input', ()=>{
    let input_val = phone_input.value.toLowerCase();

    suggestion_container.innerHTML = '';
    suggestion_container.style.display = 'none';

    if (input_val.length > 0) {
        let suggestions = [];
        suggestions = suggestions.concat(phone_map['Apple'].filter(model => model.toLowerCase().startsWith(input_val)));

        if (suggestions.length > 0) {
            suggestion_container.style.display = 'block';
            suggestions.forEach(suggestion => {
                let suggestionDiv = document.createElement('div');
                suggestionDiv.textContent = suggestion;
                suggestionDiv.addEventListener('click', function() {
                    phone_input.value = suggestion;
                    suggestion_container.innerHTML = '';
                    suggestion_container.style.display = 'none'; 
                });
                suggestion_container.appendChild(suggestionDiv);
            });
        }
        suggestion_container.addEventListener('click', function(event) {
            const clickedElement = event.target;

            if (clickedElement.tagName.toLowerCase() === 'div') {
                const selectedModel = clickedElement.textContent;
                phone_input.value = selectedModel;
                suggestion_container.innerHTML = '';
                suggestion_container.style.display = 'none';

                updatePhoneImage(selectedModel);
            }
        });
    }
});
window.onclick = function(event) {
    if (!event.target.matches('#phone-model-input')) {
        document.getElementById('suggestion-container').style.display = 'none';
    }
};
// End phone input
window.onload = function() {
    document.querySelector('.sell-instructions').style.opacity = "1";
    document.querySelector('.sell-instructions > p').style.opacity = "1";
    document.querySelector('.step-1').style.opacity = "1";
    document.querySelector('.step-2').style.opacity = "1";
    document.querySelector('.step-3').style.opacity = "1";
    // document.querySelector('.image_phone_container').style.opacity = "1";
};
