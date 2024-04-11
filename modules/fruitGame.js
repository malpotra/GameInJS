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
                "image": "./assets/apple.png"
            },
            {
                "name": "Orange",
                "image": "./assets/orange.png"
            },
            {
                "name": "Watermelon",
                "image": "./assets/watermelon.png"
            }
        ];
        this.gameStarted = false;
        this.fruits = 3;
        this.currentFruit = 0;
        this.currentScore = 0;
    }
    /**
     * Add the required event listeners and methods running asycnhronously
     */
    startGame() {
        this.windowRef.addEventListener(
            "keydown",
            (event) => {
                switch (event.key) {
                    case " ":
                        //console.log(`car state ${car.running}`);
                        if (this.gameStarted === true) {
                            stopTheRound();
                        } else {
                            startTheRound();
                        }
                        car.running = !car.running;
                        break;
                    case "ArrowLeft":
                        //console.log("Turn Left");
                        console.log("Move to left");
                        break;
                    case "ArrowRight":
                        console.log("Turn Right");
                        break;
                    default:
                        break;
                }
            }
        );
    }
    /**
     * Remove all the required event listeners and methods
     * To be called when game changed
     */
    stopGame() {
        this.windowRef.removeEventListener(
            "keydown",
            (event) => {
                console.log("Removed the key events for Fruit Game");
            }
        );
    }
    startTheRound() {

    }
    stopTheRound() {
        
    }

}
export { FruitGame };