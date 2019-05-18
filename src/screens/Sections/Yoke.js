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
        if(this.state.step < yokeSteps.length-1) {
            this.setState({
                step: (currentStep+1)
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
                        sectionName={yokeSteps[this.state.step].sectionName}
                        text={yokeSteps[this.state.step].text}
                        step={this.state.step}
                        oldNotes={this.state.notes[this.state.step]}
                        onNextStep={this.nextStepHandler}
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

//these get passed to StepDetailScreen as props
const yokeSteps = [
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
export default YokeScreen;