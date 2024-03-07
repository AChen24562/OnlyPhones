
// Get phones from db function
function fetchAndDisplayPhones(){
    const phoneDB = 'http://54.160.154.98:5000/phones';

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

    // await fetch(phoneDB)
    fetch(phoneDB)
        .then(response => response.json())
        .then(data =>{

            const phonesContainer = document.querySelector('.phone-display-container');
            phonesContainer.innerHTML = '';

            data.forEach(phone =>{
                console.log(phone.phone_model)
                console.log(phone.capacity)
                console.log(phone.price)


                const phoneContainer = document.createElement('div');
                phoneContainer.className = 'phone-container';

                const imgBox = document.createElement('div');
                imgBox.className = 'phone-image-box';

                const img = document.createElement('img');
                img.src = phoneImages[phone.phone_model]
                img.alt = phone.phone_model;
                img.className = 'phone-image';
                imgBox.appendChild(img);

                const specsBox = document.createElement('div');
                specsBox.className = 'phone-specs-box';

                specsBox.appendChild(createSpecDiv(`Model: ${phone.phone_model}`));
                specsBox.appendChild(createSpecDiv(`Capacity: ${phone.capacity}`));
                specsBox.appendChild(createSpecDiv(`Wear: ${phone.wear}`));
                specsBox.appendChild(createSpecDiv(`Unlocked: ${phone.unlocked ? 'Yes' : 'No'}`));
                specsBox.appendChild(createSpecDiv(`Carrier Lock: ${phone.carrier_lock || 'N/A'}`));
                specsBox.appendChild(createSpecDiv(`Price: ${phone.price}`));

                phoneContainer.appendChild(imgBox);
                phoneContainer.appendChild(specsBox);

                phonesContainer.appendChild(phoneContainer);
            })
        }).catch(error =>{
            console.log("Error fetching Phone from DB: ", error);
        });
}
function createSpecDiv(text) {
    const specDiv = document.createElement('div');
    specDiv.className = 'phone-spec';
    specDiv.innerText = text;
    return specDiv;
}

// Make get phone from DB function runs on window load:
window.onload = function() {
    fetchAndDisplayPhones();
};
