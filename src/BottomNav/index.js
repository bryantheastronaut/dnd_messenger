import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

import styles from './bottom-nav.module.scss'

const BottomNav = ({ isDM, changeScreen, currentScreen }) => (
    <BottomNavigation
        showLabels
        value={currentScreen}
        className={styles.container}
        onChange={changeScreen}>
        {isDM && <BottomNavigationAction label={'DM'} />}
        <BottomNavigationAction label={'Game'} />
        <BottomNavigationAction label={'Details'} />
        <BottomNavigationAction label={'Players'} />
        <BottomNavigationAction label={'Options'} />
    </BottomNavigation>
)

export default BottomNav
