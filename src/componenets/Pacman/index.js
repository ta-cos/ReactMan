import React, { useState, useEffect } from 'react'
import useForceUpdate from 'use-force-update';
import './Pacman.css'

function Pacman({ props }) {

    const { matrix, matrixChanges, setChanges } = props
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0)
    const forceUpdate = useForceUpdate()



    useEffect(() => {
        console.log(matrixChanges)
        console.log(matrix)
        console.log(col)
        console.log(row)

    }, [row, col])


    //left arrow key code 37
    //up arrow key code 38
    //right arrow key code 39
    //down arrow key code 40

    const handleKeyDown = (e) => {
        switch (e.keyCode) {
            case 37:
                console.log()
                goLeft()
                break
            case 38:
                goUp()
                break
            case 39:
                goRight()
                break
            case 40:
                goDown()
                break
        }
    }

    function goLeft() {
        matrix[row][col] = 4
        setCol(col - 1)
        matrix[row][col] = 5
        setChanges(matrixChanges + 1)
        forceUpdate();


    }

    function goRight() {
        matrix[row][col] = 4
        setCol(col + 1)
        matrix[row][col] = 5
        setChanges(matrixChanges + 1)
        forceUpdate();


    }

    function goUp() {
        matrix[row][col] = 4
        setRow(row + 1)
        matrix[row][col] = 5
        setChanges(matrixChanges + 1)
        forceUpdate();


    }

    function goDown() {
        matrix[row][col] = 4
        setRow(row - 1)
        matrix[row][col] = 5
        setChanges(matrixChanges + 1)
        forceUpdate();


    }


    return (
        <div
            className='pacman-constrols'
            onKeyDown={handleKeyDown}
            tabIndex='0'
        >
        </div>
    )
}

export default Pacman
