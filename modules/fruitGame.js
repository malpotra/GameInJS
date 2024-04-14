class FruitGame {

    constructor(docRef, windowRef) {
        this.docRef = docRef;
        this.windowRef = windowRef;
        this.basket = {
            /** basket would be moving only one axis
             * 0 means center
             * to go left it will be < 0
             * to go right it will be > 0
             */
            "position": 0
        };
        this.fruitList = [
            {
                "name": "Apple",
                "image": "./assets/apple.png",
                "score": 10,
                "speed": 10
            },
            {
                "name": "Orange",
                "image": "./assets/orange.png",
                "score": 20,
                "speed": 15
            },
            {
                "name": "Watermelon",
                "image": "./assets/watermelon.png",
                "score": 5,
                "speed": 5
            }
        ];
        this.gameStarted = false;
        this.fruits = 3;
        this.currentFruit = -1;
        this.currentFruitX = 0; //will move vertically downwards on this axis(x=Location)
        this.currentFruitY = 0;
        this.currentScore = 0;
        this.asyncIntervalID = null;
        this.scorePopupIntervalID = null;
        this.handlerEvent = null;
    }
    /**
     * Add the required event listeners and methods running asycnhronously
     */
    startGame() {
        this.handleUserActions = this.handleUserActions.bind(this);
        this.windowRef.addEventListener(
            "keydown",
            this.handleUserActions
        );
    }
    handleUserActions(event) {
        switch (event.key) {
            case " ":
                //console.log(`car state ${car.running}`);
                if (this.gameStarted === true) {
                    this.stopTheRound();
                } else {
                    this.startTheRound();
                }
                break;
            case "ArrowLeft":
                //console.log("Turn Left");
                if (this.gameStarted === true) {
                    this.#moveBasketToPostion("left");
                }
                break;
            case "ArrowRight":
                if (this.gameStarted === true) {
                    this.#moveBasketToPostion("right");
                }
                break;
            default:
                break;
        }
    }
    /**
     * Remove all the required event listeners and methods
     * To be called when game changed
     */
    stopGame() {
        if (this.asyncIntervalID !== null) {
            this.windowRef.clearInterval(this.asyncIntervalID);
        }
        this.windowRef.removeEventListener(
            "keydown",
            this.handleUserActions
        );
    }
    startTheRound() {
        let currentFruit = (Math.random()*1000) % this.fruits;
        let gameAreaDiv = this.docRef.getElementById("game-area");
        if (this.docRef.getElementById("score-after-round") !== null) {
            this.docRef.getElementById("score-after-round").remove();
        }
        let basketImageElement = this.docRef.createElement("img");
        basketImageElement.setAttribute("id", "basket-location");
        basketImageElement.setAttribute("height", "100px");
        basketImageElement.setAttribute("width", "100px");
        basketImageElement.setAttribute("src", "./assets/basket.png");

        let basketParentDiv = this.docRef.getElementById("game-area");
        let h = basketParentDiv.clientHeight;
        let w = basketParentDiv.clientWidth;
        basketImageElement.style.marginTop = (h - 100);
        basketImageElement.style.marginBottom = 0;
        basketImageElement.style.marginLeft = (w-100)/2;
        basketImageElement.style.marginRight = (w-100)/2;
        basketParentDiv.appendChild(basketImageElement);
        this.asyncIntervalID = this.windowRef.setInterval(this.runTheGame.bind(this), 50);    
        this.gameStarted = true;    
    }
    runTheGame() {
        //check if fruit in touch with basket
        if (this.currentFruit === -1) {
            this.currentFruit = Math.floor(Math.random()*100);
            this.currentFruit = this.currentFruit%this.fruits;
            let basketImageEl = this.docRef.getElementById("basket-location");
            let fruit = this.fruitList[this.currentFruit];
            let fruitImageDiv = this.docRef.createElement("img");
            fruitImageDiv.setAttribute("id", "fruit-location");
            fruitImageDiv.setAttribute("height", "100px");
            fruitImageDiv.setAttribute("width", "100px");
            fruitImageDiv.setAttribute("src", fruit.image);
            let gameAreaDiv = this.docRef.getElementById("game-area");
            this.currentFruitX = Math.floor((Math.random()*1000*1000))%(gameAreaDiv.clientWidth/2);
            if (this.currentFruitX%2 === 1) {
                this.currentFruitX = -1*this.currentFruitX;
            }
            fruitImageDiv.style.marginLeft = (gameAreaDiv.clientWidth-100)/2 + this.currentFruitX;
            fruitImageDiv.style.marginRight = (gameAreaDiv.clientWidth-100)/2-this.currentFruitX;
            fruitImageDiv.style.marginTop = 0;
            fruitImageDiv.style.marginBottom = 0;
            basketImageEl.style.marginTop = (gameAreaDiv.clientHeight - 100 - 100);
            basketImageEl.before(fruitImageDiv);

        } else {
            let fruitImagEl = this.docRef.getElementById("fruit-location");
            let basketImageEl = this.docRef.getElementById("basket-location");
            let gameAreaDiv = this.docRef.getElementById("game-area");
            let rangeBask = {"left": this.basket.position - 50, "right": this.basket.position + 50};
            let rangeFruit = {"left": this.currentFruitX - 50, "right": this.currentFruitX + 50};

            if ((rangeBask.left <= rangeFruit.right && rangeFruit.right <= rangeBask.right) 
                || (rangeBask.left <= rangeFruit.left && rangeFruit.left <= rangeBask.right)) {
                //aligned
                if ((this.currentFruitY + fruitImagEl.clientHeight - 50) >= gameAreaDiv.clientHeight - basketImageEl.clientHeight) {
                    this.currentScore += this.fruitList[this.currentFruit].score;
                    let scoreDiv = this.docRef.createElement("div");
                    scoreDiv.setAttribute("id","score-popup");
                    
                    scoreDiv.setAttribute(
                        "style",
                        `position: fixed; z-index: 10;height: 50px; width: 100px;\
                        padding: 5px; margin-top: ${(gameAreaDiv.clientHeight- 50)/2}px;\
                        margin-bottom: ${(gameAreaDiv.clientHeight - 50)/2}px;\
                        margin-left: ${(gameAreaDiv.clientWidth-100)/2}px;\
                        margin-right: ${(gameAreaDiv.clientHeight-100)/2}px;\
                        background-color: black;color: white;display: flex;\
                        justify-content: center;align-items: center;`
                    );

                    scoreDiv.appendChild(this.docRef.createTextNode(`+ ${this.fruitList[this.currentFruit].score} !`));
                    this.currentFruit = -1;
                    basketImageEl.style.marginTop = gameAreaDiv.clientHeight - 100;
                    basketImageEl.style.marginBottom = 0;
                    fruitImagEl.remove();
                    this.currentFruitY = 0;
                    
                    basketImageEl.before(scoreDiv);
                    this.scorePopupIntervalID = setTimeout(
                        ()=> {
                            this.docRef.getElementById("score-popup").remove();
                        },
                        1000*3
                    );
                } else if (this.currentFruitY + fruitImagEl.clientHeight >= gameAreaDiv.clientHeight) {
                    this.currentFruit = -1;
                    basketImageEl.style.marginTop = gameAreaDiv.clientHeight - 100;
                    basketImageEl.style.marginBottom = 0;
                    fruitImagEl.remove();
                    this.currentFruitY = 0;
                }
            } else {
                //not aligned
                if (fruitImagEl != null && (this.currentFruitY-fruitImagEl.clientHeight >= gameAreaDiv.clientHeight)) {
                    this.currentFruit = -1;
                    basketImageEl.style.marginTop = gameAreaDiv.clientHeight - 100;
                    basketImageEl.style.marginBottom = 0;
                    fruitImagEl.remove();
                    this.currentFruitY = 0;
                }
            }
        }
        //move fruit
        if (this.currentFruit !== -1) {
            this.currentFruitY = this.currentFruitY + this.fruitList[this.currentFruit].speed;
            let fruitImagEl = this.docRef.getElementById("fruit-location");
            let basketImageEl = this.docRef.getElementById("basket-location");
            let gameAreaDiv = this.docRef.getElementById("game-area");
            fruitImagEl.style.marginTop= this.currentFruitY;
            fruitImagEl.style.marginBottom = 0;
            basketImageEl.style.marginTop = (gameAreaDiv.clientHeight - 100 -100-this.currentFruitY);
        }
        
    }
    stopTheRound() {
        this.currentFruit = - 1;
        this.basket.position = 0;
        this.currentFruitX = 0;
        this.currentFruitY = 0;
        this.docRef.getElementById("fruit-location").remove();
        this.docRef.getElementById("basket-location").remove();
        let scoreForLastRound = this.docRef.createElement("div");
        scoreForLastRound.setAttribute("id", "score-after-round");
        scoreForLastRound.setAttribute(
            "style",
            `display: flex;justify-content: center;\
            align-items: center;flex-direction: column;\
            background: honeydew;height: 160px;width: 500px;\
            border-radius: 10px; margin-left: auto; margin-right: auto;\
            margin-top:${(this.docRef.getElementById("game-area").clientHeight-160)/2}px;\
            margin-bottom:${(this.docRef.getElementById("game-area").clientHeight-160)/2}px`
        );
        scoreForLastRound.appendChild(
            this.docRef.createTextNode(
                `The score for the last round was: ${this.currentScore}`
            )
        );
        this.docRef.getElementById("game-area").appendChild(scoreForLastRound);
        this.currentScore = 0;

        this.windowRef.clearInterval(this.asyncIntervalID);
        this.asyncIntervalID = null;
        this.gameStarted = false;
    }

    #moveBasketToPostion(action) {
        let basketImageEl = this.docRef.getElementById("basket-location");
        let gameAreaDiv = this.docRef.getElementById("game-area");
        if (action === "left") {
            if ((gameAreaDiv.clientWidth-100)/2 >= Math.abs(this.basket.position-5)) {
                this.basket.position = this.basket.position - 5;
            }
        } else {
            if ((gameAreaDiv.clientWidth-100)/2 >= Math.abs(this.basket.position+5)) {
                this.basket.position = this.basket.position + 5;
            }
        }
        basketImageEl.style.marginLeft =(gameAreaDiv.clientWidth-100)/2 + this.basket.position;
        basketImageEl.style.marginRight =(gameAreaDiv.clientWidth-100)/2 - this.basket.position;
    }


}
export { FruitGame };