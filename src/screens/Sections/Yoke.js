import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
// import StepList from '../../components/StepList/StepList'
import StepDetail from '../StepDetail';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

// import { addSize, addGauge } from '../../store/actions/index';

class YokeScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        this.state = {
            step: 0,
            // augment: 0,
            castOn: false,
            underArmJoin: false,
            increaseTimes: false,
            sleeveMax: false,
            sleeveRows: false,
            sleeveLength: false,
            yoke: false,
            yokeDepth: false,
            stitchNumber: 1,
            notes: {}
        };
    }

    componentDidMount() {
        // console.log("in componentDidMount",this.state, this.props);
        const newCastOn = CastOn(this.props.size, this.props.gauge);
        const newUnderArmJoin = UnderArmJoin(newCastOn);
        const newSleeveMax = SleeveMax(newCastOn);
        const newSleeveRows = SleeveRows(this.props.gauge);
        const newSleeveLength = SleeveLength(this.props.size);
        const newSleeveCastOn = SleeveCastOn(newCastOn);
        const newIncreaseTimes = IncreaseTimes(newSleeveMax, newSleeveCastOn);
        const newYoke = Yoke(newCastOn,newUnderArmJoin, newSleeveMax);
        const newYokeDepth = YokeDepth(newYoke, this.props.gauge); 
        this.setState({
            ...this.state,
            castOn: newCastOn,
            underArmJoin: newUnderArmJoin,
            sleeveMax: newSleeveMax,
            sleeveRows: newSleeveRows,
            sleeveLength: newSleeveLength,
            increaseTimes: newIncreaseTimes,
            yoke: newYoke,
            yokeDepth: newYokeDepth
        });
    }

    onNavigatorEvent = event => {
        console.log("in Yoke",event, this.state);
        if(event.id === "bottomTabReselected") {
            this.props.navigator.popToRoot({
                animated: true,
                animationType: 'fade'
            });
        }
    }
    toggleSummary = () => {
        this.props.navigator.push({
            screen: 'knitrino.SummaryScreen',
            title: 'Summary',
            animated: true,
            animationType: 'slide-horizontal'
        });
    }
    rowHandler = ()=> { return ((this.state.stitchNumber)); }
    nextStepHandler = event => {
        const currentStep = this.state.step;
        if(this.state.step < this.yokeSteps().length-1) {
            this.setState({
                ...this.state,
                step: (currentStep+1)
            });
        }
    }
    submitNotesHandler = (newNotes) => {
        const currentStep = this.state.step;
        let stateNotes;
        if(newNotes !== this.state.notes[currentStep]) {
            stateNotes = {...this.state.notes};
            stateNotes[currentStep] = newNotes;
            this.setState({
                ...this.state,
                notes: stateNotes
            });
            alert("saved: "+ newNotes);
        }
    }

    incrementRow = event => {
        const currentStitchNumber = this.state.stitchNumber;
        const newStitchNumber = currentStitchNumber+1;
        this.setState({
            stitchNumber: newStitchNumber
        });
    }

    decrementRow = event => {
        const currentStitchNumber = this.state.stitchNumber;
        const newStitchNumber = currentStitchNumber-1;
        if(currentStitchNumber > 1) {
            this.setState({
                stitchNumber: newStitchNumber
            });
        }
    }

    yokeSteps = ()=> { return [
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
        },
        {
            sectionName: "Yoke",
            text: "That's the whole pattern! Tap the resize button to start over.",
            imgSrc: "",
            counter: false
        }
    ];}
   
    render () {
        return (
            <View style={styles.container}>

                <View style={styles.stepContainer}>
                    <StepDetail
                        sectionName={this.yokeSteps()[this.state.step].sectionName}
                        text={this.yokeSteps()[this.state.step].text}
                        step={this.state.step}
                        oldNotes={this.state.notes[this.state.step]}
                        onNextStep={this.nextStepHandler}
                        saveNotes={(notes)=>this.submitNotesHandler(notes)}
                        onModalClosed={()=>{alert("closed modal")}}
                         />
                </View>

                <View style={styles.stichInfo}>
                    <View style={styles.counterContainer}>
                        <View style={styles.counterBtn}>
                            <TouchableOpacity 
                                onPress={this.decrementRow} >
                                <Text style={styles.btnText} >-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.counterNumb}>
                            <Text style={styles.btnText}>{this.state.stitchNumber}</Text>
                        </View>
                        <View style={styles.counterBtn}>
                            <TouchableOpacity 
                                onPress={this.incrementRow} >
                                <Text style={styles.btnText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.stichNumber}>You're on row {this.rowHandler()}</Text>
                    </View>
                    <View style={styles.prevContainer}>
                        <Text style={styles.prevText}>Preview all steps</Text>
                        <TouchableOpacity onPress={this.toggleSummary}>
                            <View >
                                <Icon2 size={60} name="chevron-double-right" color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
        
            </View>
        );
    }
}

function MRound(number, multipleOf) { let rounded = Math.round(number); while(rounded % multipleOf != 0) { rounded % multipleOf >= (multipleOf/2) ? rounded++ : rounded--; } return rounded; }
function CastOn(size, gauge) { return MRound(Math.round(size * gauge), 4);}
function UnderArmJoin(castOn) { return MRound( Math.round(castOn * 0.08), 2);}
function SleeveCastOn(castOn) { return MRound(Math.round(castOn/5), 4);}
function SleeveMax(castOn) { let sleeveMax = Math.round(castOn * 0.333333); if(sleeveMax % 2 != 0) {sleeveMax++;} return sleeveMax;}
function SleeveRows(gauge) { return MRound(((18-13.1)*Math.round(gauge/0.73)), 2);}
function IncreaseTimes(sleeveMax, sleeveCastOn) { return Math.round((sleeveMax - sleeveCastOn)/ 2);}
function SleeveLength(size) { if(size <= 44) {return 18;} else if(size > 50) { return 19.75;} else { return 19; }}
function Yoke(castOn, underArmJoin, sleeveMax) { return MRound(Math.round(castOn - (2* underArmJoin)+(2*(sleeveMax - underArmJoin))), 2 ); }
function YokeDepth(yoke, gauge) { return Math.round((yoke/gauge)/4);}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    stepContainer: {
        // padding: 2,
        marginHorizontal: '1%',
        marginBottom: '10%',
        borderColor: "#000000",
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 3,
        borderRightWidth: 4
    },
    counterContainer: {
        marginHorizontal: '20%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    counterBtn: {
        borderColor: "#000000",
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: "#d9d9d9",
        marginHorizontal: -15,
        justifyContent: 'center'
    },
    counterNumb: {
        borderColor: "#00000d",
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor: "#f2f2f2"
    },
    theBtn: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 40,
        textAlign: 'center',
        paddingVertical: 15
    },
    stichInfo: {
        fontSize: 20,
        height: '67%',
        alignItems: 'center'
    },
    prevContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        // alignSelf: 'flex-end',
        // padding: 30,
        marginTop: '10%'
    },
    prevText: {
        fontSize: 18
    },
    stichNumber: {
        fontSize: 18
    }
});
const mapStateToProps = state => {
    return {
        size: state.size.size,
        gauge: state.gauge.gauge
    };
};
export default connect(mapStateToProps)( YokeScreen);