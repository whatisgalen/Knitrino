import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import StepDetail from '../StepDetail';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
// import { augmentStitch } from '../../store/actions/index';

class BodyScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    state = {
        step: 0,
        // augment: 0,
        stitchNumber: 1,
        castOn: false,
        underArmJoin: false,
        notes: {}
    };

    componentDidMount() {
        this.setState({
            ...this.state,
            castOn: calcCastOn(this.props.size, this.props.gauge)
        }, ()=>{
            this.setState({
                ...this.state,
                underArmJoin: calcUnderArmJoin(this.props.size, this.props.gauge)
            });
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
        if(this.state.step < this.bodySteps.length-1) {
            this.setState({
                ...this.state,
                step: (currentStep+1)
            });
        } else {
            // console.log(this.props.navigator);
            this.props.navigator.push({
                screen: 'knitrino.SleeveAScreen',
                title: 'Sleeve A Steps',
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

    castOn = () => {
        console.log(this.state);
        if(!this.state.castOn) {
          
            this.setState({
                ...this.state,
                castOn: calcCastOn(this.props.size,this.props.gauge)
            }, ()=> { 
                console.log("in setState; "+this.state);return this.state.castOn;
            });
            
        } else {
            console.log("in else; "+this.state.castOn);
            return this.state.castOn;
        }
    }

    underArmJoin = () => {
        // const state = this.state;
        if(!this.state.underArmJoin) {
            this.setState({
                ...this.state,
                underArmJoin: calcUnderArmJoin(this.props.size, this.props.gauge)
            }, ()=> {return this.state.underArmJoin;});
        } else {
            return this.state.underArmJoin;
        }
    }

    bodySteps = [
        {
            sectionName: "Body",
            text: "Using 32\" circular needles one size smaller than you swatched with, cast on "+(this.castOn())+" stitches. Place a marker at the end, and join in the round.",
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
            text: "That's it! Now take "+this.underArmJoin+" stitches on either side of the body and put them on threads or a stitch holder. Be sure there are exactly the same number of stitches on the front and back, which should be "+((this.castOn - this.underArmJoin)/2)+". Place front and back stitches on separate holder(s).",
            imgSrc: "",
            counter: false
        },
        {
            sectionName: "Body",
            text: "That's it! Now it\'s time for sleeves.",
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
                        sectionName={this.bodySteps[this.state.step].sectionName}
                        text={this.bodySteps[this.state.step].text}
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
function calcCastOn(size, gauge) { return MRound(Math.round(size * gauge), 4); }
function calcUnderArmJoin(size, gauge) { return MRound( Math.round(castOn(size, gauge) * 0.08), 2); }

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
export default connect(mapStateToProps)(BodyScreen);
// export default connect(mapStateToProps, mapDispatchToProps)( BodyScreen);