import React, { Component } from 'react'

import GameScreen from '../GameScreen'
import BottomNav from '../BottomNav'
import StartScreen from '../StartScreen'
import DetailsScreen from '../DetailsScreen'
import PlayerScreen from '../PlayerScreen'
import DMScreen from '../DMScreen'

import { SEED_PLAYER_DATA } from '../SAMPLE_DATA'

import styles from './app.module.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentScreen: 'gameScreen',
      isDM: true,
      playerData: SEED_PLAYER_DATA,
      userId: '1',
    }
  }

  renderScreen = () => {
    const { currentScreen, playerData, userId } = this.state
    const gameData = { userId, playerData }
    if (currentScreen === 'gameScreen') {
      return <GameScreen {...gameData} />
    }
    if (currentScreen === 'detailsScreen') {
      return <DetailsScreen {...gameData} />
    }
    if (currentScreen === 'playerScreen') {
      return <PlayerScreen {...gameData} />
    }
    if (currentScreen === 'dmScreen') {
      return <DMScreen {...gameData} />
    }
    // else return the start screen
    return <StartScreen changeScreen={this.handleScreenChange} />
  }

  handleScreenChange = (currentScreen) => this.setState({ currentScreen })

  render() {
    const { isDM } = this.state
    return (
      <div className={styles.container}>
        {this.renderScreen()}
        <BottomNav changeScreen={this.handleScreenChange} isDM={isDM} />
      </div>
    )
  }
}

export default App;
