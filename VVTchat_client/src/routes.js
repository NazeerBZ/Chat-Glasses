import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Login, Signup, Friends, AddFriends, Logout, SideDrawer, Settings, ChatBox } from './containers';

const SubRoutes = DrawerNavigator({
    'Friends': {
        screen: Friends
    },
    'Add Friends': {
        screen: AddFriends
    },
    'Logout': {
        screen: Logout
    },
},
    {
        contentComponent: SideDrawer,
    }
)

const Routes = StackNavigator({
    'Login': {
        screen: Login
    },
    'Signup': {
        screen: Signup
    },
    'SubRoutes': {
        screen: SubRoutes
    },
    'Settings': {
        screen: Settings
    },
    'ChatBox': {
        screen: ChatBox
    }
}, {
        navigationOptions: {
            header: null
        }
    })


export default Routes;