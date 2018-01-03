import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';
import { View, Text, Alert } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Right, Title, Left, Icon } from 'native-base';
import { LoadingButton, HeaderBar } from '../components';
import { Settings_Middleware, User_Middleware } from '../store/middlewares';

function mapStateToProps(state) {
    return {
        isDataLoading: state.Loader_Reducer.isDataLoading,
        currentUser: state.User_Reducer.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateUser: (userNewSettings, RouteTo) => { dispatch(Settings_Middleware.updateUser(userNewSettings, RouteTo)) },
        clearSearchedUser: () => { dispatch(User_Middleware.clearSearchedUser()) }
    }
}

class Settings extends Component {

    constructor(props) {
        super(props)

        console.log(this.props.navigation.state.params.password);

        this.state = {
            username: this.props.navigation.state.params.username,
            fullname: this.props.navigation.state.params.fullname,
            email: this.props.navigation.state.params.email,
            password: this.props.navigation.state.params.password,
            currentPassword: '',
            newPassword: ''
        }
    }

    componentWillMount() {
        this.props.clearSearchedUser();
    }


    checkPwd = (str) => {
        if (str === '') {
            return true // user does not want to change password
        }
        else if (str.length < 6) {
            Alert.alert(
                'error',
                'Password must be 6 character long'
            )
            return false;
        } else if (str.length > 50) {
            Alert.alert(
                'error',
                'Too long password'
            )
            return false
        } else if (str.search(/[^a-zA-Z0-9]/) != -1) {
            Alert.alert(
                'error',
                'No special character'
            )
            return false;
        }
        return true;
    }

    checkEmail = (str) => {
        var validationcode = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (validationcode.test(str)) {
            return true;
        }
        else {
            Alert.alert(
                'error',
                'Badly formatted email'
            )
            return false;
        }
    }

    checkPwdMatch = () => {

        if (this.state.currentPassword === '') {
            return true;  // user does not want to change password
        }
        else if (this.state.currentPassword === this.state.password) {
            return true;
        }
        else {
            Alert.alert(
                'error',
                'Password not match try again!'
            )
            return false
        }
    }

    updateUser = () => {
        if (this.state.fullname !== '' && this.state.email !== '') {

            if (this.checkEmail(this.state.email) &&
                this.checkPwd(this.state.newPassword) &&
                this.checkPwdMatch()) {

                var userNewSettings = {
                    id: this.props.navigation.state.params._id,
                    username: this.state.username,
                    fullname: this.state.fullname,
                    email: this.state.email,
                    password: this.state.newPassword ? this.state.newPassword : this.state.password
                }
                this.props.updateUser(userNewSettings, this.props.navigation.navigate);
            }
        }
        else {
            Alert.alert(
                'error',
                'You left any field'
            )
        }
    }

    render() {
        return (
            <View style={style.containerStyle}>
                <HeaderBar headerText='Settings' rightIcons_addFriends={true} RouteTo={this.props.navigation.navigate} />
                <Content padder contentContainerStyle={style.contentStyle}>
                    <Form style={style.formStyle}>
                        <Item floatingLabel>
                            <Label>Fullname</Label>
                            <Input onChangeText={(fullname) => { this.setState({ fullname }) }} value={this.state.fullname} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={(email) => { this.setState({ email }) }} value={this.state.email} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Current Password</Label>
                            <Input secureTextEntry onChangeText={(currentPassword) => { this.setState({ currentPassword }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>New Password</Label>
                            <Input secureTextEntry onChangeText={(newPassword) => { this.setState({ newPassword }) }} />
                        </Item>
                    </Form>
                    <LoadingButton action={this.updateUser} style={style.loginBtn} isLoading={this.props.isDataLoading} buttonText={'Update'} />
                </Content>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: '#ece9e2'
    },
    loginBtn: { marginTop: 9 },
    contentStyle: {
    },
    formStyle: {
        width: '100%'
    }
}
