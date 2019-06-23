import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import DimensionsInput from '../../components/DimensionsInput/DimensionsInput';
import { addSize, addGauge } from '../../store/actions/index';

class UserInputScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    onNavigatorEvent = event => {
        if(event.type === "NavBarButtonPress") {
            if(event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left",
                    animated: true
                });
            }
        }
    }
    dimensionsAddedHandler = (newSize, newGauge) => {
        this.props.onAddSize(newSize);
        this.props.onAddGauge(newGauge);
        this.props.navigator.push({
            screen: 'knitrino.BodyScreen',
            title: 'Body Steps'
        });
    };
    render () {
        return (
            <View>
                <DimensionsInput onDimensionsAdded={this.dimensionsAddedHandler} />
            </View>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddSize: (newSize) => dispatch(addSize(newSize)),
        onAddGauge: (newGauge) => dispatch(addGauge(newGauge))
    };
};
export default connect(null, mapDispatchToProps)( UserInputScreen);