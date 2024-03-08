const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const submit = document.getElementById('submit');
const circles = document.querySelectorAll('.circle');

// Navigation bar js
const nav = document.querySelector('.nav');
// Phone input js
const phone_input = document.getElementById('phone-model-input');
const suggestion_container = document.getElementById('suggestion-container');
window.addEventListener('scroll', fixNav);


let currentActive = 1;

// Navigation bar js

next.addEventListener('click', ()=>{
    currentActive ++;
    if(currentActive > circles.length){
        currentActive = circles.length;

    }
    if (next.textContent === 'Submit') {
        let unlocked = document.getElementById('phone-unlocked').value;
        unlocked === 'No' ? unlocked = false: unlocked = true;
        let carrier_lock = unlocked === false ? document.getElementById('phone-lock-company-show').textContent.split(' ')[2] : 'N/A';
        const data = {
            user: 'test_user',
            phone_model: document.getElementById('phone-model-input').value,
            capacity: document.getElementById('phone-capacity').value,
            wear: document.getElementById('phone-wear').value,
            unlocked: unlocked,
            carrier_lock: carrier_lock,
            price: document.getElementById('phone-price').value
        };
        console.log("Submitting data: ", data);

        // DB Logic
        // Send the data to the server using fetch API
        fetch('http://54.160.154.98:5000/submit', { // Server IP hosted on AWS
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                window.location.href = '../pages/homepage.html';
            })
            .catch((error) => {
                console.error('Error:', error);
                // if failed sending
            });

    } else {
        update();
    }
});

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
    if(currentActive === 1){
        document.querySelector('.sell-instructions').style.display = 'block';
        document.querySelector('.multi-choice-container').style.display = 'none';
        document.querySelector('.price-container').style.display = 'none';

    }
    else if(currentActive === 2){
        // Hide sell instructions and show multi-choice options
        document.querySelector('.sell-instructions').style.display = 'none';
        document.querySelector('.multi-choice-container').style.display = 'block';
        document.querySelector('.price-container').style.display = 'none';
        next.textContent = 'Next';

    } else if (currentActive === 3){

        document.querySelector('.sell-instructions').style.display = 'none';
        document.querySelector('.multi-choice-container').style.display = 'none';
        document.querySelector('.price-container').style.display = 'block';
        updateDeviceSpecs();
        next.textContent = 'Submit';
    }
    // Button enabling/disabling logic
    if(currentActive === 1){

        prev.disabled = true;
    }
    // else if(currentActive === circles.length){
    //     next.disabled = true;
    // }
    else {
        prev.disabled = false;
        next.disabled = false;
    }
}


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
    "Samsung": ["Galaxy S24 Ultra", "Galaxy S23 Ultra", "Galaxy S22 Ultra", "Galaxy Z Fold 4", "Galaxy Z Fold 5"],
    "Apple": ["iPhone 15","iPhone 14","iPhone 13","iPhone 12"],
    "Google": ["Pixel 8","Pixel 7", "Pixel 6", "Pixel 5"]
}
const phoneImages = {
    'iPhone 15': '../images/phones/Apple/iphone_15.png',
    'iPhone 14': '../images/phones/Apple/iphone_14.png',
    'iPhone 13': '../images/phones/Apple/iphone_13.png',
    'iPhone 12': '../images/phones/Apple/iphone_12.png',
    'Galaxy S24 Ultra': '../images/phones/Samsung/galaxy_S24_ultra.png',
    'Galaxy S23 Ultra': '../images/phones/Samsung/galaxy_S23_ultra.png',
    'Galaxy S22 Ultra': '../images/phones/Samsung/galaxy_S22_ultra.png',
    'Galaxy Z Fold 4': '../images/phones/Samsung/galaxy_Zfold4.png',
    'Galaxy Z Fold 5': '../images/phones/Samsung/galaxy_Zfold5.png',
    'Pixel 8': '../images/phones/Google/pixel_8.png',
    'Pixel 7': '../images/phones/Google/pixel_7.png',
    'Pixel 6': '../images/phones/Google/pixel_6.png',
    'Pixel 5': '../images/phones/Google/pixel_5.png'
}


let selectedCompany = 'Apple';
// Radio button event listener
document.querySelectorAll('input[name="company"]').forEach(radio => {
    radio.addEventListener('change', function() {
        selectedCompany = this.value;
        updateSuggestions(phone_input.value);
    });
});

// Phone model input
phone_input.addEventListener('input', function() {
    updateSuggestions(this.value);
});

// Suggestion container
function updateSuggestions(inputVal) {
    suggestion_container.innerHTML = '';
    suggestion_container.style.display = 'none';

    if (!inputVal) return;

    let suggestions = phone_map[selectedCompany]?.filter(model =>
        model.toLowerCase().startsWith(inputVal.toLowerCase())
        );

    // Display suggestions
    if (suggestions.length > 0) {
        suggestion_container.style.display = 'block';
        suggestions.forEach(suggestion => {
            let suggestionDiv = document.createElement('div');
            suggestionDiv.textContent = suggestion;
            suggestionDiv.addEventListener('click', function() {
                phone_input.value = suggestion;
                suggestion_container.innerHTML = '';
                suggestion_container.style.display = 'none';
                updatePhoneImage(suggestion);
            });
            suggestion_container.appendChild(suggestionDiv);
        });
    }
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

const phone_unlocked = document.getElementById('phone-unlocked');
const locked_company_container = document.querySelector('.locked-company-container');
phone_unlocked.addEventListener('change', function() {
    if (phone_unlocked.value === 'Yes') {
        locked_company_container.style.display = 'none';
    } else {
        locked_company_container.style.display = 'block';
    }
});

// Circle 3 js update cirlce 3's phone specs
let lockedCompany = 'N/A';
document.getElementById('locked-company-verizon').addEventListener('click', function() {
    lockedCompany = 'Verizon';
})
document.getElementById('locked-company-tmobile').addEventListener('click', function() {
    lockedCompany = 'T-Mobile';
})
document.getElementById('locked-company-att').addEventListener('click', function() {
    lockedCompany = 'AT&T';
})

// End phone input
function updateDeviceSpecs(){
    const model = document.getElementById('phone-model-input').value;
    const capacity = document.getElementById('phone-capacity').value;
    const wear = document.getElementById('phone-wear').value;
    const unlocked = document.getElementById('phone-unlocked').value;
    const lockedTo = unlocked === 'No' ? lockedCompany : 'N/A';

    document.getElementById('phone-model-show').textContent = `Model: ${model}`;
    document.getElementById('phone-capacity-show').textContent = `Capacity: ${capacity}`;
    document.getElementById('phone-wear-show').textContent = `Condition: ${wear}`;
    document.getElementById('phone-unlock-show').textContent = `Unlocked: ${unlocked}`;
    if(unlocked === 'Yes'){
        document.getElementById('phone-lock-company-show').style.display = 'none';
    }
    else{
        document.getElementById('phone-lock-company-show').style.display = 'block';
        document.getElementById('phone-lock-company-show').textContent = `Locked To: ${lockedTo}`;
    }
}

window.onclick = function(event) {
    if (!event.target.matches('#phone-model-input')) {
        document.getElementById('suggestion-container').style.display = 'none';
    }
};

window.onload = function() {
    document.querySelector('.sell-instructions').style.opacity = "1";
    document.querySelector('.sell-instructions > p').style.opacity = "1";
    document.querySelector('.step-1').style.opacity = "1";
    document.querySelector('.step-2').style.opacity = "1";
    document.querySelector('.step-3').style.opacity = "1";
    // document.querySelector('.image_phone_container').style.opacity = "1";
};
