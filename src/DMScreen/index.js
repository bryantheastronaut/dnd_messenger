import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import LoadingSpinner from '../LoadingSpinner'

import styles from './dm-screen.module.scss'

const DMScreen = ({ playerData, userId }) => (
  <div className={styles.container}>
    <LoadingSpinner text={'loading...'} size={'large'} />
  </div>
)

DMScreen.propTypes = {
  playerData: PropTypes.object.isRequired, // TODO: define this
  userId: PropTypes.string.isRequired,
}

export default DMScreen
