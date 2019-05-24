import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import StepDetail from '../StepDetail';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
// import { augmentStitch } from '../../store/actions/index';

class SleeveAScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        state = {
            step: 0,
            // augment: 0,
            castOn: false,
            underArmJoin: false,
            increaseTimes: false,
            sleeveMax: false,
            sleeveRows: false,
            sleeveLength: false,
            stitchNumber: 1,
            notes: {}
        };
    }
    // state = {
    //     step: 0,
    //     // augment: 0,
    //     stitchNumber: 1,
    //     notes: {}
    // };

    componentDidMount() {
        this.setState({
            ...this.state,
            castOn: this.props.vars.castOn,
            underArmJoin: this.props.vars.underArmJoin,
            increaseTimes: this.props.vars.increaseTimes,
            sleeveMax: this.props.vars.sleeveMax,
            sleeveRows: this.props.vars.sleeveRows,
            sleeveLength: this.props.vars.sleeveLength
        });
    }

    onNavigatorEvent = event => {
        console.log(event);
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
        let currentStep = this.state.step;
        if(this.state.step < this.sleeve1Steps.length-1) {
            this.setState({
                ...this.state,
                step: (currentStep+1)
            });
        } else {
            // console.log(this.props.navigator);
            this.props.navigator.push({
                screen: 'knitrino.SleeveBScreen',
                title: 'Sleeve B Steps',
                animated: true,
                animationType: 'slide-horizontal'
            });
        }
    }
    submitNotesHandler = (newNotes) => {
        alert("saved: "+ newNotes);
        const currentStep = this.state.step;
        this.state.notes[currentStep] = newNotes;
    }
    incrementRow = event => {
        let currentStitchNumber = this.state.stitchNumber;
        const newStitchNumber = currentStitchNumber+1;
        this.setState({
            stitchNumber: newStitchNumber
        });
    }
    decrementRow = event => {
        const currentStitchNumber = this.state.stitchNumber;
        const newStitchNumber = currentStitchNumber-1;
        if(currentStitchNumber > 1) {
            this.setState({ stitchNumber: newStitchNumber });
        }
    }

    sleeve1Steps = [
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
            text: "Repeat steps 7 and 8 "+increaseTimes(this.props.size, this.props.gauge)+" times, until you have "+sleeveMax(this.props.size, this.props.gauge)+" stitches",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "Continue knitting in stockinette stitch for "+sleeveRows(this.props.gauge)+" rows, until your sleeve is "+sleeveLength(this.props.size)+" from cast on, or desired length. ",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "That's it! Now take the "+underArmJoin(this.props.size, this.props.gauge)+" stitches directly above the underarm increases and put them on threads or a stitch holder. Put remaining stitches on a separate holder.",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Sleeve1",
            text: "Just one more sleeve to go!",
            imgSrc: "",
            counter: false
        }
    ];
   
    render () {
        return (
            <View style={styles.container}>

                <View style={styles.stepContainer}>
                    <StepDetail 
                        // something={this.props.size}
                        sectionName={this.sleeve1Steps[this.state.step].sectionName}
                        text={this.sleeve1Steps[this.state.step].text}
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
function MRound(number, multipleOf) {
    let rounded = number;
    while(rounded % multipleOf != 0) { if(rounded % multipleOf >= (multipleOf/2)) {rounded++;} else {rounded--;} }
    return rounded;
}
function castOn(size, gauge) { return MRound(Math.round(size * gauge), 4); }
function underArmJoin(size, gauge) { return MRound( Math.round(castOn(size, gauge) * 0.08), 2); }
function sleeveCastOn(size, gauge) { return MRound(Math.round(castOn(size, gauge)/5), 4); }
function sleeveMax(size, gauge) {
    let sleeveMax = Math.round(castOn(size, gauge)* 0.333333);
    if(sleeveMax % 2 != 0) {sleeveMax++;}
    return sleeveMax;
}
function sleeveRows(gauge) { return MRound(((18-13.1)*Math.round(gauge/0.73)), 2); }
function increaseTimes(size, gauge) { return Math.round((sleeveMax(size, gauge) - sleeveCastOn(size, gauge))/ 2); }
function sleeveLength(size) { if(size <= 44) {return 18;} else if(size > 50) { return 19.75;} else { return 19; } }
function yoke(size, gauge) {
    return MRound( Math.round(castOn(size, gauge) - (2* underArmJoin(size, gauge))+(2*(sleeveMax(size, gauge) - underArmJoin(size, gauge)))), 2 );
}
function yokeDepth(size, gauge) { return Math.round((yoke(size, gauge) / gauge)/4); }

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

//this would be if state had a global "augment" for augmenting stich #
// const mapDispatchToProps = dispatch => {
//     return { onAugmentStitch: (aug) => dispatch(augmentStitch(aug)) };
// };

const mapStateToProps = state => {
    return {
        size: state.size.size,
        gauge: state.gauge.gauge
    };
};
export default connect(mapStateToProps)(SleeveAScreen);
// export default connect(mapStateToProps, mapDispatchToProps)( BodyScreen);