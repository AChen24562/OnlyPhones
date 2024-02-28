const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

// Navigation bar js
const nav = document.querySelector('.nav');
// Phone input js
const phone_input = document.getElementById('phone-model-input');

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

// Phone input js
phone_map = {
    "Samsung": ["Galaxy S21", "Galaxy S20", "Galaxy S10", "Galaxy Note 20", "Galaxy Note 10"],
    "Apple": ["iPhone 15","iPhone 14","iPhone 13","iPhone 12", "iPhone 11", "iPhone X", "iPhone 8", "iPhone 7"],
    "Google": ["Pixel 5", "Pixel 4", "Pixel 3", "Pixel 2"]
}
function filterModels(input) {
    let suggestions = phone_map['Apple'].filter(model => model.toLowerCase().includes(input.toLowerCase()));
    displaySuggestions(suggestions);
}

// Function to display the suggestions
function displaySuggestions(suggestions) {
    const suggestionContainer = document.getElementById('suggestion-container');
    // Clear previous suggestions
    suggestionContainer.innerHTML = '';
    if (suggestions.length === 0) {
        suggestionContainer.style.display = 'none';
        return;
    }
    // Create and append suggestions to the container
    suggestions.forEach(model => {
        let div = document.createElement('div');
        div.innerHTML = model;
        div.onclick = function() {
            document.getElementById('phone-model-input').value = this.innerText;
            suggestionContainer.style.display = 'none';
        };
        suggestionContainer.appendChild(div);
    });
    suggestionContainer.style.display = 'block';
}

// Close the suggestion container when the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('#phone-model-input')) {
        document.getElementById('suggestion-container').style.display = 'none';
    }
};