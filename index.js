
let quantityElements = 16;
let gameField = document.querySelector('.game-field');
let card = document.createElement ('div');
let z;
for (i=1; i<=quantityElements; i++) {
    let card = document.createElement ('div');
    card.classList.add ('card');
    card.setAttribute('data-number', i);
    card.style.background = `#fef4d1 url(./assets/png/${i}.png)`;
    card.style.backgroundSize = "cover";
    gameField.append(card);

    card.addEventListener("click", (e)=> {
        z = e.target.dataset;
        e.target.style.removeProperty("background");
        e.target.classList.toggle ('card__close');
        console.log(z)});

}




