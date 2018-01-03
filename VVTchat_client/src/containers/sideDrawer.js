import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DrawerItems } from 'react-navigation';
import profilPicture from '../../images/profilePic.png';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { User_Middleware, Settings_Middleware } from '../store/middlewares'

function mapStateToProps(state) {
    return {
        currentUser: state.User_Reducer.currentUser
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchCurrentUser: () => { dispatch(User_Middleware.fetchCurrentUser()) },
        routeToSettings: (username, RouteTo) => { dispatch(Settings_Middleware.routeToSettings(username, RouteTo)) }
    }
}

class SideDrawer extends Component {

    componentWillMount() {
        this.props.fetchCurrentUser();
    }

    render() {
        console.log(this.props.currentUser);
        return (
            <ScrollView>
                <TouchableOpacity style={style.container} onPress={this.props.routeToSettings.bind(this, this.props.currentUser.username, this.props.navigation.navigate)}>
                    <View style={style.profileContainerContent}>
                        <Image source={profilPicture} style={style.profilePicStyle} />
                        <Text style={style.nameTextStyle}>{this.props.currentUser.fullname}</Text>
                    </View>
                </TouchableOpacity>
                <DrawerItems {...this.props} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);

const style = {
    container: {
        flex: 1
    },
    profileContainerContent: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20
    },
    profilePicStyle: {
        width: 70,
        height: 70,

    },
    nameTextStyle: {
        display: 'flex',
        paddingTop: 18,
        paddingLeft: 10,
        flexWrap: 'wrap'
    }
}