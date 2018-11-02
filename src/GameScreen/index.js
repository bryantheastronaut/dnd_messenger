import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import shortid from 'shortid'
import Modal from 'react-modal'
import { MessageList, Message, MessageText } from '@livechat/ui-kit'
import TextField from '@material-ui/core/TextField'

import DiceRoller from '../DiceRoller'
import Button from '../common/Button'

import { SEED_LOG } from '../SAMPLE_DATA'
import styles from './game-screen.module.scss'

class GameScreen extends Component {
  constructor() {
    super()
    this.state = {
      isRolling: false,
      chatLog: SEED_LOG,
      loading: false,
      currentMessage: '',
    }
    this.chat = null
  }

  static propTypes() {
    return {
      playerData: PropTypes.arrayOf(PropTypes.object).isRequired,
      userId: PropTypes.string,
    }
  }

  changeMessage = ({ target: { value } }) => this.setState({ currentMessage: value })

  makeChatTitle = playerId => {
    const { userId, playerData } = this.props
    const player = playerData.find(p => p.playerId === playerId)
    if (player.isDM) {
      return <span className={cx(styles.name, styles.isDM)}>{player.name} (DM)</span>
    }
    if (playerId === userId) {
      return <span className={cx(styles.name, styles.isMe)}>{player.name} (me)</span>
    }
    return <span className={cx(styles.name, styles.isPlayer)}>{player.name}</span>
  }

  renderMessage = message => {
    const msgArray = message.split('\n')
    return <span>
      {msgArray.map((m, i) => m ? (
        <span key={i}>{m}{i !== msgArray.length - 1 && <span><br /><br /></span>}</span>
      ): '')}
    </span>
  }

  sendMessage = () => {
    // send message to db once thats hooked up. for now it should just append it to the state
    // i guess. probably should do that anyways for optimistic updates
    const { userId } = this.props
    const { currentMessage, chatLog } = this.state

    if (!currentMessage) return

    const newChatLog = [
      ...chatLog,
      {
        playerId: userId,
        id: shortid.generate(),
        message: currentMessage
      }
    ]
    this.setState({ chatLog: newChatLog, currentMessage: '' })
  }

  submitResults = ({ dieCount, dieValue, dieSides }) => {
    // also send this to db
    const { userId } = this.props
    const { chatLog } = this.state
    const newChatLog = [
      ...chatLog,
      {
        playerId: userId,
        id: shortid.generate(),
        message: `has rolled ${dieCount}d${dieSides}. Results: ${dieValue}`
      }
    ]
    this.setState({ chatLog: newChatLog, isRolling: false })
  }

  render() {
    const { currentMessage, chatLog, isRolling } = this.state
    return (
      <div className={styles.container}>

        <div className={styles.chatContainer}>
          <MessageList>
            {chatLog.map(entry => (
              <Message key={entry.id}>
                <MessageText>
                  {this.makeChatTitle(entry.playerId)}
                  {this.renderMessage(entry.message)}
                </MessageText>
              </Message>
            ))}
          </MessageList>
        </div>

        {!isRolling && <div className={styles.inputContainer}>
          <TextField
            multiline
            rows={3}
            variant={'outlined'}
            label={'Type your message here...'}
            value={currentMessage}
            className={styles.input}
            onChange={this.changeMessage} />
        </div>}

        <div className={styles.buttonContainer}>
          <Button
            theme={'error'}
            onClick={() => this.setState({ isRolling: true })}>
            Roll
          </Button>
          <Button
            theme={'primary'}
            onClick={this.sendMessage}>
            Send Message
          </Button>
        </div>

        <Modal isOpen={isRolling} style={{content: { width: '100vw', height: '100vh', top: 0, left: 0, padding: 0 } }}>
          <DiceRoller
            submitResults={this.submitResults} />
        </Modal>

      </div>
    )
  }
}

export default GameScreen
