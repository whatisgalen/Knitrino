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
        state = {
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
            sleeveLength: this.props.vars.sleeveLength,
            yoke: this.props.vars.yoke,
            yokeDepth: this.props.vars.yokeDepth
        });
    }

    // componentDidMount() {
    //     this.setState({
    //         ...this.state,
    //         castOn: this.props.vars.castOn
    //     }, ()=>{
    //         this.setState({
    //             ...this.state,
    //             underArmJoin: this.props.vars.underArmJoin
    //         }, ()=>{
    //             this.setState({
    //                 ...this.state,
    //                 increaseTimes: this.props.vars.increaseTimes
    //             }, ()=>{
    //                 this.setState({
    //                     ...this.state,
    //                     sleeveMax: this.props.vars.sleeveMax
    //                 }, ()=>{
    //                     this.setState({
    //                         ...this.state,
    //                         sleeveRows: this.props.vars.sleeveRows
    //                     }, ()=>{
    //                         this.setState({
    //                             ...this.state,
    //                             sleeveLength: this.props.vars.sleeveLength
    //                         }, ()=>{
    //                             this.setState({
    //                                 ...this.state,
    //                                 yoke: this.props.vars.yoke
    //                             }, ()=>{
    //                                 this.setState({
    //                                     ...this.state,
    //                                     yokeDepth: this.props.vars.yokeDepth
    //                                 });
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // }

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
        if(this.state.step < this.yokeSteps.length-1) {
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

    yokeSteps = [
        {
            sectionName: "Yoke",
            text: "Now the fun begins - uniting the sleeves with the body.",
            imgSrc: "",
            counter: false 
        },
        {
            sectionName: "Yoke",
            text: "Place first and last "+(underArmJoin(this.props.size, this.props.gauge)/2)+" stitches of the body on a holder. Using largest circular need and starting at the back left sleeve, knit "+(sleeveMax(this.props.size, this.props.gauge) - underArmJoin(this.props.size, this.props.gauge))+" sleeve stitches, and place a marker. Knit the next "+((castOn(this.props.size, this.props.gauge) - 2*underArmJoin(this.props.size, this.props.gauge))/4)+" stitches on the front, and place next "+underArmJoin(this.props.size, this.props.gauge)+" stitches of body on holder. Knit "+(sleeveMax(this.props.size, this.props.gauge) - underArmJoin(this.props.size, this.props.gauge))+" stitches on the right sleeve and place marker. Knit the next "+((castOn(this.props.size,this.props.gauge) - (2*underArmJoin(this.props.size,this.props.gauge)))/4)+" stitches of back, place marker and join in the round "+yoke(this.props.size,this.props.gauge)+" stitches.",
            imgSrc: "",
            counter: true
        },
        {
            sectionName: "Yoke",
            text: "Knit in the round until yoke is "+(yokeDepth(this.props.size,this.props.gauge)/2)+" inches, about ({yoke depth}*{vgauge}/2) rounds.",
            imgSrc: "",
            counter: true
        },
        {
            sectionName: "Yoke",
            text: "Knit 1, knit 2 together, all the way around, "+(Math.round(yoke(this.props.size,this.props.gauge)*(2/3)))+" stitches remaining.",
            imgSrc: "",
            counter: true
        },
        {
            sectionName: "Yoke",
            text: "Knit in the round for another ROUND({yoke depth}*{vgauge}/4) rounds, about "+(Math.round(yokeDepth(this.props.size,this.props.gauge)/4))+" inches.",
            imgSrc: "",
            counter: true
        },
        {
            sectionName: "Yoke",
            text: "Knit 1, knit 2 together, all the way around, "+(Math.round(yoke(this.props.size,this.props.gauge)*((2/3)^2)))+" stitches remaining.",
            imgSrc: "",
            counter: true
        },
        {
            sectionName: "Yoke",
            text: "Knit in the round for another ROUND({yoke depth}*{vgauge}/4) rounds, about "+(Math.round(yokeDepth(this.props.size,this.props.gauge)/4))+" inches.",
            imgSrc: "",
            counter: false
        }
    ];
   
    render () {
        return (
            <View style={styles.container}>

                <View style={styles.stepContainer}>
                    <StepDetail
                        sectionName={this.yokeSteps[this.state.step].sectionName}
                        text={this.yokeSteps[this.state.step].text}
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
// const mapDispatchToProps = dispatch => {
//     return {
//         onAddSize: (newSize) => dispatch(addSize(newSize)),
//         onAddGauge: (newGauge) => dispatch(addGauge(newGauge))
//     };
// };

// export default connect(null, mapDispatchToProps)( BodyScreen);
export default YokeScreen;