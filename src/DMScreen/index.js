import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'

import Button from '../common/Button'
import AwardPlayer from './AwardPlayer'

// import LoadingSpinner from '../LoadingSpinner'

import styles from './dm-screen.module.scss'


const makeInput = inputProps => (
  <div className={styles.inputContainer}>
    <TextField
      variant={'outlined'}
      className={styles.input}
      {...inputProps} />
  </div>
)

const reload = () => { /** refetch data */}
const save = () => { /** call firebase to save game data */}

const DMScreen = props => {
  const [title, changeTitle] = useState('')
  const [currentLocation, changeCurrentLocation] = useState('')
  const [gameNotes, changeGameNotes] = useState('')
  const [modalIsOpen, toggleModal] = useState(false)
  return (
    <div className={styles.container}>
      {!modalIsOpen &&
        <>
          {makeInput({
            value: title,
            label: 'Campaign Title',
            onChange: e => changeTitle(e.target.value),
          })}
          {makeInput({
            value: currentLocation,
            label: 'Current Location',
            onChange: e => changeCurrentLocation(e.target.value),
          })}
          {makeInput({
            value: gameNotes,
            rows: 5,
            multiline: true,
            label: 'Game notes',
            onChange: e=> changeGameNotes(e.target.value),
          })}

          <div className={styles.buttonContainer}>
            <Button theme={'error'} onClick={reload}>Reset</Button>
            <Button theme={'primary'} onClick={save}>Save</Button>
          </div>
          <div className={styles.lineBreak}>Actions:</div>
          <div className={styles.buttonContainer}>
            <Button theme={'primary'} onClick={() => toggleModal(true)}>Award Player</Button>
          </div>
        </>
      }
      <Modal
        isOpen={modalIsOpen}
        style={{
          content: { width: '100vw', height: '100vh', top: 0, left: 0, padding: 0 }
        }}>
        <AwardPlayer closeModal={() => toggleModal(false)} />
      </Modal>
    </div>
  )
}

DMScreen.propTypes = {
  playerData: PropTypes.arrayOf(PropTypes.object).isRequired,// TODO: define this
  userId: PropTypes.string.isRequired,
}

export default DMScreen
