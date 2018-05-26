import { ADD_PLACE, DELETE_PLACE } from './actionTypes';
import firebase from 'react-native-firebase';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        // const UUID = require("uuid-v4")
        // const placeData = {
        //     name: placeName,
        //     location: location
        // }
        // this.ref =firebase.firestore().collection('places')
        // this.ref.add(placeData)
        // .catch(err => console.log(err))
        // .then(res => {
        //     console.log(res.id)
        // })
        const fs = require('fs')

        fs.writeFileSync("/tmp/uploaded-image.jpg", image, "base64", err => {
            console.log(err);
            return response.status(500).json({ error: err });
          });

        firebase
        .storage()
        .ref("/tmp/uploaded-image.jpg")
        .putFile(
          `${firebase.storage.Native.DOCUMENT_DIRECTORY_PATH}/ok.jpeg`
        )
        .then(res => console.log(res))
        .catch(err => console.log(err));
        }
};

    export const deletePlace = (key) => {
        return {
            type: DELETE_PLACE,
            placeKey: key
        };
    };