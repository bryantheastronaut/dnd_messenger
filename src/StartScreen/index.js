import React, { Component } from 'react'
import cx from 'classnames'
import shortid from 'shortid'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import Button from '../common/Button'

import { firestore } from '../config/firebase'

import styles from './start-screen.module.scss'

class StartScreen extends Component {
  constructor() {
    super()
    this.state = {
      roomCode: '',
      isJoiningGame: false,
      message: null,
    }
  }

  startNewGame = () => {
    // this will hit the backend and create a new entry based on a
    // shortId roomCode
    const roomCode = shortid.generate()
    const gameRef = firestore.collection('games').doc(roomCode)
    gameRef.set({ players: [ this.props.userId ]})
    this.setState({
      roomCode,
      message: `Room created. Invite others using the room code: ${roomCode}. You are the DM. Set game data in the game tab or promote another player to DM in the DM tab`
    }, () => this.props.selectGame(roomCode))
  }

  startJoinGame = () => this.setState({ isJoiningGame: true })

  joinGame = () => {
    const { roomCode } = this.state
    const { userId } = this.props
    if (!roomCode) return
    const gameRef = firestore.collection('games').doc(roomCode)
    gameRef.get()
      .then(game => {
        if (game.exists) {
          const { players } = game.data()
          if (players.includes(userId)) {
            this.setState({
              message: 'You are already in this game. Select it from the list below',
            })
          }

        } else {
          this.setState({
            message: 'Sorry, that game was not found. Be sure you entered the code correctly',
          })
        }
      })
  }

  render() {
    const { roomCode, isJoiningGame, message } = this.state
    const { userId, login, logout, myGames, selectGame } = this.props

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
        {message && (
          <div className={styles.message}>
            {message}
          </div>
        )}
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
        {myGames.length > 0 && (
          <div>
            <h3 className={styles.yourGamesTitle}>Your games:</h3>
            <List>
              {myGames.map(game => <ListItem button onClick={() => selectGame(game.title)} key={game.title}>{game.title}</ListItem>)}
            </List>
          </div>
        )}
        <div className={styles.buttonContainer}>
          <Button theme={'error'} onClick={logout}>Logout</Button>
        </div>
      </div>
    )
  }
}

StartScreen.propTypes = {
  login: PropTypes.func,
  logout: PropTypes.func,
}

export default StartScreen
