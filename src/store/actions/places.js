import { ADD_PLACE, DELETE_PLACE } from './actionTypes';
import firebase from 'react-native-firebase';

export const addPlace = (placeName, location) => {
    return dispatch => {
        const placeData = {
            name: placeName,
            location: location
        }
        this.ref =firebase.firestore().collection('places')
        this.ref.add(placeData)
        .catch(err => console.log(err))
        .then(res => {
            console.log(res.id)
        })
        }
};

    export const deletePlace = (key) => {
        return {
            type: DELETE_PLACE,
            placeKey: key
        };
    };