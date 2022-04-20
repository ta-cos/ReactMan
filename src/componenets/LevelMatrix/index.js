import React, { useState, useEffect } from 'react'
import './Level.css'


//matrix is the level
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
// 5 - pacman


const matrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]



export function Matrix() {

    const [currentBoard, setCurrentBoard] = useState(matrix)
    const [kongX, setKongX] = useState(17)
    const [kongY, setKongY] = useState(14)
    matrix[kongX][kongY] = 5
    let score = 0

    // ------------ GAME ---------------------------------------
    // ------------ GAME ---------------------------------------
    // ------------ GAME ---------------------------------------
    // ------------ GAME ---------------------------------------


    class Game {
        constructor(score = 0, squares = [], gameOverId = NaN, checkWinID = NaN) {
            this.score = score;
            this.squares = matrix;
            this.gameOverId = gameOverId;
            this.checkWinId = checkWinID;
        }


        startGame() {
            let squares = matrix;
            console.log("GO")
            // pinky.movementAI();
            // blinky.movementAI();
            // inky.movementAI();
            // clyde.movementAI();
            document.addEventListener('keyup', kong.moveKong);
            // const checkWinId = setInterval(game.checkForWin, 50)
            // const gameOverId = setInterval(game.checkForGameOver, 50)
            // kong.createKong()
            setCurrentBoard(squares)
        }

        isKongMovementAllowed(x, y) {
            return x >= 0 && x < matrix.length && y > 0 && y < matrix[x].length && matrix[x][y] !== 1 && matrix[x][y] !== 2;
        }

        // isGhostMovementAllowed(x, y) {
        //     return x >= 0 && x < matrix.length && y >= 0 && y < matrix[x].length && matrix[x][y] !== 1
        //         && !game.squares[x][y].classList.contains('ghost');
        // }

        // checkForGameOver() {

        //     if (game.squares[pacman.currentX][pacman.currentY].classList.contains('ghost') &&
        //         !game.squares[pacman.currentX][pacman.currentY].classList.contains('scared-ghost')) {
        //         lives -= 1;
        //         clearInterval(pacman.rightId)
        //         clearInterval(pacman.upId)
        //         clearInterval(pacman.leftId)
        //         clearInterval(pacman.downId)
        //         game.reset()

        //         if (lives === 2) life3.style.display = 'none'
        //         else if (lives === 1) life2.style.display = 'none'

        //         if (lives === 0) {
        //             life1.style.display = 'none'
        //             clearInterval(blinky.blinkyId)
        //             clearInterval(pinky.pinkyId)
        //             clearInterval(clyde.clydeId)
        //             clearInterval(inky.inkyId)
        //             youLose.style.display = 'block'
        //             startButton.innerText = 'Play Again'
        //             startButton.style.display = 'flex'
        //             clearInterval(game.gameOverId)
        //             clearInterval(game.checkWinId)
        //         }
        //     }
        // }

        // checkForWin() {
        //     if (game.squares[pacman.currentX][pacman.currentY].classList.contains('scared-ghost')) {
        //         pacman.ghostEaten()
        //     }

        //     if (game.score === 274) {
        //         scoreDisplay.innerHTML = 'YOU WIN!'
        //         document.removeEventListener('keyup', pacman.movePacman)
        //         grid.remove()
        //         startButton.remove()
        //         clearInterval(blinky.timerId)
        //         clearInterval(game.gameOverId)
        //         clearInterval(game.checkWinId)
        //     }
        // }

        // reset() {

        //     game.squares[blinky.currentX][blinky.currentY].classList.remove(blinky.name)
        //     game.squares[blinky.currentX][blinky.currentY].classList.remove('ghost', 'scared-ghost')
        //     blinky.currentX = 12
        //     blinky.currentY = 12
        //     game.squares[blinky.currentX][blinky.currentY].classList.add(blinky.name, 'ghost')

        //     game.squares[inky.currentX][inky.currentY].classList.remove(inky.name)
        //     game.squares[inky.currentX][inky.currentY].classList.remove('ghost', 'scared-ghost')
        //     inky.currentX = 12
        //     inky.currentY = 15
        //     game.squares[inky.currentX][inky.currentY].classList.add(inky.name, 'ghost')

        //     game.squares[pinky.currentX][pinky.currentY].classList.remove(pinky.name)
        //     game.squares[pinky.currentX][pinky.currentY].classList.remove('ghost', 'scared-ghost')
        //     pinky.currentX = 14
        //     pinky.currentY = 15
        //     game.squares[pinky.currentX][pinky.currentY].classList.add(pinky.name, 'ghost')

        //     game.squares[clyde.currentX][clyde.currentY].classList.remove(clyde.name)
        //     game.squares[clyde.currentX][clyde.currentY].classList.remove('ghost', 'scared-ghost')
        //     clyde.currentX = 14
        //     clyde.currentY = 12
        //     game.squares[clyde.currentX][clyde.currentY].classList.add(clyde.name, 'ghost')

        //     pacman.removePacman()
        //     pacman.currentX = 17
        //     pacman.currentY = 14
        //     pacman.createPacman()

        // }

    }

    // ------------ KONG ---------------------------------------
    // ------------ KONG ---------------------------------------
    // ------------ KONG ---------------------------------------
    // ------------ KONG ---------------------------------------

    class Kong {
        constructor(matrix) {
            this.currentX = 17;
            this.currentY = 14;
            this.squares = matrix;
            this.matrix = matrix;
            this.rightId = null;
            this.leftId = null;
            this.upId = null;
            this.downId = null;
            this.direction = 'east'
            this.lastMove = null
            this.delay = 500
        }
        // createKong() {
        //     // setKongX(this.currentX)
        //     // setKongY(this.currentY)
        //     this.squares[kongX][kongY] = 5
        // }

        removeKong() {
            game.squares[kong.currentX][kong.currentY] = 4
        }

        goLeft() {
            kong.leftId = setInterval(function () {
                if (kong.currentX === 13 && kong.currentY === 0) {
                    kong.removeKong();
                    kong.currentX = 13
                    kong.currentY = 27;
                }
                if (!game.isKongMovementAllowed(kong.currentX, kong.currentY - 1)) {
                    clearInterval(kong.leftId)
                    return
                }
                else {
                    console.log('go left')
                    kong.removeKong()
                    setKongY(prev => prev - 1)
                    kong.currentY -= 1;
                    // kong.pacDotEaten()
                    // kong.powerPelletEaten()
                    kong.direction = 'west';
                }
            }, 300)
        }

        goRight() {
            kong.rightId = setInterval(function () {
                if (kong.currentX === 13 && kong.currentY === 27) {
                    kong.removeKong();
                    kong.currentX = 13
                    kong.currentY = 0;
                }
                if (!game.isKongMovementAllowed(kong.currentX, kong.currentY + 1)) {
                    clearInterval(kong.rightId)
                } else {
                    console.log("goRight")
                    kong.removeKong()
                    setKongY(prev => prev + 1)
                    kong.currentY += 1;
                    // kong.pacDotEaten()
                    // kong.powerPelletEaten()
                    kong.direction = 'east';
                }
            }, 300)
        }

        goUp() {
            kong.upId = setInterval(function () {
                if (!game.isKongMovementAllowed(kong.currentX - 1, kong.currentY)) {
                    clearInterval(this.upId)
                } else {
                    console.log("go up")
                    kong.removeKong()
                    setKongX(prev => prev - 1)
                    kong.currentX -= 1;
                    // kong.pacDotEaten()
                    // kong.powerPelletEaten()
                    kong.direction = 'north';
                }
            }, 300)
        }

        goDown() {
            kong.downId = setInterval(function () {
                if (!game.isKongMovementAllowed(kong.currentX + 1, kong.currentY)) {
                    clearInterval(this.downId)
                } else {
                    console.log("go Down")
                    kong.removeKong()
                    setKongX(prev => prev + 1)
                    kong.currentX += 1
                    // kong.pacDotEaten()
                    // kong.powerPelletEaten()
                    kong.direction = 'south';
                }
            }, 300)
        }

        moveKong(e) {

            clearInterval(kong.leftId)
            clearInterval(kong.rightId)
            clearInterval(kong.upId)
            clearInterval(kong.downId)

            switch (e.keyCode) {
                case 37:
                    kong.goLeft()
                    break
                case 38:
                    kong.goUp()
                    break
                case 39:
                    kong.goRight()
                    break
                case 40:
                    kong.goDown()
                    break
            }
        }
    }

    //     pacDotEaten() {
    //         if (game.squares[pacman.currentX][pacman.currentY].classList.contains('pac-dot')) {
    //             game.score++
    //             scoreDisplay.innerHTML = game.score
    //             game.checkForWin();
    //             game.squares[pacman.currentX][pacman.currentY].classList.remove('pac-dot')
    //             game.squares[pacman.currentX][pacman.currentY].innerHTML = ''
    //         }
    //     }


    //     powerPelletEaten() {
    //         if (game.squares[pacman.currentX][pacman.currentY].classList.contains('power-pellet')) {
    //             game.score += 10;
    //             blinky.isScared = true;
    //             pinky.isScared = true;
    //             inky.isScared = true;
    //             clyde.isScared = true;
    //             setTimeout(() => {
    //                 blinky.isScared = false;
    //                 pinky.isScared = false;
    //                 inky.isScared = false;
    //                 clyde.isScared = false;
    //             }, 6000)
    //             game.squares[pacman.currentX][pacman.currentY].classList.remove('power-pellet');
    //         }
    //     }

    //     ghostEaten() {
    //         if (game.squares[pacman.currentX][pacman.currentY].classList.contains('scared-ghost')) {

    //             //check for ghost.name
    //             //set that ghost back to start position
    //         }

    //     }

    // }

    const game = new Game();
    const kong = new Kong(matrix);

    return (
        <div className='container'
            tabIndex="0"
        >
            <h1 id='score'>Username's Score: {score}</h1>

            <div id='gameBoard'

            >
                {currentBoard.map((row, i) => (
                    row.map((cord, j) => (
                        <div className={cord === 0 ? `pac-dots` :
                            cord === 1 ? `wall` :
                                cord === 2 ? 'ghost-lair' :
                                    cord === 3 ? `power-pellet` :
                                        cord === 4 ? `empty` :
                                            cord === 5 ? 'kong' :
                                                null}
                            key={i + j}
                            // data-id={i, j}
                        >
                        </div>

                    ))
                ))
                }
            </div>
            <button
                onClick={game.startGame}
            >Start Game</button>
        </div >
    )
}
