import React, { Component } from 'react';
import {StyleSheet, View, TextInput, Button, Text} from 'react-native';

class DimensionsInput extends Component {

    state = {
        // placeName: '',
        size: '',
        gauge: ''
    };
    
    sizeChangedHandler = (val)=> {
        console.log(val);
        let newSize = (Number.parseInt(val));
        this.setState({
            // ...state,
            size: newSize
        });
    };
    gaugeChangedHandler = (val)=> {
        console.log(val);
        let newGauge = (Number.parseFloat(val));
        this.setState({
            // ...state,
            gauge: newGauge
        });
    };

    dimensionsSubmitHandler =()=>{
        this.props.onDimensionsAdded(this.state.size,this.state.gauge);
        alert("Dimensions\nsize: "+ this.state.size+"\ngauge: "+this.state.gauge);
        // this.props.onSizeAdded(this.state.size);
        // this.props.onGaugeAdded(this.state.gauge);
    };

    render() {
        return (
            <View style={styles.inputContainer}>
                <View>
                    <Text style={styles.txt}>{text[0]}</Text>
                    <TextInput 
                        // value={this.state.size.toString()}
                        keyboardType="numeric"
                        returnKeyType="done"
                        style={styles.placeInput} 
                        placeholder="36"
                        onChangeText={(val)=>{this.sizeChangedHandler(val)}} />
                    <Text style={styles.txt}>{text[1]}</Text>
                    <TextInput 
                        // value={this.state.gauge.toString()}
                        keyboardType="numeric"
                        returnKeyType="done"
                        style={styles.placeInput} 
                        placeholder="4.5"
                        onChangeText={(val)=>{this.gaugeChangedHandler(val)}} />
                </View>
                <Button 
                    title="Start Project" 
                    style={styles.placeButton}
                    onPress={this.dimensionsSubmitHandler } />
            </View>
        );
    }
}

const text = ["What chest size (in inches) do you want your garment to be?", "(Before you begin, you'll need to do a gauge swatch. If you want to do that later, just use the default below.) What's your gauge in stitches/inch?"];

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        padding: 40,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      txt: {
          fontSize: 15
      },
      placeInput: {
        flex: -1,
        width: 70,
        borderWidth: 1,
        margin: 15,
        alignItems: 'center'
      },
      placeButton: {
        width: '50%'
      }
});

export default DimensionsInput;

