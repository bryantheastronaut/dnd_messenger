import React from 'react'

import styles from './bottom-nav.module.scss'

const BottomNav = ({ isDM, changeScreen }) => (
    <div className={styles.container}>
        {isDM && <div className={styles.navItem} onClick={() => changeScreen('dmScreen')}>DM</div>}
        <div className={styles.navItem} onClick={() => changeScreen('gameScreen')}>Game</div>
        <div className={styles.navItem} onClick={() => changeScreen('detailsScreen')}>Details</div>
        <div className={styles.navItem} onClick={() => changeScreen('playerScreen')}>Players</div>
        <div className={styles.navItem} onClick={() => changeScreen('optionsScreen')}>Options</div>
    </div>
)

export default BottomNav
