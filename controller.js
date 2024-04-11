import { CarGame } from './modules/carGame.js';
import { FruitGame } from './modules/fruitGame.js';

let currentGame = "";
let isGameChosen = false;

if (isGameChosen === false) {
    showChoiceButton();
}


let carGame = null;
let fruitGame = null;

function showChoiceButton() {
    let wrapper = document.createElement("div");
    wrapper.setAttribute("id", "game-choice-1");
    wrapper.setAttribute("class", "game-choice");

    let helpText = document.createTextNode("Select game from below");
    wrapper.appendChild(helpText);

    let buttonWrapperSpan = document.createElement("span");
 
    let button1 = document.createElement("button");
    button1.setAttribute("type", "button");
    button1.setAttribute("value", "car");
    button1.setAttribute("class", "choice-button");
    button1.addEventListener("click",
        (event) => {
            gameSelected(event);
        } 
    );
    button1.appendChild(document.createTextNode("Car Game"));
    
    let button2 = document.createElement("button");
    button2.setAttribute("type", "button");
    button2.setAttribute("value", "fruit");
    button2.setAttribute("class", "choice-button");
    button2.addEventListener("click",
        (event) => {
            gameSelected(event);
        }
    );
    button2.appendChild(document.createTextNode("Fruit Game"));
    
    buttonWrapperSpan.append(button1, button2);
    wrapper.appendChild(buttonWrapperSpan)
    document.body.appendChild(wrapper);
}

function gameSelected(event) {
    let selectedGame = event.srcElement.value;
    isGameChosen = true;

    document.getElementById("game-choice-1").remove();
    currentGame = selectedGame;

    if (selectedGame === "car") {
        //start car game
        let gameWrapper = document.createElement("div");
        gameWrapper.setAttribute("id", "content");
        gameWrapper.style.setProperty("height", "100%");
        gameWrapper.style.setProperty("width", "100%");

        let goBackButton = document.createElement("button");
        goBackButton.setAttribute("id", "back-button-1");
        goBackButton.setAttribute("class", "back-button");
        goBackButton.setAttribute("type", "button");
        goBackButton.style.setProperty("margin","5px");
        goBackButton.addEventListener("click", (event) => {
            goBackToFirstPage();
        })
        goBackButton.appendChild(document.createTextNode("<- Go Back"));

        let helpTextDiv = document.createElement("div");
        helpTextDiv.setAttribute("id", "starting-bar");
        helpTextDiv.style.setProperty("display", "flex");
        helpTextDiv.style.setProperty("justify-content", "center");
        helpTextDiv.style.setProperty("align-items", "center");

        helpTextDiv.appendChild(goBackButton);
        helpTextDiv.appendChild(document.createTextNode("Press the space bar to start the game, or go back"));

        let gameAreaDiv = document.createElement("div");
        gameAreaDiv.setAttribute("id", "game-area");
        gameAreaDiv.style.setProperty("height", "inherit");
        gameAreaDiv.style.setProperty("width", "inherit");
            
        let carImage = document.createElement("img");
        carImage.setAttribute("id","car-location");
        carImage.setAttribute("height","100px");
        carImage.setAttribute("width", "100px");
        carImage.setAttribute("src", "./assets/pexels-mike-bird-112460-fotor-bg-remover-20240406224329.png");
        gameAreaDiv.appendChild(carImage);
        gameWrapper.append(helpTextDiv, gameAreaDiv);
        
        document.body.appendChild(gameWrapper);
        carGame = new CarGame(document, window, "game-area");
        carGame.startCarGame();
    } else {
        //start fruit game
        let gameWrapper = document.createElement("div");
        gameWrapper.setAttribute("id", "content");
        gameWrapper.style.setProperty("height", "100%");
        gameWrapper.style.setProperty("width", "100%");

        let goBackButton = document.createElement("button");
        goBackButton.setAttribute("id", "back-button-1");
        goBackButton.setAttribute("class", "back-button");
        goBackButton.setAttribute("type", "button");
        goBackButton.style.setProperty("margin","5px");
        goBackButton.addEventListener("click", (event) => {
            goBackToFirstPage();
        })
        goBackButton.appendChild(document.createTextNode("<- Go Back"));

        let helpTextDiv = document.createElement("div");
        helpTextDiv.setAttribute("id", "starting-bar");
        helpTextDiv.style.setProperty("display", "flex");
        helpTextDiv.style.setProperty("justify-content", "center");
        helpTextDiv.style.setProperty("align-items", "center");

        helpTextDiv.appendChild(goBackButton);
        helpTextDiv.appendChild(document.createTextNode("Press the space bar to start the game, or go back"));

        let gameAreaDiv = document.createElement("div");
        gameAreaDiv.setAttribute("id", "game-area");
        gameAreaDiv.style.setProperty("height", "inherit");
        gameAreaDiv.style.setProperty("width", "inherit");
        
        gameWrapper.append(helpTextDiv, gameAreaDiv);
        document.body.appendChild(gameWrapper);
        fruitGame = new FruitGame(document, window);
        fruitGame.startGame();
    }
}
function goBackToFirstPage() {
    isGameChosen = false;
    carGame = null;
    fruitGame = null;
    currentGame = "";
    document.getElementById("content").remove();
    showChoiceButton();
}





