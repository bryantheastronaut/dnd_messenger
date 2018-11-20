import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

import styles from './bottom-nav.module.scss'

const style = {
    root: {
        backgroundColor: '#333',
        color: '#a7a7a7',
    }
}

const BottomNav = ({ isDM, changeScreen, currentScreen }) => (
    <BottomNavigation
        showLabels
        value={currentScreen}
        classes={style}
        onChange={changeScreen}>
        {isDM && <BottomNavigationAction label={'DM'} />}
        <BottomNavigationAction label={'Game'} />
        <BottomNavigationAction label={'Details'} />
        <BottomNavigationAction label={'Players'} />
        <BottomNavigationAction label={'Options'} />
    </BottomNavigation>
)

const StyledBottomNav = withStyles({
    root: {
        backgroundColor: 'red'
    }
})(BottomNav)

export default StyledBottomNav
