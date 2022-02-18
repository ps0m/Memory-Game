let quantityElements = 16;

let gameField = document.querySelector('.game-field');
let currentCard = null;
let firstCard, secondCard;

let checkTurn = false; 
let freezeField = false;
// function create class in css
function addRule(stylename, selector, rule) {

    let stylesheet = document.querySelector(`link[href$="${stylename}.css"]`);
    stylesheet.sheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.sheet.cssRules.length);
       }
  
// create block card

function newCard () {
    let arr = shuffleCard();
    for (i=0; i<quantityElements; i++) {
        let card = document.createElement ('div');
        card.classList.add ('card');
        card.classList.add (`card__close`);
        card.style.backgroundSize = "cover";
        // card.classList.add (`card__open${i}`);
        card.setAttribute('data-class', i );
        card.setAttribute('data-number', Math.ceil(arr[(i)]/2));
        addRule('style', `.card__open${i}`, `background: url(./assets/png/${Math.ceil(arr[(i)]/2)}.png)`);
        
        gameField.append(card);
    }
}
newCard ();


let cardList = document.querySelectorAll('.card');

cardList.forEach(element => {
        element.addEventListener("click", turnCard )
});

function turnCard (){
    if (freezeField){
        return;
    } 
    
    if (!currentCard) {
        this.classList.toggle (`card__open${this.dataset.class}`);
        firstCard = this; 
        currentCard = true;
        console.log(firstCard);
        checkTurn = firstCard.dataset.class;
        
    } else {
        if (checkTurn === this.dataset.class) {
            return;
        } 
        this.classList.toggle (`card__open${this.dataset.class}`);
        secondCard = this;
        currentCard = null;
        console.log(secondCard);
        checkMatch (); 
    } 
}

function checkMatch () {
    if ((firstCard.dataset.number === secondCard.dataset.number)) {
            firstCard.removeEventListener ("click", turnCard);
            secondCard.removeEventListener ("click", turnCard);
            newStep ()
            console.log('!!');
    } else {
        unTurnCard ();
    } 
} 

function unTurnCard () {
    freezeField = true;
    setTimeout (() => {
    firstCard.classList.remove (`card__open${firstCard.dataset.class}`);
    secondCard.classList.remove (`card__open${secondCard.dataset.class}`);
    freezeField = false;
    newStep ()
    }, 1000)

}

function newStep () {
    firstCard = secondCard =null;
    checkTurn = freezeField = false; 
} 

function shuffleCard() {
    let array = [];
    for (let i = 1; i <= quantityElements; i++) {
        array.push(i);
    }
    // for (let i = 0; i <array.length; i++) {
    //     let current = array[i]
    //     let rand = Math.floor(Math.random()*array.length);
    //     // array[i] = rand;
    //     array[i] = array[rand];
    //     array[rand] = current;
    // } 
    return array;
} 
// console.log(shuffleCard());




