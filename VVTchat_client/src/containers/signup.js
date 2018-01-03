import React, { Component } from 'react';
import { connect } from 'react-redux';
import Store from '../store/store.js';
import { Container, Header, Content, Form, Item, Input, Label, Text, Body, Title, Right, Left, Icon } from 'native-base';
import { View, Alert } from 'react-native';
import { LoadingButton, HeaderBar } from '../components';
import { User_Middleware } from '../store/middlewares';

function mapStateToProps(state) {
    return {
        isDataLoading: state.Loader_Reducer.isDataLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signup: (username, email, password, fullName, goToHome) => { dispatch(User_Middleware.signup(username, email, password, fullName, goToHome)) },
    }
}

class Signup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            fullName: '',
            emailText: '',
            passwordText: '',
        }
    }

    checkUsername = (str) => {

        var validationcode = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;

        if (validationcode.test(str)) {
            return true
        }
        else {
            Alert.alert(
                'error',
                'username should be alphanumeric'
            )
            return false;
        }
    }

    checkPwd = (str) => {
        if (str.length < 6) {
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

    signup = () => {

        if (this.state.username !== '' && this.state.emailText !== '' && this.state.passwordText !== '' && this.state.fullName !== '') {

            if (this.checkEmail(this.state.emailText) && this.checkPwd(this.state.passwordText) && this.checkUsername(this.state.username)) {
                this.props.signup(this.state.username, this.state.emailText, this.state.passwordText, this.state.fullName, this.props.navigation);
            }
        }
    }

    render() {

        return (
            <View style={style.containerStyle}>
                <HeaderBar headerText='Signup' backButton={true} isDataLoading={this.props.isDataLoading} RouteTo={this.props.navigation.navigate} />
                <Content padder contentContainerStyle={style.contentStyle}>
                    <Form style={style.formStyle}>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input onChangeText={(username) => { this.setState({ username }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Full Name</Label>
                            <Input onChangeText={(fullName) => { this.setState({ fullName }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={(emailText) => { this.setState({ emailText }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input secureTextEntry onChangeText={(passwordText) => { this.setState({ passwordText }) }} />
                        </Item>
                    </Form>
                    <LoadingButton action={this.signup} style={style.loginBtn} isLoading={this.props.isDataLoading} buttonText={'Signup'} />
                </Content>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: '#ece9e2'
    },
    loginBtn: { marginTop: 9 },
    contentStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '25%'
    },
    formStyle: {
        width: '100%'
    }
}
