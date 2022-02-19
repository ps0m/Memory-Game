let quantityElements = 16;

let gameField = document.querySelector('.game-field');
let currentCard = null;
let firstCard, secondCard;
let checkTurn = false; 
let freezeField = false;


let counterStep = 0;
let counterRightStep = 0;

let currentScore = document.querySelector ('.menu__body-score');
let textBestResult = document.querySelector('.menu__body-value-best-result');
let bestResults = +localStorage.getItem('BestResults')

let time = 0;
let elementTimer = document.querySelector ('.menu__body-timer')
console.log(+localStorage.getItem('BestResults'));

const records = {};

// function create class in css
function addRule(styleName, selector, rule) {

    let stylesheet = document.querySelector(`link[href$="${styleName}.css"]`);
    stylesheet.sheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.sheet.cssRules.length);
}
  
// create block card

function newCard () {
    let arr = shuffleCard();
    for (i=0; i<quantityElements; i++) {
        let card = document.createElement ('div');
        card.classList.add ('card');
        card.classList.add ('card__close');
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
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
        // console.log(firstCard);
        checkTurn = firstCard.dataset.class;
        
    } else {
        if (checkTurn === this.dataset.class) {
            return;
        } 
        this.classList.toggle (`card__open${this.dataset.class}`);
        secondCard = this;
        currentCard = null;
        // console.log(secondCard);
        checkMatch (); 
    } 
}


function checkMatch () {
    counterStep++;
    if (counterStep < 2 ) {
        currentScore.textContent = `${counterStep}  point`;
    } else currentScore.textContent = `${counterStep}  points`;
    if ((firstCard.dataset.number === secondCard.dataset.number)) {
            firstCard.removeEventListener ("click", turnCard);
            secondCard.removeEventListener ("click", turnCard);
            counterRightStep++;
            if (counterRightStep === quantityElements/2) {hasWin()};
            newStep ()
    } else {
        unTurnCard ();
    } 
} 

function hasWin () {
    let arrayResults = [];
    if (!localStorage.getItem('BestResults')) {
        localStorage.setItem('BestResults', "10000");
    }
    bestResults = +localStorage.getItem('BestResults');

    if (bestResults > counterStep) {
        bestResults = counterStep;
        localStorage.setItem('BestResults', bestResults.toString())
    } 
    console.log(arrayResults, Object.keys.length);
    if (!JSON.parse(localStorage.getItem('Results'))) {
        arrayResults[0] =  counterStep.toString();
    } else {
        arrayResults = Object.values(JSON.parse(localStorage.getItem('Results')));
        // if (arrayResults.length > 9) {
        //     arrayResults.splice(0, (arrayResults.length-9));
        //     }
        arrayResults.unshift(counterStep.toString());
        }
    checkBestResult ();

    clearInterval(timerId); 

    localStorage.setItem ('Results', JSON.stringify(arrayResults));
    showResults ();
    setTimeout (() => {window.alert (`Поздравляем вы прошли игру за ` + counterStep + ` ходов, лучший результат`+
    bestResults+`ходов`)}, 0);
    // localStorage.clear();

};

function checkBestResult () {
    if (bestResults) {
        textBestResult.textContent = `${bestResults} points`;
    }
};
checkBestResult ();

function showResults () {
    let array = Object.values(JSON.parse(localStorage.getItem('Results')));
    console.log("Результаты последних 10 игр:");
    for (let i = array.length; i > 0; i--) {
        console.log("№"+ (array.length-i+1)+ " = " + array[array.length-i] + "шагов" );
    }
};

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
    //     array[i] = array[rand];
    //     array[rand] = current;
    // } 
    return array;
} 
// console.log(shuffleCard());

function newGame () {
    counterStep = counterRightStep = time = 0;
    currentScore.textContent = `${counterStep}  point`;
    newStep ();
    cardList.forEach(element => {
        element.classList.remove (`card__open${element.dataset.class}`);
        element.addEventListener("click", turnCard )
    });
    shuffleCard();
    clearInterval(timerId); 
    timerId = setInterval(timer, 1000)
}

let buttonNewGame = document.querySelector ('.menu__button-new-game');
buttonNewGame.addEventListener ("click", newGame);



var seconds = 0;
var el = document.getElementById('seconds-counter');

function incrementSeconds() {
    seconds += 1;
    el.innerText = "You have been here for " + seconds + " seconds.";
}



function timer() {
    time++;
    let Minutes = Math.floor (time / 60);
    let Seconds = Math.floor (time % 60);
    Seconds = ((Seconds < 10) ? '0': '') + String(Seconds);
    Minutes = ((Minutes < 10) ? '0': '') + String(Minutes);


    elementTimer.innerHTML = `${Minutes}:${Seconds}`;

    // if (time > 1000) {
    //     return
    // }
}

let timerId = setInterval(timer, 1000);


