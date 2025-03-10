import { tips } from "./data/selecttips.js";

let i1 = 0;
let htmlg = ``;
while(i1 < tips.length) {

    htmlg += `
    <button class="buttons1" data-tipid="${tips[i1].tip}">${tips[i1].tip}%</button>
    `
    
    i1++;
};
document.querySelector('#checkid').innerHTML = htmlg + `<input type="number" class="inputpro1" placeholder="Custom"></input>`;

let reset = document.querySelector('#buttonjs');
let input1 = document.querySelector('#inputjs1');
let input2 = document.querySelector('#inputjs2');
let element = document.querySelectorAll('.buttons1');
let lastClicked = null;
let i2 = 0;
let selectr = 0;
reset.classList.add('buttonnone');
function showRes() {
    if (input1.value.trim() === '' || input2.value.trim() === '') {
        reset.classList.add('buttonnone');
    } else {
        reset.classList.remove('buttonnone');
    }
}
input1.addEventListener('input', showRes);
input2.addEventListener('input', showRes);
while(i2 < element.length) {
    let elements = element[i2]
    
        elements.addEventListener('click', () => {

            let select = Number(elements.dataset.tipid);
            if(lastClicked) {
                lastClicked.classList.remove('active');
            };
            elements.classList.add('active');
            lastClicked = elements
            let xb = document.querySelector('#xb-js');
            xb.classList.add('xb');
            xb.innerHTML = `X`;
            xb.addEventListener('click', () => {
                selectr = 0;
                lastClicked.classList.remove('active');
                xb.classList.remove('xb');
                xb.innerHTML = ``;
                showRes();
            });
                selectr = select / 100;
            
            showRes();

        
        })
    i2++;

};
reset.addEventListener('click', () => {

    if (input1.value.trim() === '' && input2.value.trim() === '') {
        input1.classList.add('input1jspro1');
        input2.classList.add('input1jspro1');
        document.querySelector('#span1js').innerHTML = `Can't be zero`;
        document.querySelector('#span1js').classList.add('span1');
        document.querySelector('#span2js').innerHTML = `Can't be zero`;
        document.querySelector('#span2js').classList.add('span1');
        return;
    } else {

        if (input1.value.trim() === '') {
            input1.classList.add('input1jspro1');
            document.querySelector('#span1js').innerHTML = `Can't be zero`;
            document.querySelector('#span1js').classList.add('span1');
            return;
        } else {
            input1.classList.remove('input1jspro1');
            document.querySelector('#span1js').innerHTML = ``;
            document.querySelector('#span1js').classList.remove('span1');
        }

        if (input2.value.trim() === '') {
            input2.classList.add('input1jspro1');
            document.querySelector('#span2js').innerHTML = `Can't be zero`;
            document.querySelector('#span2js').classList.add('span1');
            return;
        } else {
            input2.classList.remove('input1jspro1');
            document.querySelector('#span2js').innerHTML = ``;
            document.querySelector('#span2js').classList.remove('span1');
        }
    }

        
    let resetR = document.querySelector('#num');
    let resetR2 = document.querySelector('#num2')
    let calc1 = (Number(input1.value) * selectr) / Number(input2.value);
    let calc2 = (Number(input1.value) + calc1) / Number(input2.value);
    resetR.innerHTML = `$${calc1.toFixed(2)}`;
    resetR2.innerHTML = `$${calc2.toFixed(2)}`;

    if(resetR.innerHTML.length > 8) {
        resetR.classList.add('newnum1')
    }
    if(resetR2.innerHTML.length > 8) {
        resetR2.classList.add('newnum1')
    }

    showRes();

});