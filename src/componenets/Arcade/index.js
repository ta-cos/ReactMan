import React, { useState } from 'react'
import { Matrix } from '../LevelMatrix'
import Pacman from '../Pacman'

function Arcade() {

    const [gameBoard, setGameBoard] = useState("begin")


    return (
        <>
            <Matrix setGameBoard={setGameBoard} />
        </>
    )
}

export default Arcade
