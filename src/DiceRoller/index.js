import React, { Component } from 'react'
import PropTypes from 'prop-types'
import random from 'lodash/random'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import LoadingSpinner from '../LoadingSpinner'
import Button from '../common/Button'

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
                        <TextField
                            select
                            label={'Die'}
                            variant={'outlined'}
                            onChange={this.swapDice} value={dieSides}>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </TextField>
                    </div>

                    <div className={styles.topBarContainer}>
                        <TextField
                            number
                            label={'# of die'}
                            variant={'outlined'}
                            onChange={this.changeNumberOfDie} value={dieCount} />
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
                        {dieValue && <Button theme={'primary'} onClick={this.handleSubmit}>Submit results</Button>}
                    </div>
                </div>

            </div>
        )
    }
}

export default DiceRoller
