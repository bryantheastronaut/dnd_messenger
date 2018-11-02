import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import LoadingSpinner from '../LoadingSpinner'

import styles from './player-screen.module.scss'

const PlayerScreen = ({ playerData, userId }) => (
  <div className={styles.container}>
    <LoadingSpinner text={'loading...'} size={'large'} />
  </div>
)

PlayerScreen.propTypes = {
  playerData: PropTypes.arrayOf(PropTypes.object).isRequired, // TODO: define this
  userId: PropTypes.string.isRequired,
}

export default PlayerScreen
