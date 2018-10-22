import React, { Component } from 'react'
// import { TransitionGroup } from 'react-transition-group'
import random from 'lodash/random'

import styles from './dice-roller.module.scss'

class DiceRoller extends Component {
    constructor() {
        super()
        this.state = {
            isRolling: false,
            hasRolled: false,
            dieSides: 20,
            dieValue: null,
            modifierSign: null,
            modifierValue: '',
        }
    }

    swapDice = evt => this.setState({ dieSides: evt.target.value })

    startRoll = () => {
        this.setState({ isRolling: true, hasRolled: true }, async () => {
            const { dieSides } = this.state
            const dieValue = Math.ceil(random(0, dieSides))
            await setTimeout(() => this.setState({ isRolling: false, dieValue }), 2500)
        })
    }

    changeModifier = evt => {
        const modifierValue = evt.target.value
        if (modifierValue.length < 4 && (!modifierValue || /^(\+|-)?[0-9]*$/.test(modifierValue))) {
            this.setState({ modifierValue })
        }
    }

    handleSubmit = () => {/* TODO: this */}

    render() {
        const { dieSides, dieValue, hasRolled, isRolling, modifierValue } = this.state
        return (
            <div className={styles.container}>
                <div className={styles.topbar}>
                    <div className={styles.topBarContainer}>
                        <label className={styles.label} htmlFor={'dieSelect'}>Die</label>
                        <select id={'dieSelect'} className={styles.dropdown} onChange={this.swapDice} value={dieSides}>
                            <option value={20}>20</option>
                            <option value={100}>Percent</option>
                            <option value={12}>12</option>
                            <option value={10}>10</option>
                            <option value={8}>8</option>
                            <option value={6}>6</option>
                            <option value={4}>4</option>
                        </select>
                    </div>

                    <div className={styles.topBarContainer}>
                        <label className={styles.label} htmlFor={'modifier'}>Modifier</label>
                        <input className={styles.input} onChange={this.changeModifier} value={modifierValue} />
                    </div> 
                </div>

                <div className={styles.rollZone}>

                    {isRolling && <div className={styles.rolling}></div>}

                    {hasRolled
                        ? <div className={styles.rollResult}>{dieValue}</div>
                        : <button className={styles.rollButton} onClick={this.startRoll}>Roll a {dieSides}-sided die</button>
                    }
                </div>
                {dieValue && <div className={styles.bottomBar}>
                    {modifierValue &&
                        <div className={styles.finalValue}>{dieValue} + {modifierValue} = {Number(modifierValue) + Number(dieValue)} total</div>
                    }
                    <div className={styles.buttonContainer}>
                        <button className={styles.submitButton} onClick={this.handleSubmit}>Submit results</button>
                    </div>
                </div>}
                
            </div>
        )
    }
}

export default DiceRoller
