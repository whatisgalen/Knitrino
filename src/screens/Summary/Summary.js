import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, FlatList, TouchableHighlight, ImageBackground, Dimensions} from 'react-native';
import { connect } from 'react-redux';
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
        castOn: false,
        underArmJoin: false,
        increaseTimes: false,
        sleeveMax: false,
        sleeveRows: false,
        sleeveLength: false,
        yoke: false,
        yokeDepth: false,
        stringKeys: []
    };

    componentDidMount() {
        const newCastOn = CastOn(this.props.size, this.props.gauge);
        const newUnderArmJoin = UnderArmJoin(newCastOn);
        // const newSleeveMax = SleeveMax(newCastOn);
        // const newSleeveRows = SleeveRows(this.props.gauge);
        // const newSleeveLength = SleeveLength(this.props.size);
        // const newSleeveCastOn = SleeveCastOn(newCastOn);
        // const newIncreaseTimes = IncreaseTimes(newSleeveMax, newSleeveCastOn);
        // const newYoke = Yoke(newCastOn);
        // const newYokeDepth = YokeDepth(newYoke, this.props.gauge); 
        this.setState({
            ...this.state,
            castOn: newCastOn,
            underArmJoin: newUnderArmJoin,
            // increaseTimes: newIncreaseTimes,
            // sleeveMax: newSleeveMax,
            // sleeveRows: newSleeveRows,
            // sleeveLength: newSleeveLength,
            // yoke: newYoke,
            // yokeDepth: newYokeDepth
        });
    }

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
        for(let i=0; i < this.steps.length; i++) {
            if(this.steps[i].sectionName == this.state.section) {
                // console.log(steps[i].text);
                stepStr = ""+(j++)+" - "+this.steps[i].text;
                if(stepStr.length > 50) {
                    stepStr = stepStr.substring(0,50)+"...";
                }
                theKey = ""+i+""+j+""+this.steps[i].text.length+"";
                stepCards.push({
                    key: theKey, 
                    value: stepStr,
                    full: this.steps[i].text,
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

    steps = [
        {
            sectionName: "Body",
            text: "Using 32\" circular needles one size smaller than you swatched with,  "+this.state.castOn+" stitches. Place a marker at the end, and join in the round.",
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
            text: "That's it! Now take "+this.state.underArmJoin+" stitches on either side of the body and put them on threads or a stitch holder. Be sure there are exactly the same number of stitches on the front and back, which should be "+((this.state.castOn - this.state.underArmJoin)/2)+". Place front and back stitches on separate holder(s).",
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
            sectionName: "Sleeve1",
            text: "Using 32\" circular needles, cast on "+this.state.castOn+" stitches. Place a marker at the end, and join in the round.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "With yarn in front, slip 1 stitch as if to purl, then knit 1 stitch. Repeat to end.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "Purl 1, then with yarn in back, slip 1 as if to purl. Repeat to end.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "*Purl 1, then slip 1 stitch onto cable needle and hold in front. Purl 1, then knit 1 from the cable needle. Knit 1. Repeat from * until 2 stitches remain. Purl 2.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "Change to {needle size 2} {needle type2}. Purl 2, knit 2 until ribbing measures 2\" from cast on. ",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "Change to {needle size 3} {needle type3}. Knit 14 rounds in stockinette stitch.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "Now increase 2 stitches: Knit 1, make 1 left, knit to last stitch, make 1 right, knit one. ",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "Knit 4 rounds in stockinette.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "Repeat steps 7 and 8 "+this.state.increaseTimes+" times, until you have "+this.state.sleeveMax+" stitches",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "Continue knitting in stockinette stitch for "+this.state.sleeveRows+" rows, until your sleeve is "+this.state.sleeveLength+" from cast on, or desired length. ",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "That's it! Now take the "+this.state.underArmJoin+" stitches directly above the underarm increases and put them on threads or a stitch holder. Put remaining stitches on a separate holder.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "Just one more sleeve to go!",
            imgSrc: "",
            counter: false
        },
        { //sleeve cast on or (body) cast on?
            sectionName: "Sleeve2",
            text: "Using size 4 32\" circular needles, cast on "+this.state.castOn+" stitches. Place a marker at the end, and join in the round.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve2",
            text: "With yarn in front, slip 1 stitch as if to purl, then knit 1 stitch. Repeat to end.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve2",
            text: "Purl 1, then with yarn in back, slip 1 as if to purl. Repeat to end.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve2",
            text: "*Purl 1, then slip 1 stitch onto cable needle and hold in front. Purl 1, then knit 1 from the cable needle. Knit 1. Repeat from * until 2 stitches remain. Purl 2.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve2",
            text: "Change to {needle size 2} {needle type2}. Purl 2, knit 2 until ribbing measures 2\" from cast on. ",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve2",
            text: "Change to {needle size 3} {needle type3}. Knit 14 rounds in stockinette stitch.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve2",
            text: "Now increase 2 stitches: Knit 1, make 1 left, knit to last stitch, make 1 right, knit one. ",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve2",
            text: "Knit 4 rounds in stockinette.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve2",
            text: "Repeat steps 7 and 8 "+this.state.increaseTimes+" times, until you have "+this.state.sleeveMax+" stitches",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve2",
            text: "Continue knitting in stockinette stitch for "+this.state.sleeveRows+" rows, until your sleeve is "+this.state.sleeveLength+" from cast on, or desired length. ",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve2",
            text: "That's it! Now take the "+this.state.underArmJoin+" stitches directly above the underarm increases and put them on threads or a stitch holder. Put remaining stitches on a separate holder.",
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
            text: "Place first and last "+(this.state.underArmJoin/2)+" stitches of the body on a holder. Using largest circular need and starting at the back left sleeve, knit "+(this.state.sleeveMax - this.state.underArmJoin)+" sleeve stitches, and place a marker. Knit the next "+((this.state.castOn - (2*this.state.underArmJoin))/4)+" stitches on the front, and place next "+this.state.underArmJoin+" stitches of body on holder. Knit "+(this.state.sleeveMax - this.state.underArmJoin)+" stitches on the right sleeve and place marker. Knit the next "+((this.state.castOn - (2*this.state.underArmJoin))/4)+" stitches of back, place marker and join in the round "+this.state.yoke+" stitches.",
            imgSrc: "",
            counter: true
        },
        {
            sectionName: "Yoke",
            text: "Knit in the round until yoke is "+(this.state.yokeDepth/2)+" inches, about ({yoke depth}*{vgauge}/2) rounds.",
            imgSrc: "",
            counter: true
        },
        {
            sectionName: "Yoke",
            text: "Knit 1, knit 2 together, all the way around, "+(Math.round(this.state.yoke*(2/3)))+" stitches remaining.",
            imgSrc: "",
            counter: true
        },
        {
            sectionName: "Yoke",
            text: "Knit in the round for another ROUND({yoke depth}*{vgauge}/4) rounds, about "+(Math.round(this.state.yokeDepth/4))+" inches.",
            imgSrc: "",
            counter: true
        },
        {
            sectionName: "Yoke",
            text: "Knit 1, knit 2 together, all the way around, "+(Math.round(this.state.yoke*((2/3)^2)))+" stitches remaining.",
            imgSrc: "",
            counter: true
        },
        {
            sectionName: "Yoke",
            text: "Knit in the round for another ROUND({yoke depth}*{vgauge}/4) rounds, about "+(Math.round(this.state.yokeDepth/4))+" inches.",
            imgSrc: "",
            counter: false
        }
    ];

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
function MRound(number, multipleOf) { let rounded = number; while(rounded % multipleOf != 0) { rounded % multipleOf >= (multipleOf/2) ? rounded++ : rounded--; } return rounded;}
function CastOn(size, gauge) { return MRound(Math.round(size * gauge), 4);}
function UnderArmJoin(castOn) { return MRound( Math.round(castOn * 0.08), 2);}
function SleeveCastOn(castOn) { return MRound(Math.round(castOn/5), 4);}
function SleeveMax(castOn) { let sleeveMax = Math.round(castOn * 0.333333); if(sleeveMax % 2 != 0) {sleeveMax++;} return sleeveMax;}
function SleeveRows(gauge) { return MRound(((18-13.1)*Math.round(gauge/0.73)), 2);}
function IncreaseTimes(sleeveMax, sleeveCastOn) { return Math.round((sleeveMax - sleeveCastOn)/ 2);}
function SleeveLength(size) { if(size <= 44) {return 18;} else if(size > 50) { return 19.75;} else { return 19; }}
function Yoke(castOn, underArmJoin, sleeveMax) { return MRound( Math.round(castOn - (2* underArmJoin)+(2*(sleeveMax - underArmJoin))), 2 );}
function YokeDepth(yoke, gauge) { return Math.round((yoke / gauge)/4);}

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

const mapStateToProps = state => {
    return {
        size: state.size.size,
        gauge: state.gauge.gauge,
        // vars: state.vars
    };
};

export default connect(mapStateToProps)(SummaryScreen);