/*
/To Do List:
- shuffle cards
- final message
- add starts
- cool effects
*/


/*
 * Create a list that holds all of your cards
 */

const cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
let moves = 0;
let pairsMatched = 0;
const deck = document.querySelector(".deck");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

shuffle(cards);

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


for (let i = 0; i < deck.children.length; i++) {
    let childElement = deck.children[i];
    childElement.addEventListener('click', function () {
        openCard(i);
        pushToOpenCards(i);
        if (openCards.length == 2){
          if (openCards[0].children[0].classList.value == openCards[1].children[0].classList.value){
            matchCards();
          } else {
            closeCards();
                  }
        }
        });
}

const retryButton = document.getElementsByClassName("restart");
retryButton[0].addEventListener('click', restart);

function restart () {

  openCards = [];
  pairsMatched = 0;
  for (let i = 0; i < deck.children.length; i++) {
      let childElement = deck.children[i];
      childElement.classList.remove("show", "open", "match");
      childElement.classList.add("card");
    }
    moves = 0;
    document.getElementsByClassName("moves")[0].innerHTML= moves;
}

function openCard (el) {
  deck.children[el].classList.add("show", "open");
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
  }
}

function increaseCounter(){
  moves++;
  document.getElementsByClassName("moves")[0].innerHTML= moves;
}

function showFinalScore(){
  document.getElementsByClassName("deck").style.display = "none";
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
