import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
// import StepList from '../../components/StepList/StepList'
import StepDetail from '../StepDetail';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import YokeScreen from './Yoke';
// import { addSize, addGauge } from '../../store/actions/index';

class BodyScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    state = {
        step: 0,
        // augment: 0,
        stitchNumber: 1,
        notes: {}
    };

    onNavigatorEvent = event => {
        console.log(event);
        if(event.id === "bottomTabReselected") {
            this.props.navigator.popToRoot({
                animated: true,
                animationType: 'fade'
            });
        }
    }

    nextStepHandler = event => {
        let currentStep = this.state.step;
        if(this.state.step < bodySteps.length-1) {
            this.setState({
                step: (currentStep+1)
            });
        } else {
            // console.log(this.props.navigator);
            this.props.navigator.push({
                screen: 'knitrino.YokeScreen',
                title: 'Yoke Steps',
                animated: true,
                animationType: 'slide-horizontal'
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
            this.setState({
                stitchNumber: newStitchNumber
            });
        }
    }

    rowHandler = ()=> {
        return (
            (this.state.stitchNumber)
        );
    }
   
    render () {
        return (
            <View style={styles.container}>

                <View style={styles.stepContainer}>
                    <StepDetail 
                        sectionName={bodySteps[this.state.step].sectionName}
                        text={bodySteps[this.state.step].text}
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

//these get passed to StepDetail as props
const bodySteps = [
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
    }
];

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
// const mapDispatchToProps = dispatch => {
//     return {
//         onAddSize: (newSize) => dispatch(addSize(newSize)),
//         onAddGauge: (newGauge) => dispatch(addGauge(newGauge))
//     };
// };

// export default connect(null, mapDispatchToProps)( BodyScreen);
export default BodyScreen;