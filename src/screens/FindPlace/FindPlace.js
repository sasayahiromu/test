import React, {Component} from 'react';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList'

class FindPlaceScreen extends Component {
  ItemSelectedHandler = key =>{
      const selPlace = this.props.places.find(place => {
        return place.key === key;
    })
      this.props.navigator.push({
          screen: "awsome-places.PlaceDetailScreen",
          title:  selPlace.name,
          passProps: {
            selectedPlace: selPlace
          }
      });
  }
  render () {
      return (
          <View>
              <PlaceList places={this.props.places} onItemSelected={this.ItemSelectedHandler}/>
          </View>
      );
  }
}

mapPlaceToProps = state =>{
    return {
        places: state.places.places
    }
}

export default connect(mapPlaceToProps)(FindPlaceScreen);