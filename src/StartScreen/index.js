import React, { Component } from 'react'
import cx from 'classnames'
import shortid from 'shortid'
import PropTypes from 'prop-types'

import styles from './start-screen.module.scss'

class StartScreen extends Component {
  constructor() {
    super()
    this.state = {
      roomCode: '',
      isJoiningGame: false,
      message: null,
      yourGames: [{ title: 'Hero\'s Quest' }],
    }
  }

  startNewGame = () => {
    // this will hit the backend and create a new entry based on a
    // shortId roomCode
    const roomCode = shortid.generate()
    this.setState({ message: `Room created. Invite others using the room code: ${roomCode}`})
  }

  startJoinGame = () => this.setState({ isJoiningGame: true })

  joinGame = () => {
    // This is gonna have to take the room code and search the db.
    // If it doesnt exist, set an error
    // if it does, go to player screen
  }

  render() {
    const { roomCode, isJoiningGame, message, yourGames } = this.state
    return (
      <div className={styles.container}>
        <h1>RPG Messenger</h1>
        <div className={cx(styles.buttonContainer, isJoiningGame && styles.fade)}>
          <button className={cx(styles.button, styles.primary)} onClick={this.startNewGame}>+ New Game</button>
          <button className={cx(styles.button, styles.secondary)} onClick={this.startJoinGame}>Join Game</button>
        </div>
        {isJoiningGame && (
          <div style={{ marginTop: '5em', width: '100%' }}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Enter your room code:</label>
              <input value={roomCode} onChange={e => this.setState({ roomCode: e.target.value })} className={styles.input} />
            </div>

            <div className={styles.buttonContainer}>
              <button className={cx(styles.button, styles.warning)} onClick={() => this.setState({ isJoiningGame: false, roomCode: '' })}>Go back</button>
              <button className={cx(styles.button, styles.primary)} onClick={this.joinGame}>Join Game</button>
            </div>

          </div>
        )}
        {message && (
          <div className={styles.message}>
            {message}
          </div>
        )}
        {yourGames.length > 0 && (
          <ul className={styles.gamesList}>
            <label className={styles.label}>Current games:</label>
            {yourGames.map(game => <li className={styles.singleGame} key={game.title}>{game.title}</li>)}
          </ul>
        )}
      </div>
    )
  }
}

StartScreen.propTypes = {
  changeScreen: PropTypes.func.isRequired,
}

export default StartScreen
