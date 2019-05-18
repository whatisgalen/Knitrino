import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';


class StepListCard extends Component {

    state = {
        expanded: false,
        text: this.props.stepStr
    };

    toggleExpand = () => {
        const currentExpanded = this.state.expanded;
        this.setState({
            expanded: !currentExpanded 
        }, ()=>{this.resetText()});
    }

    resetText = () => {
        if(this.state.expanded) {
            this.setState({ text: this.props.full });
        } else {
            this.setState({ text: this.props.stepStr });
        }
    }

    render() {
        return (
            <View style={styles.stepCard}  >
                <TouchableOpacity onPress={this.toggleExpand}>
                    <Text style={styles.stepCardText}>{this.state.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    stepCard: {
        marginHorizontal:'1%',
        // marginBottom: '1%', //seems to break flatList scrolling
        marginBottom: 1,
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 1,
        padding: '1%'
    },
    stepCardText : {
        fontSize: 14
    }
});

export default StepListCard;