import React, { PureComponent, Fragment } from 'react'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

const CROSS = faTimes
const CIRCLE = faCircle
const DRAW = 'DRAW'

export default class GridContainer extends PureComponent {
    state = this.setIntialState()

    setValue = idx => {
        const { winner, gridValues } = this.state
        if (winner || gridValues[idx] !== null) return
        this.setState(prevState => {
            const updateObject = { ...prevState }
            if (prevState.previousValue === null || prevState.previousValue === CIRCLE) {
                updateObject.previousValue = CROSS
                updateObject.gridValues[idx] = CROSS
            } else if (prevState.previousValue === CROSS) {
                updateObject.previousValue = CIRCLE
                updateObject.gridValues[idx] = CIRCLE
            }
            return updateObject
        }, this.checkGameState)
    }

    checkGameState() {
        const { gridValues } = this.state
        if (gridValues.every(item => item !== null)) {
            this.setState({
                winner: DRAW
            })
            return
        }
        const winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        const winner = winCombinations.find(combination => {
            return combination.every(item => gridValues[item] === CROSS) || combination.every(item => gridValues[item] === CIRCLE)
        })

        if (winner) {
            this.setState({
                winner: gridValues[winner[0]]
            })
        }
    }

    setIntialState() {
        return {
            gridValues: new Array(9).fill(null),
            previousValue: null,
            winner: null
        }
    }

    resetGame = () => {
        this.setState(this.setIntialState())
    }

    render() {
        const { gridValues, winner } = this.state
        return (
            <Fragment>
                <div className='container'>
                    {gridValues.map((value, idx) => (
                        <div className='cell' key={idx} onClick={() => this.setValue(idx)}>
                            {value !== null && <FontAwesomeIcon icon={value} />}
                        </div>
                    ))}
                </div>
                {winner !== null && (
                    <div className='winner_block'>
                        {winner === DRAW ?
                            'It\'s a draw!' :
                            <Fragment>
                                Player " <FontAwesomeIcon icon={winner} /> " won.
                            </Fragment>
                        }
                        <button onClick={this.resetGame}>Play again</button>
                    </div>
                )}

            </Fragment>
        )
    }
}
