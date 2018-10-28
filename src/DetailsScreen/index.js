import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import LoadingSpinner from '../LoadingSpinner'

import styles from './details-screen.module.scss'

const DetailsScreen = ({ playerData, userId }) => (
  <div className={styles.container}>
    <LoadingSpinner text={'loading...'} size={'large'} />
  </div>
)

DetailsScreen.propTypes = {
  playerData: PropTypes.object.isRequired, // TODO: define this
  userId: PropTypes.string.isRequired,
}

export default DetailsScreen
