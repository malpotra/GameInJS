class CarGame {
    /**
     * @param {Reference to The document} docRef,
     * @param {Reference to the window} windowRef,
     * @param {ID of the element containing the game area} gameAreaDivID   
     */
    constructor(docRef, windowRef, gameAreaDivID) {
        this.car = {
            "speed": 1, 
            "running": false,
            "position": {
                "x":0,
                "y":0
            },
            "direction": "N"
        }
        this.intervalID = null;
        this.docRef = docRef;
        this.windowRef = windowRef;
        this.carParDiv = this.docRef.getElementById(gameAreaDivID);
    }

    /**
     * must be called to add the controls for car game when game is changed
     * 
     */
    startCarGame() {
        this.windowRef.addEventListener(
            "keydown",
            (event) => {
                //console.log(event.key);
                //console.log(event.repeat);
                switch (event.key) {
                    case " ":
                        //console.log(`car state ${car.running}`);
                        if (this.car.running) {
                            this.stopCar();
                        } else {
                            this.startCar();
                        }
                        this.car.running = !this.car.running;
                        break;
                    case "ArrowLeft":
                        //console.log("Turn Left");
                        this.car.direction = "W";
                        break;
                    case "ArrowRight":
                        //console.log("Turn Right");
                        this.car.direction = "E";
                        break;
                    case "ArrowDown":
                        //console.log("brake");
                        this.car.direction = "S";
                        break;
                    case "ArrowUp":
                        //console.log("move forward");
                        this.car.direction = "N";
                        break;
                    default:
                        break;
                }
            }
        );
        this.moveCarToOrigin();
    }
    /**
     * must be called to remove the controls for car game when game is changed
     * 
     */
    stopCarGame() {
        this.windowRef.removeEventListener(
            "keydown",
            (event) => {
                console.log("Stopping Car Game");
            }
        );
    }

    /**
     * Upon pressing spacebar the car will start moving
     */
    startCar() {
        if (!this.intervalID) {
            this.intervalID = setInterval(this.moveCarAhead.bind(this), 50);
        }
    }
    /**
     * Upon pressing spacebar the car will stop moving
     */
    stopCar() {
        clearInterval(this.intervalID);
        this.intervalID = null;
    }
    
    /**
     * method responsible for moving and controlling the car
     */
    moveCarAhead() {
        let carDiv = this.docRef.getElementById("car-location");
        let height = this.carParDiv.clientHeight;
        let width = this.carParDiv.clientWidth;
        switch (this.car.direction) {
            case "N":
                this.car.position.y += 5;
                break;
            case "S":
                this.car.position.y -= 5;
                break;
            case "E":
                this.car.position.x += 5;
                break;
            case "W":
                this.car.position.x -= 5;
                break;
            default:
                break;
    
        }
        if ((height-carDiv.clientHeight)/2 <= Math.abs(this.car.position.y)) {
            if (this.car.direction == "N") {
                this.car.direction = "S";
            } else {
                this.car.direction = "N";
            }
        } else if ((width - carDiv.clientWidth)/2 <= Math.abs(this.car.position.x)) {
            if (this.car.direction == "W") {
                this.car.direction = "E";
            } else {
                this.car.direction = "W";
            }
        } else {
            carDiv.style.marginTop = (height - carDiv.clientHeight)/2 - this.car.position.y;
            carDiv.style.marginBottom = (height - carDiv.clientHeight)/2 + this.car.position.y;
            carDiv.style.marginRight = (width - carDiv.clientWidth)/2 - this.car.position.x;
            carDiv.style.marginLeft = (width - carDiv.clientWidth)/2 + this.car.position.x;
        }
    
    }
    moveCarToOrigin() {
        let carDiv = this.docRef.getElementById("car-location");
        let height = this.carParDiv.clientHeight;
        let width = this.carParDiv.clientWidth;
        carDiv.style.marginLeft = (width - carDiv.clientWidth)/2;
        carDiv.style.marginRight = (width - carDiv.clientWidth)/2;
        carDiv.style.marginTop = (height - carDiv.clientHeight)/2;
        carDiv.style.marginBottom = (height -carDiv.clientHeight)/2;
    }
}
export { CarGame };