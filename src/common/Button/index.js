import React from 'react'
import cx from 'classnames'

import styles from './button.module.scss'

const Button = ({ onClick, theme, children }) => {
  return (
    <button
      className={cx(styles.button,
        theme === 'primary' && styles.primary,
        theme === 'success' && styles.success,
        theme === 'error' && styles.error
      )}
      onClick={onClick}>{children}</button>
  )
}

export default Button