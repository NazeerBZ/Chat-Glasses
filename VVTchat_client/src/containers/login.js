import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Container, Content, Form, Item, Input, Label, Right, Title, Left, Icon } from 'native-base';
import Logo from '../../images/logo.png';
import { AsyncStorage, Image, View, Text, Alert, ActivityIndicator } from 'react-native';
import { LoadingButton } from '../components';
import { User_Middleware } from '../store/middlewares';

function mapStateToProps(state) {
    return {
        isDataLoading: state.Loader_Reducer.isDataLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username, password, RouteTo) => { dispatch(User_Middleware.login(username, password, RouteTo)) },
    }
}

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            passwordText: '',
            fetchingData: true //fetching going on
        }
    }

    componentWillMount() {

        AsyncStorage.getItem('isLoggedIn')
            .then((result) => {
                if (JSON.parse(result)) {
                    const resetAction = NavigationActions.reset({
                        index: 0, // clear routes history
                        actions: [NavigationActions.navigate({
                            routeName: 'SubRoutes'
                        })]
                    })
                    this.props.navigation.dispatch(resetAction);
                }
                else {
                    this.setState({ fetchingData: false }); //fetching completed
                }
            })
            .catch((error) => {
                Alert.alert(
                    'error',
                    error.message
                )
            })
    }

    login = () => {

        if (this.state.username !== '' && this.state.passwordText !== '') {
            this.props.login(this.state.username, this.state.passwordText, this.props.navigation);
        }
    }

    goToSignup = () => {
        if (this.props.isDataLoading === false) {
            this.props.navigation.navigate('Signup')
        }
    }

    render() {

        if (this.state.fetchingData === false) {
            return (
                <View style={style.containerStyle}>
                    <Content padder contentContainerStyle={style.contentStyle}>
                        <Image source={Logo}/>
                        <Form style={style.formStyle}>
                            <Item floatingLabel>
                                <Label>Username</Label>
                                <Input onChangeText={(username) => { this.setState({ username }) }} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input secureTextEntry onChangeText={(passwordText) => { this.setState({ passwordText }) }} />
                            </Item>
                        </Form>
                        <LoadingButton action={this.login} style={style.loginBtn} isLoading={this.props.isDataLoading} buttonText={'Login'} />
                        <Title onPress={this.goToSignup} style={style.createAccountStyle}>Create a new account <Text style={style.signupStyle}>Signup</Text></Title>
                    </Content>
                </View>
            )
        }
        else {
            return (
                <ActivityIndicator
                    color="black"
                    size="large"
                    style={style.centering}
                    animating={true}
                />
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: '#ece9e2'
    },
    loginBtn: { marginTop: 9 },
    createAccountStyle: { color: 'black', fontSize: 15, marginTop: 7 },
    signupStyle: { color: '#6d62a2' },
    contentStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formStyle: {
        width: '100%'
    },
    centering: {
        backgroundColor: '#ece9e2',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
}