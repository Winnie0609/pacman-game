const width = 28
const scoreDisplay = document.querySelector("#scoreDisplay")
const grid = document.querySelector(".grid")
const volumeOn = document.querySelector(".soundOn")
const volumeOff = document.querySelector(".mute")
const gameOver = document.querySelector(".game-over")
const gameWin = document.querySelector(".game-win")
const overlay = document.querySelector(".overlay")
const restartBtn = document.querySelector(".restart")

let score = 0
let timerId = 0
let intervalTime = 500
let dot = 305

const squares = []

// 0 - pac-dot
// 1 - wall
// 2 - ghost
// 3 - power pallet
// 4 - empty

layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,3,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,
    1,0,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,1,0,0,0,0,1,
    1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,0,1,1,0,1,
    1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,0,0,0,0,1,
    1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,1,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,3,1,
    1,1,1,1,1,1,0,1,1,0,1,1,2,2,2,2,1,1,0,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,3,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1,
    0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,0,0,0,0,0,3,0,0,0,0,1,1,0,1,1,1,1,1,1,
    1,3,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,3,1,
    1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,1,1,0,1,0,1,
    1,0,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,0,1,0,1,
    1,0,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,0,1,0,1,
    1,0,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,0,1,0,1,
    1,0,0,0,0,1,3,0,0,0,0,0,1,1,1,1,1,3,0,0,0,0,0,0,0,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,0,1,1,0,3,0,1,1,0,1,1,0,1,1,1,1,0,1,
    1,3,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,3,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

//board

function createBoard(){
    for (let i = 0; i < layout.length ; i++ ){
        const square = document.createElement("div")
        grid.appendChild(square)
        squares.push(square)

        if (layout[i] === 0){
            square.classList.add("pac-dot")
        } else if(layout[i] === 1){
            square.classList.add("wall")
        } else if(layout[i] === 3){
            square.classList.add("power-pellet")
        } else if(layout[i] === 2){
            square.classList.add("ghost-liar")
        }
    }
}

createBoard()

//sound effect
function TurnOffVolume(){
    volumeOn.addEventListener("click", function(){
        volumeOn.style.display = "none"
        volumeOff.style.display = "block"
    })
 }
 
function TurnOnVolume(){
volumeOff.addEventListener("click", function(){
    volumeOff.style.display = "none"
    volumeOn.style.display = "block"
    TurnOffVolume()
})
}

TurnOnVolume()

function hitSound() {
    if (volumeOn.style.display === "block"){
        let audio = document.createElement("audio")
        audio.src="sound/death.mp3"
        audio.play()
    } 
}

function eatSound(){
    if (volumeOn.style.display === "block"){
        let audio = document.createElement("audio")
        audio.src="sound/eat.mp3"
        audio.play()
    } 
}

function eatGhostSound(){
    if (volumeOn.style.display === "block"){
        let audio = document.createElement("audio")
        audio.src="sound/eatghost.mp3"
        audio.play()
    } 
}

function deathSound(){
    if (volumeOn.style.display === "block"){
        let audio = document.createElement("audio")
        audio.src="sound/death.mp3"
        audio.play()
    } 
}

function winSound(){
    if (volumeOn.style.display === "block"){
        let audio = document.createElement("audio")
        audio.src="sound/win.mp3"
        audio.play()
    } 
}

//pacman

let pacmanCurrentIndex = 494
squares[pacmanCurrentIndex].classList.add("pacman")

function control(e){
    squares[pacmanCurrentIndex].classList.remove("pacman")
    switch(e.keyCode) {
        case 40 :
                console.log("pressed down")
            if (
                pacmanCurrentIndex + width < width * width &&
                !squares[pacmanCurrentIndex + width].classList.contains("wall")&&
                !squares[pacmanCurrentIndex + width].classList.contains("ghost-liar")
            )
                pacmanCurrentIndex += width

            break

        case 38 :
            console.log("pressed up")
            if (
                pacmanCurrentIndex - width >= 0 &&
                !squares[pacmanCurrentIndex - width].classList.contains("wall")) 
                
                pacmanCurrentIndex -= width
            break

        case 37 :
            console.log("pressed left")

            if (pacmanCurrentIndex === 364) {
                squares[pacmanCurrentIndex].classList.remove("pac-dot")
                dot--
                pacmanCurrentIndex = 391
            } else if ( 
                pacmanCurrentIndex % width !==0 && 
                !squares[pacmanCurrentIndex - 1].classList.contains("wall")
            ) {
                pacmanCurrentIndex -= 1
            }
            break

        case 39 :
            console.log("pressed right")
            
            if (pacmanCurrentIndex === 391){
                squares[pacmanCurrentIndex].classList.remove("pac-dot")
                dot--
                pacmanCurrentIndex = 364
            } else if (
                pacmanCurrentIndex % width < width -1 &&
                !squares[pacmanCurrentIndex + 1].classList.contains("wall")
            ) {  
                pacmanCurrentIndex += 1
            }
            break
    }
    squares[pacmanCurrentIndex].classList.add("pacman")
    eatDot()
    eatPowerPallet()
}
document.addEventListener("keydown", control)


//dot eaten
function eatDot(){
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")){
        score++
        squares[pacmanCurrentIndex].classList.remove("pac-dot")
        scoreDisplay.textContent = score
        dot--
        eatSound()
    }
}

//power pallet eaten
function eatPowerPallet() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove("power-pellet")
        score += 10
        dot--
        ghosts.forEach(ghost => {ghost.isScared = true})
        setTimeout(unScareGhosts, 15000)
        eatSound() 
    }
    }

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

//ghost
class Ghost{
    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex 
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost("blinky" , 347, 250),
    new Ghost("pinky" , 376, 400),
    new Ghost("inky" , 352, 300),
    new Ghost("clyde" , 379, 500),
]

//draw ghost onto grid
ghosts.forEach (ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add("ghost")
})

//move the ghost
ghosts.forEach (ghost => moveGhost(ghost))

function moveGhost (ghost){
    console.log ("moved ghost")
    const directions = [-1 , +1 , -width , +width]
    let direction= directions[Math.floor(Math.random() * directions.length)]
    console.log(direction)
    
    ghost.timerId = setInterval(function() {
        if (
            !squares[ghost.currentIndex + direction].classList.contains("wall")  &&
            !squares[ghost.currentIndex + direction].classList.contains("ghost") 
        ) {
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost")
            ghost.currentIndex += direction

            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add("ghost")
            
        } else {
            direction = directions[Math.floor(Math.random() * directions.length)]
        }

        if (
            ghost.isScared && 
            !(374 < ghost.currentIndex && ghost.currentIndex < 381) && 
            !(346 < ghost.currentIndex && ghost.currentIndex < 353) && 
            !(319 < ghost.currentIndex && ghost.currentIndex < 324) 
        ) {
            squares[ghost.currentIndex].classList.add("scared-ghost")
        }

        if (
            ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")
        ) {
            squares[ghost.currentIndex].classList.remove(ghost.className,"scared-ghost")
            ghost.currentIndex = ghost.startIndex
            score += 100
            squares[ghost.currentIndex].classList.add(ghost.className , "ghost")
            eatGhostSound()
        }
        
        //Game over
        if (
            !ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")
        ) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keydown", control)
            gameOver.style.display = "block"
            overlay.style.display="block"
            deathSound()

        }
        win()
    }, ghost.speed)
    }

function win(){
    if( dot === 0){
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keydown", control)
        gameWin.style.display = "block"
        overlay.style.display="block"
        winSound()
    }
}