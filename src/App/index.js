import React, { Component } from 'react'
import { ThemeProvider } from '@livechat/ui-kit'

import GameScreen from '../GameScreen'
import BottomNav from '../BottomNav'
import StartScreen from '../StartScreen'
import DetailsScreen from '../DetailsScreen'
import PlayerScreen from '../PlayerScreen'
import DMScreen from '../DMScreen'

import { SCREENS } from '../constants/screens'
import firebase, { auth, provider } from '../config/firebase'

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
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      }
    })
  }

  login = () => {
    auth.signInWithPopup(provider)
      .then(res => this.setState({ user: res.user }))
  }

  logout = () => {
    auth.signOut()
      .then(() => this.setState({ user: null }))
  }

  renderScreen = () => {
    const { currentScreen, playerData, user } = this.state
    const userId = user ? user.uid : null
    const gameData = { userId, playerData }
    if (!user) {
      // user must be logged in to do anything
      return <StartScreen userId={userId} login={this.login} />
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
    return <StartScreen userId={userId} logout={this.logout} />
  }

  handleScreenChange = (_, currentScreen) => this.setState({ currentScreen })

  render() {
    const { isDM, currentScreen, user } = this.state
    return (
      <ThemeProvider>
        <div className={styles.container}>
          <div className={styles.mainArea}>
            {this.renderScreen()}
          </div>
          {user &&
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
