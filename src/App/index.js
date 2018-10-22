import React, { Component } from 'react'

import DiceRoller from '../DiceRoller'
import BottomNav from '../BottomNav'

import styles from './app.module.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentScreen: 'gameScreen',
      isDM: true,
    }
  }

  renderScreen = () => {
    const { currentScreen } = this.state
    if (currentScreen === 'gameScreen') {
      return <DiceRoller />
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