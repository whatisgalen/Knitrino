import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, FlatList, TouchableHighlight, ImageBackground, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StepListCard from '../../components/StepListCard';
// import startMainTabs from '../MainTabs/startMainTabs';

class SummaryScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    state = {
        section: "",
        // step: 0,
        stringKeys: []
    };

    Toggler = (newSection) => {
        // console.log("param: "+newSection);
        if(this.state.section !== newSection) {
            this.setState({
                section: (newSection)
            }, () => {this.genStepCards();});
        }
    }

    genStepCards = () => {
        let stepCards = [];
        let stepStr = "";
        let j = 1;
        let theKey;
        for(let i=0; i < steps.length; i++) {
            if(steps[i].sectionName == this.state.section) {
                // console.log(steps[i].text);
                stepStr = ""+(j++)+" - "+steps[i].text;
                if(stepStr.length > 50) {
                    stepStr = stepStr.substring(0,50)+"...";
                }
                theKey = ""+i+""+j+""+steps[i].text.length+"";
                stepCards.push({
                    key: theKey, 
                    value: stepStr,
                    // expanded: false, 
                    full: steps[i].text,
                    altKey: theKey
                });
            }
        }
        this.setState({
            stringKeys: stepCards
        });
    }

    exitSummary = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    }

    render () {
        return (
            <View style={styles.container} >
                <View style={styles.headerContainer}>
                    <TouchableHighlight 
                        onPress={()=>this.Toggler(sections[0])} 
                        underlayColor={'#7ab7bc'}
                        style={styles.header}>
                        <Text style={styles.headerBtnText}>Body</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        onPress={()=>this.Toggler(sections[1])} 
                        underlayColor={'#7a96bc'}
                        style={styles.header}>
                        <Text style={styles.headerBtnText}>Sleeves</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        onPress={()=>this.Toggler(sections[2])} 
                        underlayColor={'#7abca1'}
                        style={styles.header}>
                        <Text style={styles.headerBtnText}>Yoke</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        onPress={()=>this.Toggler(sections[3])} 
                        underlayColor={'#99c699'}
                        style={styles.header}>
                        <Text style={styles.headerBtnText}>Finishing</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.listContainer}>
                    <FlatList 
                    // style={styles.listContainer}
                    data={this.state.stringKeys}
                    extraData={this.state.stringKeys}
                    keyExtractor={item => item.key}
                    renderItem={({item}) => (
                            <StepListCard 
                                stepStr={item.value}
                                full={item.full}
                                altKey={item.altKey}
                                 />
                        )} />
                </View>
                <View style={styles.return}>
                    <Text style={styles.retText}>Back to Pattern</Text>
                    <TouchableOpacity onPress={this.exitSummary}>
                        <View>
                            <Icon size={60} name="md-arrow-back" color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const sections = ["Body","Sleeves","Yoke","Finishing"];

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        padding: '2%'
    },
    headerContainer: {
        flexDirection: 'row',
        paddingHorizontal: '5%'
    },
    header: {
        marginRight: '2%',
        paddingHorizontal: '2%',
        borderColor: "#000000",
        borderRightWidth: 2,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRadius: 1
    },
    headerBtnText: {
        fontSize: 16
    },
    listContainer: {
        // height: '75%',
        flexGrow: 1
    },
    return: {
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 20,
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 3,
        padding: '5%',
        // marginTop: '1%'

    },
    retText: {
        fontSize: 20
    }
});

const steps = [
    {
        sectionName: "Body",
        text: "Using 32\" circular needles one size smaller than you swatched with, {cast on} cast on stitches. Place a marker at the end, and join in the round.",
        imgSrc: "",
        counter: false 
    },
    {
        sectionName: "Body",
        text: "With yarn in front, slip 1 stitch as if to purl, then knit 1 stitch. Repeat to end.",
        imgSrc: "",
        counter: true
    },
    {
        sectionName: "Body",
        text: "Purl 1, then with yarn in back, slip 1 as if to purl. Repeat to end.",
        imgSrc: "",
        counter: true
    },
    {
        sectionName: "Body",
        text: "*Purl 1, then slip 1 stitch onto cable needle and hold in front. Purl 1, then knit 1 from the cable needle. Knit 1. Repeat from * to end of round. Repeat from * until 2 stitches remain. Purl 2.",
        imgSrc: "",
        counter: true
    },
    {
        sectionName: "Body",
        text: "Change to {needle size 2} {needle type2}. Purl 2, knit 2 until ribbing measures 2\" from cast on.",
        imgSrc: "",
        counter: true
    },
    {
        sectionName: "Body",
        text: "Change to {needle size 3} {needle type 2}. Knit stockinette stitch in the round until sweater body measures 15.5\" in length.",
        imgSrc: "",
        counter: true
    },
    {
        sectionName: "Body",
        text: "That's it! Now take {underarm join} stitches on either side of the body and put them on threads or a stitch holder. Be sure there are exactly the same number of stitches on the front and back, which should be ({cast on} - {underarm join})/2). Place front and back stitches on separate holder(s).",
        imgSrc: "",
        counter: false
    },
    {
        sectionName: "Body",
        text: "That's it! Now it\'s time for sleeves.",
        imgSrc: "",
        counter: false
    },
    {
        sectionName: "Yoke",
        text: "Now the fun begins - uniting the sleeves with the body.",
        imgSrc: "",
        counter: false 
    },
    {
        sectionName: "Yoke",
        text: "Place first and last {underarm join}/2 stitches of the body on a holder. Using largest circular need and starting at the back left sleeve, knit ({sleeve max} - {underarm join}) sleeve stitches, and place a marker. Knit the next (({cast on} - 2*{underarm join})/4) stitches on the front, and place next {underarm join} stitches of body on holder. Knit ({sleeve max} - {underarm join}) stitches on the right sleeve and place marker. Knit the next (({cast on} - 2*{underarm join})/4) stitches of back, place marker and join in the round ({yoke} stitches.",
        imgSrc: "",
        counter: true
    },
    {
        sectionName: "Yoke",
        text: "Knit in the round until yoke is {yoke depth}/2 inches, about ({yoke depth}*{vgauge}/2) rounds.",
        imgSrc: "",
        counter: true
    },
    {
        sectionName: "Yoke",
        text: "Knit 1, knit 2 together, all the way around, ({yoke}*2/3) stitches remaining.",
        imgSrc: "",
        counter: true
    },
    {
        sectionName: "Yoke",
        text: "Knit in the round for another ROUND({yoke depth}*{vgauge}/4) rounds, about ({yoke depth}/4) inches.",
        imgSrc: "",
        counter: true
    },
    {
        sectionName: "Yoke",
        text: "Knit 1, knit 2 together, all the way around, ROUND(({yoke}*(2/3)^2)) stitches remaining.",
        imgSrc: "",
        counter: true
    },
    {
        sectionName: "Yoke",
        text: "Knit in the round for another ROUND({yoke depth}*{vgauge}/4) rounds, about ({yoke depth}/4) inches.",
        imgSrc: "",
        counter: false
    }
];

export default SummaryScreen;