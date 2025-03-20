let imgArr = ['assets/download (1).jfif', 'assets/download (2).jfif', 'assets/download.jfif']
let bubbleArr = ['bubble1', 'bubble2', 'bubble3']
let index = 0;
document.querySelector('.bubble1').classList.add('bubblepro')


function updateEver(newIndex) {
    document.querySelector(`.${bubbleArr[index]}`).classList.remove('bubblepro');
    index = newIndex;
    document.querySelector('.image1').src = imgArr[index];
    document.querySelector(`.${bubbleArr[index]}`).classList.add('bubblepro');
}


function nextF() {
    updateEver((index + 1) % imgArr.length);
}
function backF() {
    updateEver((index - 1 + imgArr.length) % imgArr.length);
}



document.querySelector('#nextslide').addEventListener('click', nextF);
document.querySelector('#backslide').addEventListener('click', backF);
bubbleArr.forEach( (bubble, i) => {
    document.querySelector(`.${bubble}`).addEventListener('click', () => {
        updateEver(i)
    })
} )