import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

import Button from '../common/Button'

// import LoadingSpinner from '../LoadingSpinner'

import styles from './dm-screen.module.scss'

class DMScreen extends Component {
  constructor() {
    super()
    this.state = {
      campaignTitle: '',
      currentLocation: '',
      gameNotes: '',
      proximityCharacters: ''
    }
  }

  onChangeText = ({ target }) => {
    const newState = { ...this.state }
    const { name, value } = target
    newState[name] = value
    this.setState(newState)
  }

  save() {
    // save it.
  }

  reload() {
    // refetch data and reset
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <TextField
            variant={'outlined'}
            className={styles.input}
            label={'Campaign Title:'}
            value={this.state.campaignTitle}
            onChange={e => this.setState({ campaignTitle: e.target.value })} />
          </div>
          <div className={styles.inputContainer}>
          <TextField
            variant={'outlined'}
            className={styles.input}
            label={'Current Location:'}
            value={this.state.currentLocation} />
          </div>
          <div className={styles.inputContainer}>
          <TextField
            multiline
            rows={5}
            variant={'outlined'}
            className={styles.input}
            label={'Game notes:'}
            onChange={e => this.setState({ gameNotes: e.target.value })} />
          </div>
          <div className={styles.inputContainer}>
          <TextField
            multiline
            rows={5}
            variant={'outlined'}
            className={styles.input}
            label={'Proximity Characters:'}
            onChange={e => this.setState({ proximityCharacters: e.target.value })} />
          </div>
          <div className={styles.buttonContainer}>
            <Button theme={'error'} onClick={this.reload}>Reset</Button>
            <Button theme={'primary'} onClick={this.save}>Save</Button>
          </div>
          <div className={styles.lineBreak}>Actions:</div>
          <div className={styles.buttonContainer}>
            <Button theme={'error'} onClick={this.startBattle}>Start battle</Button>
            <Button theme={'primary'} onClick={this.awardXP}>Award XP</Button>
            <Button theme={'success'} onClick={this.giftItem}>Gift Item</Button>
          </div>
      </div>
    )
  }

}

DMScreen.propTypes = {
  playerData: PropTypes.arrayOf(PropTypes.object).isRequired,// TODO: define this
  userId: PropTypes.string.isRequired,
}

export default DMScreen
