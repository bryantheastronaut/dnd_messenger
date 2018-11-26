import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import Button from '../../common/Button'

import styles from './award-player.module.scss'


const AwardPlayer = ({ closeModal }) => {
  const [awardXP, toggleAwardXP] = useState(false)
  const [awardItem, toggleAwardItem] = useState(false)
  const [xpValue, changeXPValue] = useState('')
  const [awardedItems, changeAwardedItems] = useState('')
  const [selectedPlayer, changeSelectedPlayer] = useState('')

  const validateNumber = ({target: { value }}) => {
    if (value.match(/^[0-9]*$/)) changeXPValue(value)
  }

  return (
    <div className={styles.container}>
      <h2>Award Player</h2>
          <Select
            value={selectedPlayer}
            onChange={changeSelectedPlayer}>
            <MenuItem value={''}></MenuItem>

          </Select>
          <FormControlLabel
            label={'Award XP'}
            control={<Switch value={awardXP} onChange={() => toggleAwardXP(!awardXP)} color={'primary'} />} />
          {awardXP &&
            <div className={styles.inputContainer}>
              <TextField
                variant={'outlined'}
                className={styles.input}
                value={xpValue}
                label={'XP'}
                onChange={validateNumber} />
            </div>
          }
          <FormControlLabel
            color={'primary'}
            label={'Award Item'}
            control={<Switch value={awardItem} onChange={() => toggleAwardItem(!awardItem)} color={'primary'} />} />
          {awardItem &&
            <div className={styles.inputContainer}>
              <TextField
                multiline
                rows={'3'}
                label={'Items'}
                variant={'outlined'}
                className={styles.input}
                value={awardedItems}
                onChange={({target: { value } }) => changeAwardedItems(value)} />
            </div>
          }
          <div className={styles.buttonContainer}>
            <Button theme={'error'} style={{ marginRight: '2em' }} onClick={closeModal}>Back</Button>
            <Button theme={'primary'}>Award Items</Button>
          </div>
    </div>
  )
}

AwardPlayer.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default AwardPlayer