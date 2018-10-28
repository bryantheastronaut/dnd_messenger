import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import styles from './loading-spinner.module.scss'

const LoadingSpinner = ({ text, size }) => (
  <div className={styles.container}>
    <div className={cx(styles.rolling, size === 'small' ? styles.small : styles.large)} />
    <div className={styles.text}>{text}</div>
  </div>
)

LoadingSpinner.propTypes = {
  text: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large'])
}

LoadingSpinner.defaultProps = {
  text: '',
  size: 'small'
}

export default LoadingSpinner
