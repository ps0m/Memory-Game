let quantityElements = 16;

let gameField = document.querySelector('.game-field');
let currentCard = null;
let firstCard, secondCard;
let checkTurn = false; 
let freezeField = false;

let counterStep = 0;
let counterRightStep = 0;

let buttonNewGame = document.querySelector ('.menu__button-new-game');
buttonNewGame.addEventListener ("click", newGame);

let buttonResults = document.querySelector ('.menu__button-results');
buttonResults.addEventListener ("click", showResults);

let menuButtonSound = document.querySelector('.menu__button-sound');
menuButtonSound.addEventListener ('click', soundChange );

function soundChange (e) {
    menuButtonSound.classList.toggle ('menu__button-sound-on');
    e.target.textContent == '🕨 off' ? e.target.textContent = '🕪 on' : e.target.textContent = '🕨 off';
    if (clickAudio.volume && winAudio.volume) {
        clickAudio.volume = 0;
        winAudio.volume = 0;
    }   else {
        clickAudio.volume = 0.5;
        winAudio.volume = 0.5;
    }
}

let currentScore = document.querySelector ('.menu__body-score');
let textBestResult = document.querySelector('.menu__body-value-best-result');
let bestResults = +localStorage.getItem('BestResults')

let time = 0;
let elementTimer = document.querySelector ('.menu__body-timer')

const records = {};

let popup = document.querySelector ('.popup');
let popupText = document.querySelector('.popup__text');

let winnerText = document.querySelector ('.winner__text')



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
    listener ();
}
newCard ();


function listener () {
    let cardList = document.querySelectorAll('.card');
    cardList.forEach(element => {
        if (freezeField){
            return;
        } 
        element.classList.remove (`card__open${element.dataset.class}`);
        element.addEventListener("click", turnCard );
        element.addEventListener("click", clickPlay );
        
    });

}


let clickAudio = document.querySelector('.click-audio');
let winAudio = document.querySelector('.win-audio');

function clickPlay() {
clickAudio.play();
}

function winPlay() {
    winAudio.play();
}


function unTurnCard () {
    freezeField = true;
    
    setTimeout (() => {
        firstCard.classList.add (`rotate`);
        secondCard.classList.add (`rotate`);

        setTimeout (()=>{
        firstCard.classList.remove (`rotate`);
        secondCard.classList.remove (`rotate`);
        
    }, 300);    
    
    firstCard.classList.remove (`card__open${firstCard.dataset.class}`);
    secondCard.classList.remove (`card__open${secondCard.dataset.class}`);
    freezeField = false;
    
    }, 1000)
}


function turnCard (){
    if (freezeField){
        return;
    } 

    if (!currentCard) {
        this.classList.toggle (`card__open${this.dataset.class}`);
        firstCard = this; 
        currentCard = true;
        
        checkTurn = firstCard.dataset.class;

        this.classList.add (`rotate`);
        setTimeout (()=>{
        this.classList.remove (`rotate`);
        }, 300);
        
    } else {
        if (checkTurn === this.dataset.class) {
            return;
        } 
        this.classList.toggle (`card__open${this.dataset.class}`);
        secondCard = this;
        currentCard = null;

        this.classList.add (`rotate`);
        setTimeout (()=>{
        this.classList.remove (`rotate`);
        }, 300);
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



function newStep () {
    firstCard = secondCard =null;
    checkTurn = freezeField = false; 
} 

function hasWin () {
    winPlay();
    let arrayResults = [];
    if (!localStorage.getItem('BestResults')) {
        localStorage.setItem('BestResults', "10000");
    }
    bestResults = +localStorage.getItem('BestResults');

    if (bestResults > counterStep) {
        bestResults = counterStep;
        localStorage.setItem('BestResults', bestResults.toString())
    } 
    if (!JSON.parse(localStorage.getItem('Results'))) {
        arrayResults[0] =  counterStep.toString();
    } else {
        arrayResults = Object.values(JSON.parse(localStorage.getItem('Results')));
        if (arrayResults.length > 9) {
            arrayResults.splice(0, (arrayResults.length-9));
            }
        arrayResults.unshift(counterStep.toString());
        }
        localStorage.setItem ('Results', JSON.stringify(arrayResults));
        
    checkBestResult ();

    clearInterval(timerId); 

    winnerText.classList.add ('winner__animation');
    setTimeout (()=>{
            winnerText.classList.remove ('winner__animation');
    }, 5000)

    showResults ();

};

function checkBestResult () {
    if (bestResults) {
        textBestResult.textContent = `${bestResults} points`;
    }
};
checkBestResult ();

function showResults () {

    let array = Object.values(JSON.parse(localStorage.getItem('Results')));
    popup.classList.toggle('popup__visible');
    
    for (let i = array.length; i > 0; i--) {
        let oneResultText = document.createElement ('p');
        oneResultText.textContent = `Game${(array.length-i+1)} =  ${array[array.length-i]} points`;
        popupText.append(oneResultText);
    }

};

let popupClose = document.querySelector ('.popup_close');
popupClose.addEventListener ('click', (e) => {
    e.preventDefault();
    popup.classList.toggle('popup__visible');
    popupText.innerHTML = '';

});

function shuffleCard() {
    let array = [];
    for (let i = 1; i <= quantityElements; i++) {
        array.push(i);
    }
    for (let i = 0; i <array.length; i++) {
        let current = array[i]
        let rand = Math.floor(Math.random()*array.length);
        array[i] = array[rand];
        array[rand] = current;
    } 
    return array;
} 

function newGame () {
    counterStep = counterRightStep = time = 0;
    currentScore.textContent = `${counterStep}  point`;
    newStep ();
    
    shuffleCard();
    clearInterval(timerId); 
    timerId = setInterval(timer, 1000)

    gameField.innerHTML = '';
    popupText.innerHTML = '';

    
    newCard();

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

let x = window.matchMedia("(max-width: 768px)")
myFunction(x); 
x.addListener(myFunction);

function myFunction(x) {
    if (x.matches) { 
        buttonNewGame.textContent = 'N';
            buttonNewGame.addEventListener('mouseover', ()=> {
                buttonNewGame.textContent = 'New Game';
            })
            buttonNewGame.addEventListener('mouseout', ()=> {
                buttonNewGame.textContent = 'N';
            })

        buttonResults.textContent = 'R';
            buttonResults.addEventListener('mouseover', ()=> {
                buttonResults.textContent = 'Results';
            })
            buttonResults.addEventListener('mouseout', ()=> {
                buttonResults.textContent = 'R';
            })
    } else {
        buttonNewGame.textContent = 'New Game';
            buttonResults.textContent = 'Results';
    }
  }
  
