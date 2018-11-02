import React, { Component } from 'react'
import cx from 'classnames'
import shortid from 'shortid'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import Button from '../common/Button'

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
    const { userId, login, logout } = this.props

    if (!userId) {
      return (
        <div className={styles.container}>
          <h1>RPG Messenger</h1>
          <div className={styles.buttonContainer}>
            <Button theme={'primary'} onClick={login}>Login / Signup</Button>
          </div>
        </div>
      )
    }
    return (
      <div className={styles.container}>
        <h1>RPG Messenger</h1>
        <div className={cx(styles.buttonContainer, isJoiningGame && styles.fade)}>
          <Button theme={'primary'} onClick={this.startNewGame}>+ New Game</Button>
          <Button theme={'success'} onClick={this.startJoinGame}>Join Game</Button>
        </div>
        {isJoiningGame && (
          <div style={{ marginTop: '5em', width: '100%' }}>
            <div className={styles.inputContainer}>
              <TextField
                label={'Enter your room code'}
                variant={'outlined'}
                value={roomCode}
                className={styles.input}
                onChange={e => this.setState({ roomCode: e.target.value })} />
            </div>

            <div className={styles.buttonContainer}>
              <Button
                theme={'error'}
                onClick={() => this.setState({ isJoiningGame: false, roomCode: '' })}>
                Go back
              </Button>
              <Button theme={'success'} onClick={this.joinGame}>
                Join Game
              </Button>
            </div>

          </div>
        )}
        {message && (
          <div className={styles.message}>
            {message}
          </div>
        )}
        {yourGames.length > 0 && (
          <div>
            <h3 className={styles.yourGamesTitle}>Your games:</h3>
            <List>
              {yourGames.map(game => <ListItem button key={game.title}>{game.title}</ListItem>)}
            </List>
          </div>
        )}
        <Button theme={'error'} onClick={logout}>Logout</Button>
      </div>
    )
  }
}

StartScreen.propTypes = {
  login: PropTypes.func,
  logout: PropTypes.func,
}

export default StartScreen
