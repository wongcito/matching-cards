/*
 * Create a list that holds all of your cards
 */

const cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
let moves = 0;
let pairsMatched = 0;
const deck = document.querySelector(".deck");
const stars = document.querySelectorAll(".stars")[0];
const starsend = document.querySelectorAll(".stars")[1];
console.log(stars);
let p = document.querySelector(".modalp");
let button = document.createElement("button");
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName("close")[0];
let gameStarted = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let timergame;

let distance = 0;
let deckCards = Array.from(deck.children);
setCards();
function setCards () {
  deckCards = shuffle(deckCards);

  while (deck.firstChild) {
      deck.removeChild(deck.firstChild);
  }

  for (i=0;i<deckCards.length;i++){
    deck.appendChild(deckCards[i]);
  }

  for (let i = 0; i < deck.children.length; i++) {
      let childElement = deck.children[i];
      childElement.addEventListener('click', function () {
        gameStarted++;
        checkTimer();
        if (!(childElement.classList.contains("show")) && (openCards.length<2)){
          openCard(i);
          pushToOpenCards(i);
            if (openCards.length == 2){
            if (openCards[0].children[0].classList.value == openCards[1].children[0].classList.value){
              matchCards();
              starsCheck();
            } else {
              setTimeout(function(){
                closeCards();
                starsCheck();
              }, 700);
            }
          }
          };
        })
  }

}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Getting all the cards and creating an array for opened cards
 */
const card = document.getElementsByClassName('card');
let openCards =[];

/*
 * Adding event listeners to all cards and showing and adding them to the openCards array
 */

const retryButton = document.getElementsByClassName("restart");
retryButton[0].addEventListener('click', restart);

const retryButtonModal = document.getElementsByClassName("restart-modal");
retryButtonModal[0].addEventListener('click', restartModal);

function restart () {
  moves = 0;
  distance = 0;
  document.getElementsByClassName("timer")[0].innerHTML = "Timer";
  gameStarted = 0;
  checkTimer();
  if(deck.children[16]){
    deck.removeChild(p);
    deck.removeChild(button);
    setCards();
  }



  stars.children[1].style.visibility = "visible";
  stars.children[2].style.visibility = "visible";
  starsend.children[1].style.visibility = "visible";
  starsend.children[2].style.visibility = "visible";
  openCards = [];
  pairsMatched = 0;
  for (i=0;i<deck.children.length;i++){
      deck.children[i].style.visibility = "visible";
  }
  for (let i = 0; i < deck.children.length; i++) {
      let childElement = deck.children[i];
      childElement.classList.remove("show", "open", "match");
      childElement.classList.add("card");
    }

    document.getElementsByClassName("moves")[0].innerHTML= moves;
}

function starsCheck (){
  if (moves >= 20){
    stars.children[1].style.visibility = "hidden";
    starsend.children[1].style.visibility = "hidden";
  } else if (moves>=10){
    stars.children[2].style.visibility = "hidden";
    starsend.children[2].style.visibility = "hidden";
  }
}

function openCard (el) {
  deck.children[el].classList.add("open", "show");
}

function pushToOpenCards (el){
  openCards.push(deck.children[el]);

}

function closeCards (){
  openCards[0].classList.remove("show", "open");
  openCards[1].classList.remove("show", "open");
  openCards = [];
  increaseCounter();
}

function matchCards (){
  openCards[0].classList.replace("show","match");
  openCards[1].classList.replace("show","match");
  openCards = [];
  increaseCounter();
  pairsMatched++;
  if (pairsMatched==8){
    showFinalScore();
    gameStarted = false;
    checkTimer();
  }
}

function increaseCounter(){
  moves++;
  document.getElementsByClassName("moves")[0].innerHTML= moves;
}



function showFinalScore(){
  for (i=0;i<deck.children.length;i++){
      deck.children[i].style.visibility = "hidden";
  }
  openModal();
  p.textContent = "Congratulations! You spent " + moves + " moves " + "and " + distance + " seconds."
  document.getElementsByClassName("timer")[0].innerHTML = "Timer";
}

function openModal() {
    modal.style.display = "block";
}

function restartModal(){
  modal.style.display = "none";
  restart();
}

function timer() {
  timergame = setInterval (function() {
  distance = distance + 1;
  document.getElementsByClassName("timer")[0].innerHTML = distance + " seconds";
  }, 1000);
}

function checkTimer(){
  if (gameStarted == 1) {
      timer();
  } else if (gameStarted == 0) {
    clearInterval(timergame);
  }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        restart();
    }
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
