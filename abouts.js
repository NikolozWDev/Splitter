import { aboutsArr } from "./data/modes.js";

// main function
export function about() {


    
let i3 = 0;
let htmlg2 = ``;
while(i3 < aboutsArr.length) {

    htmlg2 += `
    <div class="main-div1">

    <div class="div1 clicking" data-guessid="${aboutsArr[i3].name}">
    <p class="about-name">${aboutsArr[i3].name}</p>
    <div>></div>
    </div>

    <div class="div2">
    <p class="summon1-text">${aboutsArr[i3].description}</p>
    <p class="summon1">${aboutsArr[i3].summon}</p>
    </div>

    </div>
    `;

    i3++;

};
document.querySelector('.header-son').innerHTML = htmlg2;


let guess = document.querySelectorAll('.clicking');
let i4 = 0;
let lastChecked = null;
while(i4 < guess.length) {
    let guesspro = guess[i4];
    guesspro.addEventListener('click', (event) => {
        let parentDiv = event.currentTarget.nextElementSibling;

        if(parentDiv && parentDiv.classList.contains('div2')) {

            if(lastChecked && lastChecked !== parentDiv) {
                lastChecked.classList.remove('active')
            }
            
        parentDiv.classList.toggle('active')
        lastChecked = parentDiv.classList.contains('active') ? parentDiv : null;

        };

    })
    i4++;
};




};