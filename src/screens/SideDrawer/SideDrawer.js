import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet } from 'react-native';

class SideDrawer extends Component {
    render () {
        return (
            <View style={[{width: Dimensions.get("window").width * 0.75},styles.container]} >
                <Text>Side Drawer</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        backgroundColor: "white",
        flex: 1
    }
});

export default SideDrawer;