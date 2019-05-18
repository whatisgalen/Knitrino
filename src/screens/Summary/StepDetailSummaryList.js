import React, {Component} from 'react';
import {Modal, View, Image, Text, FlatList, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput} from 'react-native';
import StepListCard from '../../components/StepListCard';

class StepDetailSummaryList extends Component {
    genStepCards = () => {
        let stepCards = [];
        let stepStr = "";
        console.log("in genStepCards");
        for(let i=0; i < this.props.stepList.length; i++) {
            stepStr = ""+i+" - "+this.props.stepList[i].text;
            if(stepStr.length > 40) {
                stepStr = stepStr.subString(0,40)+"...";
            }
            stepCards.push({key: stepStr});
        }
        return stepCards;
    }
    
    render() {
        return <FlatList 
                    data={this.genStepCards}
                    renderItem={({item}) => {
                        <StepListCard stepStr={item.key} />
                        }} />;
    }
}

const styles = StyleSheet.create({
    stepCard: {
        marginHorizontal:2,
        marginBottom: 2,
        borderColor: "#000000",
        borderWidth: 2
    }
});

export default StepDetailSummaryList;