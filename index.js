import { tips } from "./data/selecttips.js";

let i1 = 0;
let htmlg = ``;
while(i1 < tips.length) {

    htmlg += `
    <button class="buttons1" data-tipid="${tips[i1].tip}">${tips[i1].tip}%</button>
    `
    
    i1++;
};
document.querySelector('#checkid').innerHTML = htmlg + `<input class="buttons1 for2" placeholder="custon"></input>`;

let reset = document.querySelector('#buttonjs');
let input1 = document.querySelector('#inputjs1');
let input2 = document.querySelector('#inputjs2');
let element = document.querySelectorAll('.buttons1');
let lastClicked = null;
let i2 = 0;
while(i2 < element.length) {
    let elements = element[i2]

elements.addEventListener('click', () => {

    let select = Number(elements.dataset.tipid);
    if(lastClicked) {
        lastClicked.classList.remove('active');
    };
    elements.classList.add('active');
    lastClicked = elements
    let selectr = select / 100;
    console.log(selectr)
    reset.addEventListener('click', () => {

        let resetR = document.querySelector('#num');
        let resetR2 = document.querySelector('#num2')
        let calc1 = (Number(input1.value) * selectr) / Number(input2.value);
        let calc2 = (Number(input1.value) + calc1) / Number(input2.value);
        resetR.innerHTML = `$${calc1}`;
        resetR2.innerHTML = `$${calc2}`
    
    });

})


    i2++;

};