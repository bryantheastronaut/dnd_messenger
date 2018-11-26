import React, { Component } from 'react'
import { ThemeProvider } from '@livechat/ui-kit'

import GameScreen from '../GameScreen'
import BottomNav from '../BottomNav'
import StartScreen from '../StartScreen'
import DetailsScreen from '../DetailsScreen'
import PlayerScreen from '../PlayerScreen'
import DMScreen from '../DMScreen'

import { SCREENS } from '../constants/screens'
import { auth, provider, firestore } from '../config/firebase'

import { SEED_PLAYER_DATA } from '../SAMPLE_DATA'

import styles from './app.module.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentScreen: SCREENS.OPTIONS_SCREEN,
      isDM: true,
      playerData: SEED_PLAYER_DATA,
      user: null,
      gameData: null,
      gameId: '',
      myGames: [],

    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user }, this.loadGames)
      }
    })
  }

  loadGames = () => {
    const { user } = this.state
    const userId = user.uid
    const gamesRef = firestore.collection('games')
    gamesRef.where('players', 'array-contains', userId).get()
      .then(games => {
        const myGames = []
        games.forEach(game => myGames.push({title: game.id}))
        this.setState({ myGames })
      })
  }

  login = () => {
    auth.signInWithPopup(provider)
      .then(res => this.setState({ user: res.user }, this.loadGames))
  }

  logout = () => {
    auth.signOut()
      .then(() => this.setState({ user: null, myGames: [], gameData: null }))
  }

  selectGame = roomCode => {
    const gameRef = firestore.collection('games').doc(roomCode)
    gameRef.get()
      .then(game => {
        if (game.exists) {
          this.setState({ gameData: game.data(), gameId: game.id })
        }
      })
  }

  renderScreen = () => {
    const { currentScreen, playerData, user, myGames, gameId } = this.state
    const { login, logout, selectGame } = this
    const userId = user ? user.uid : null
    const gameData = { userId, playerData, gameId }
    const startScreenProps = { userId, myGames, login,logout, selectGame }
    if (!user) {
      // user must be logged in to do anything
      return <StartScreen { ...startScreenProps } />
    }

    if (currentScreen === SCREENS.GAME_SCREEN) {
      return <GameScreen {...gameData} />
    }
    if (currentScreen === SCREENS.DETAILS_SCREEN) {
      return <DetailsScreen {...gameData} />
    }
    if (currentScreen === SCREENS.PlAYERS_SCREEN) {
      return <PlayerScreen {...gameData} />
    }
    if (currentScreen === SCREENS.DM_SCREEN) {
      return <DMScreen {...gameData} />
    }
    // else return the start screen
    return <StartScreen { ...startScreenProps } />
  }

  handleScreenChange = (_, currentScreen) => this.setState({ currentScreen })

  render() {
    const { isDM, currentScreen, user, gameData } = this.state
    return (
      <ThemeProvider>
        <div className={styles.container}>
          <div className={styles.mainArea}>
            {this.renderScreen()}
          </div>
          {user && gameData &&
            <BottomNav
              isDM={isDM}
              changeScreen={this.handleScreenChange}
              currentScreen={currentScreen} />
            }
        </div>
      </ThemeProvider>
    )
  }
}

export default App;
