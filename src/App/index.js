import React, { Component } from 'react'
import { ThemeProvider } from '@livechat/ui-kit'

import GameScreen from '../GameScreen'
import BottomNav from '../BottomNav'
import StartScreen from '../StartScreen'
import DetailsScreen from '../DetailsScreen'
import PlayerScreen from '../PlayerScreen'
import DMScreen from '../DMScreen'

import { SCREENS } from '../constants/screens'

import { SEED_PLAYER_DATA } from '../SAMPLE_DATA'

import styles from './app.module.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentScreen: SCREENS.OPTIONS_SCREEN,
      isDM: true,
      playerData: SEED_PLAYER_DATA,
      userId: '1',
    }
  }

  renderScreen = () => {
    const { currentScreen, playerData, userId } = this.state
    const gameData = { userId, playerData }
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
    return <StartScreen changeScreen={this.handleScreenChange} />
  }

  handleScreenChange = (_, currentScreen) => this.setState({ currentScreen })

  render() {
    const { isDM, currentScreen } = this.state
    return (
      <ThemeProvider>
        <div className={styles.container}>
          <div className={styles.mainArea}>
            {this.renderScreen()}
          </div>
          <BottomNav
            isDM={isDM}
            changeScreen={this.handleScreenChange}
            currentScreen={currentScreen} />
        </div>
      </ThemeProvider>
    )
  }
}

export default App;
