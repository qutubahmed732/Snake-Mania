// all variables are here

let inputDir = { x: 0, y: 0 };
let gameMusic = new Audio('assets/gameMusic.mp3');
let gameOverSound = new Audio('assets/gameOver.mp3');
let moveSound = new Audio('assets/move.mp3');
let foodSound = new Audio('assets/food.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {
        x: 13,
        y: 15
    }
]
food = { x: 6, y: 7 }


// all functions executed here

function main(ctime) {
    window.requestAnimationFrame(main)
    console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;

    gameEngine()
}
window.requestAnimationFrame(main)

function isCollide(snake) {
    // if snake bump into his self
    for (i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameMusic.pause()
            return true;
        }
    }

    // if you bump into the wall

    
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        // alert('press arrow key to start')
        gameMusic.pause();
        return true;
    }
}

function gameEngine() {
    // part1 : updating the snake array and food
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        gameOverSound.play();
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    // if you have eaten the food , increment the score and regenerate the food....

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        if(score > hiscoreval){
            hiscore = score
            localStorage.setItem('hiscore' , JSON.stringify(hiscore))
            hiscore.innerHTML = "Hi-Score :" + hiscore

        }
        scoreBox.innerHTML = "Score: " + score;
        foodSound.play()
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y



    // part2 : display the snake and food
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}



// Main logic starts here


let hiscore = localStorage.getItem('hiscore');
if (hiscore === null){
    hiscoreval = 0;
    localStorage.setItem('hiscore' , JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(localStorage.getItem("hiscore"));
    hiscoreBox.innerHTML = "Hi-Score: " + hiscore;
    // localStorage.setItem('hiscore' , JSON.stringify(hiscore))
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // Start the game
    moveSound.play()
    gameMusic.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})