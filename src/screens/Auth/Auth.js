import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import backgroundImg from "../../assets/background.jpg";

class AuthScreen extends Component {
    loginHandler =() => {
        startMainTabs();
    }
    render () {
        return (
            <View style={styles.container}>
                <ImageBackground source={backgroundImg} style={styles.background}>
                {/* <Text>Let's get Started!</Text> */}
            <View style={styles.btn}>
                <Button 
                    title="Make this sweater!" 
                    onPress={this.loginHandler} />
            </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 2,
        flexDirection: 'column',
        padding: 20
        // padding: '12%'
    },
    btn: {
        flex:1,
        alignSelf: 'center',
        marginTop: 60,
        width: 200,
        height: 40
        // marginTop: '40%',
        // width: '50%',
        // height: '10%'

    },
    background: {
        width: '100%',
        height: '100%'
        // width: 150,
        // height: 400
    }
});

export default AuthScreen;