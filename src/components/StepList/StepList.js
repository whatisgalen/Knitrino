import React, {Component} from 'react';
import { View, Text, Touchable, StyleSheet, ScrollView, FlatList } from 'react-native';
import ListItem from '../ListItem/ListItem';

//pass steps as props into this
class StepList extends Component {   
    state = {
        steps: true
    }

    render () {
        return (
            <FlatList
                style={styles.listContainer}
                data={props.places}
                renderItem={(info)=> ( //gives us info about the item as arg
                    <ListItem 
                        placeName={info.item.name} 
                        placeImage={info.item.image}
                        onItemPressed={()=> props.onItemSelected(info.item.key)}/>
    
                )} /> 
        );
    }
};

const styles = StyleSheet.create({
    listContainer: {
        width: '100%'
      }
});

export default StepList;