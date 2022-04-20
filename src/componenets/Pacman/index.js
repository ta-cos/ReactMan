import React, { useState, useLayoutEffect } from 'react'
import './Pacman.css'

function Pacman({ props }) {

    const { row, setRow, col, setCol, matrix, isActive, setActive } = props
    const [isGame, setIsGame] = useState(false);



    const handleKeyUp = (e) => {
        switch (e.keyCode) {
            case 37:
                setCol(col - 1)
                setActive(row * (col - 1))
                break
            case 38:
                setRow(row - 1)
                console.log("up")
                break
            case 39:
                setCol(col + 1)
                console.log('right')
                break
            case 40:
                setRow(row + 1)
                console.log('down')
                break
        }
    }

    function startGame(e) {
        if (isGame) return
        setIsGame(true)
        setActive(row * col)
    }


    return (
        <div
            className='pacman-controls'
            tabIndex='0'
        >
            <button id='startGame' onClick={startGame} onKeyUp={handleKeyUp}>Start Game</button>
        </div>
    )
}

export default Pacman
