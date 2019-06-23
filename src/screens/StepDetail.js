import React, {Component} from 'react';
import {Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
// import { deletePlace } from '../../store/actions/index';

class StepDetail extends Component {

    state = {
        modalVisible: false,
        step: 0,
        notes: ""
        //sectionName str
        //imgSrc str
        // sectionName: "Body",
        // text: ""

    };


    notesBtnHandler =()=> {
        this.setState({ ...this.state,modalVisible: true });
    };

    updateNotes =(value)=> {
        this.setState({ ...this.state,notes: value });
    }

    submitNextStep =(event)=>{
        const currentStep = this.state.step;
        this.setState({
            ...this.state,step: currentStep+1
        },()=>{ this.resetNotes(event); });
    };

    resetNotes = (event) => {
        this.setState({
            ...this.state,notes: ""
        },()=>{ this.props.onNextStep(event); });
    }

    closeNotesHandler = (event) => {
        this.props.saveNotes(this.state.notes);
        this.setState({ ...this.state,modalVisible: false });
        // alert('Modal has been closed.');
    };

    render() {
        return (
            <View style={styles.bodyContainer}>
                <Modal
                    animationType="slide" 
                    onRequestClose={this.props.onModalClosed}
                    transparent={false}
                    visible={this.state.modalVisible}>
                    <View style={{marginTop: '16%'}}>
                        <View style={styles.noteContainer}>
                            <TextInput
                                style={{height:40}}
                                placeholder="add some notes for this step!"
                                onChangeText={(val)=>{this.updateNotes(val)}}
                                value={this.state.notes}
                                />
                        <TouchableHighlight
                            onPress={this.closeNotesHandler}>
                            <Icon size={80} name="md-checkmark" color="black" />
                        </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <View style={styles.infoContainer}>
                    <View>
                        <Text>{this.props.sectionName}</Text>
                    </View>
                    <View style={styles.bodyText}>
                        <Text>{this.props.text}</Text>
                    </View>

                    <View style={styles.noteBtns}>
                        <TouchableOpacity onPress={this.notesBtnHandler}>
                            <View>
                                <Icon size={40} name="md-clipboard" color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.arrowContainer}>
                    <TouchableOpacity onPress={this.submitNextStep}>
                        <View style={styles.nextArrow}>
                            <Icon size={70} name="md-arrow-forward" color="black" />
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    };
}

const styles = StyleSheet.create({
    bodyContainer: {
        paddingTop: '3%',
        paddingBottom: '3%',
        paddingLeft: '3%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // maxHeight: '45%',
        alignItems: 'stretch'
         
    },
    infoContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '85%'
    },
    arrowContainer: {
        // flexDirection: 'column',
        justifyContent: 'center'
    },
    noteContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    bodyText: {
        padding: '2%'
    },
    nextArrow: {
        // marginVertical: 10
    },
    noteBtns: {
        marginBottom: '1%',
        marginLeft: '1%'
    },
    stichInfo: {
        fontSize: 20,
        textAlign: 'center'
    }
});

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onDeletePlace: (key) => dispatch(deletePlace(key))
//     };
// };

// export default connect(null, mapDispatchToProps)(StepDetailScreen);
export default StepDetail;