import { tips } from "./data/selecttips.js";


// main function
export function index() {



// *** use % data
let i1 = 0;
let htmlg = ``;
while(i1 < tips.length) {

    htmlg += `
    <button class="buttons1" data-tipid="${tips[i1].tip}">${tips[i1].tip}%</button>
    `
    
    i1++;
};
document.querySelector('#checkid').innerHTML = htmlg + `<input type="number" class="inputpro1" placeholder="Custom"></input>`;



// *** add variables
const reset = document.querySelector('#buttonjs');
const input1 = document.querySelector('#inputjs1');
const input2 = document.querySelector('#inputjs2');
const element = document.querySelectorAll('.buttons1');
let lastClicked = null;
let i2 = 0;
let selectr = 0;



// *** show rest button when inputs are empty
reset.classList.add('buttonnone');
function showRes() {
    if (input1.value.trim() === '' || input2.value.trim() === '') {
        reset.classList.add('buttonnone');
    } else {
        reset.classList.remove('buttonnone');
    }
    totalResult();
}
input1.addEventListener('input', showRes);
input2.addEventListener('input', showRes);




// *** manipulate and add % clicking
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
            customInput.value = ``;
            xb.addEventListener('click', () => {
                selectr = 0;
                lastClicked.classList.remove('active');
                xb.classList.remove('xb');
                xb.innerHTML = ``;
                showRes();
            });
                selectr = select / 100;
            
            showRes();
            totalResult()

        
        })

    i2++;

};



// *** custom input with %
const customInput = document.querySelector('.inputpro1');
customInput.addEventListener('input', () => {
    let customValue = Number(customInput.value);
    if(customValue) {
        selectr = customValue / 100
        if(customValue <= 0 || customValue > 100) {
            alert('! (1% --- 100%) !');
            customInput.value = ``;
        };
     if(lastClicked) {
        lastClicked.classList.remove('active');
        let xb = document.querySelector('#xb-js');
        xb.classList.remove('xb');
        xb.innerHTML = ``;
    }
    showRes();
    totalResult()
} else {
    if(lastClicked) {
        selectr = 0;
    }
    showRes();
    totalResult()
};
});



// function to calculate and display the total result after input validation
function totalResult() {

        // this code shows value if input is empty
        if(input1.value.trim() === '' || input2.value.trim() === '') {

            if (input1.value.trim() === '' || input1.value.trim() < 0) {
                input1.classList.remove('input1jspro12');
                input1.classList.add('input1jspro1');
                document.querySelector('#span1js').innerHTML = `Can't be zero`;
                document.querySelector('#span1js').classList.add('span1');
            } else {
                input1.classList.add('input1jspro12');
                input1.classList.remove('input1jspro1')
                document.querySelector('#span1js').innerHTML = ``;
                document.querySelector('#span1js').classList.remove('span1');
            }
    
            if (input2.value.trim() === '' || input2.value.trim() < 0) {
                input2.classList.remove('input1jspro12');
                input2.classList.add('input1jspro1');
                document.querySelector('#span2js').innerHTML = `Can't be zero`;
                document.querySelector('#span2js').classList.add('span1');
            } else {
                input2.classList.add('input1jspro12');
                input2.classList.remove('input1jspro1');
                document.querySelector('#span2js').innerHTML = ``;
                document.querySelector('#span2js').classList.remove('span1');
            }
    
            if (Number(input1.value.trim()) < 0 || Number(input2.value.trim()) < 0) {
                alert('! not < 1 !');
                input1.value = ``
                input2.value = ``
            }
            
            return;
    
        }
        input1.classList.remove('input1jspro1');
        input2.classList.remove('input1jspro1');
        input1.classList.add('input1jspro12')
        input2.classList.add('input1jspro12')
        document.querySelector('#span1js').innerHTML = ``;
        document.querySelector('#span1js').classList.remove('span1');
        document.querySelector('#span2js').innerHTML = ``;
        document.querySelector('#span2js').classList.remove('span1');
        
    
    
            
        let resetR = document.querySelector('#num');
        let resetR2 = document.querySelector('#num2')
        let calc1 = (Number(input1.value) * selectr) / Number(input2.value);
        let calc2 = (Number(input1.value) + calc1) / Number(input2.value);
        if(isNaN(calc1) || isNaN(calc2)) {
            alert('Something wrong')
            calc1 = 0;
            calc2 = 0;
        };
        resetR.innerHTML = `$${calc1.toFixed(2)}`;
        resetR2.innerHTML = `$${calc2.toFixed(2)}`;

}




// *** clicking rest button (reset!)
reset.addEventListener('click', () => {

    if(!(input1.value.trim() === '' || input2.value.trim() === '')) {

    let resetR = document.querySelector('#num');
    let resetR2 = document.querySelector('#num2')
    let calc1 = 0;
    let calc2 = 0;
    resetR.innerHTML = `$${calc1.toFixed(2)}`;
    resetR2.innerHTML = `$${calc2.toFixed(2)}`;

    input1.value = ``;
    input2.value = ``;
    



    if(lastClicked) {
    lastClicked.classList.remove('active');
    let xb = document.querySelector('#xb-js');
    xb.classList.remove('xb');
    xb.innerHTML = ``;
    selectr = 0;
};


}

    showRes();
    totalResult();

});





};