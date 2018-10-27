import React, { Component } from 'react'

import GameScreen from '../GameScreen'
import BottomNav from '../BottomNav'
import StartScreen from '../StartScreen'

import { SEED_PLAYER_DATA } from '../SAMPLE_DATA'

import styles from './app.module.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentScreen: 'gameScreen',
      isDM: false,
      playerData: SEED_PLAYER_DATA,
      userId: '1',
    }
  }

  renderScreen = () => {
    const { currentScreen, playerData, userId } = this.state
    if (currentScreen === 'optionsScreen') {
      return <StartScreen changeScreen={this.handleScreenChange} />
    }
    if (currentScreen === 'gameScreen') {
      return <GameScreen playerData={playerData} userId={userId} />
    }
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
