import React, { Component } from 'react'
import PropTypes from 'prop-types'
import random from 'lodash/random'

import LoadingSpinner from '../LoadingSpinner'

import styles from './dice-roller.module.scss'

class DiceRoller extends Component {
    constructor() {
        super()
        this.state = {
            isRolling: false,
            hasRolled: false,
            dieSides: 20,
            dieValue: '',
            dieCount: '1',
        }
    }

    static propTypes() {
        return {
            submitResults: PropTypes.func.isRequired,
        }
    }

    swapDice = evt => this.setState({ dieSides: evt.target.value })

    startRoll = () => {
        this.setState({ isRolling: true, hasRolled: true }, async () => {

            const { dieSides, dieCount } = this.state
            let n = Number(dieCount) || 1
            let dieValue = ''
            while (n > 0) {
                const res = Math.round(random(1, dieSides))
                dieValue += ` ${res},`
                n--
            }
            dieValue = dieValue.trim().substring(0, dieValue.length - 2)
            await setTimeout(() => this.setState({ isRolling: false, dieValue }), 2500)
        })
    }

    changeNumberOfDie = evt => {
        const dieCount = evt.target.value
        if (dieCount.length < 3 && (!dieCount || /^(\+|-)?[0-9]*$/.test(dieCount))) {
            this.setState({ dieCount })
        }
    }

    handleSubmit = () => {
        const { dieValue, dieCount, dieSides} = this.state
        const { submitResults } = this.props
        const values = {
            dieValue,
            dieCount: dieCount || 1,
            dieSides,
        }
        submitResults(values)
    }

    render() {
        const { dieSides, dieValue, hasRolled, isRolling, dieCount } = this.state
        return (
            <div className={styles.container}>
                <div className={styles.topbar}>
                    <div className={styles.topBarContainer}>
                        <label className={styles.label} htmlFor={'dieSelect'}>Die</label>
                        <select id={'dieSelect'} className={styles.dropdown} onChange={this.swapDice} value={dieSides}>
                            <option value={20}>20</option>
                            <option value={12}>12</option>
                            <option value={10}>10</option>
                            <option value={8}>8</option>
                            <option value={6}>6</option>
                            <option value={4}>4</option>
                        </select>
                    </div>

                    <div className={styles.topBarContainer}>
                        <label className={styles.label} htmlFor={'dieCount'}># of Dice</label>
                        <input className={styles.input} onChange={this.changeNumberOfDie} value={dieCount} />
                    </div>
                </div>

                <div className={styles.rollZone}>

                    {isRolling && <LoadingSpinner size={'small'} />}

                    {hasRolled
                        ? <div className={styles.rollResult}>{dieValue}</div>
                        : <button className={styles.rollButton} onClick={this.startRoll}>Roll {dieCount || 'a'} {dieSides}-sided die</button>
                    }
                </div>
                <div className={styles.bottomBar}>

                    <div className={styles.buttonContainer}>
                        {dieValue && <button className={styles.submitButton} onClick={this.handleSubmit}>Submit results</button>}
                    </div>
                </div>

            </div>
        )
    }
}

export default DiceRoller
