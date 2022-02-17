let quantityElements = 16;

let gameField = document.querySelector('.game-field');
let currentCard = null;
let firstCard, secondCard;
// function create class in css
function addRule(stylename, selector, rule) {

    let stylesheet = document.querySelector(`link[href$="${stylename}.css"]`);
    stylesheet.sheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.sheet.cssRules.length);
       }
  
// create block card

function newCard () {
    let arr = shuffleCard();
    for (i=1; i<=quantityElements; i++) {
        let card = document.createElement ('div');
        card.classList.add ('card');
        // card.classList.add (`card__close`);
        card.style.backgroundSize = "cover";
        card.classList.add (`card__open${i}`);
        
        card.setAttribute('data-number', arr[i-1]);
        addRule('style', `.card__open${arr[(i-1)/2]}`, `background: url(./assets/png/${arr[(i-1)/2]}.png)`);
        
        gameField.append(card);
    }
}
newCard ();


let cardList = document.querySelectorAll('.card');

cardList.forEach(element => {
    element.addEventListener("click", (e)=> {
    e.target.classList.toggle (`card__open${e.target.dataset.number}`);
    e.target.classList.toggle ('card__close');
    console.log(e);
        if (!currentCard) {
            currentCard = true;
            firstCard = e.target.dataset.number;
        } else {
            secondCard = e.target.dataset.number;
            currentCard = null;
        } 
        if (firstCard === currentCard) {
            console.log('ok');
        }
        console.log(currentCard, firstCard, secondCard);

    })    
});


function shuffleCard() {
    let array = [];
    for (let i = 1; i <= quantityElements; i++) {
        array.push(i);
    }
    for (let i = 0; i <array.length; i++) {
        let current = array[i]
        let rand = Math.floor(Math.random()*array.length);
        // array[i] = rand;
        array[i] = array[rand];
        array[rand] = current;
    } 
    return array;
} 
// console.log(shuffleCard());
