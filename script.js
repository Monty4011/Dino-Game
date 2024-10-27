let score = 0;
let cross = true;

let gameOverMusic = new Audio("gameover.mp3")
let music = new Audio("music.mp3")

document.onkeydown = function (e) {
    console.log("key code is: " + e.keyCode)
    if (e.keyCode == 38) {
        let dino = document.querySelector(".dino")
        dino.classList.add("animateDino")
        music.play()
        setTimeout(() => {
            dino.classList.remove("animateDino")
            music.pause()
        }, 1000);
    }

    if (e.keyCode == 39) {
        let dino = document.querySelector(".dino")
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"))
        dino.style.left = dinoX + 112 + "px"
    }

    if (e.keyCode == 37) {
        let dino = document.querySelector(".dino")
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"))
        dino.style.left = dinoX - 112 + "px"
    }
}

setInterval(() => {
    let dino = document.querySelector(".dino")
    let dragon = document.querySelector(".dragon")
    let gameOver = document.querySelector(".gameOver")

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"))
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"))

    let ox = parseInt(window.getComputedStyle(dragon, null).getPropertyValue("left"))
    let oy = parseInt(window.getComputedStyle(dragon, null).getPropertyValue("top"))

    let diffX = Math.abs(dx - ox)
    let diffY = Math.abs(dy - oy)

    console.log(diffX, diffY)

    if (diffX < 50 && diffY < 50) {
        gameOver.style.visibility = "visible"
        dragon.classList.remove("animateDragon")
        dino.classList.add("animateGameOver")
        gameOverMusic.play()
        setTimeout(() => {
            gameOverMusic.pause()
            dino.classList.remove("animateGameOver")
        }, 1000);
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    else if (diffX < 100 && cross) {
        score = score + 1;
        updateScore(score);
        cross = false
        setTimeout(() => {
            cross = true
        }, 1000);


        setTimeout(() => {
            let dragonAnmDur = parseFloat(window.getComputedStyle(dragon, null).getPropertyValue("animation-duration"))
            let newDragonAnmDur = dragonAnmDur - 0.1
            dragon.style.animationDuration= newDragonAnmDur + "s"
        }, 1000);
    }
}, 10);

function updateScore(score) {
    let scoreCount = document.querySelector(".scoreCount")
    scoreCount.innerHTML = "Your Score: " + score
}
