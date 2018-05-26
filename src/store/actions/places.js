import { ADD_PLACE, DELETE_PLACE } from './actionTypes';
import firebase from 'react-native-firebase';
import RNFS from 'react-native-fs';

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


        // require the module

        // create a path you want to write to
        // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`, 
        // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
        const path = RNFS.DocumentDirectoryPath + "/uploaded-image.jpg";

        // // write the file
        RNFS.writeFile(path, image.base64, "base64")
        .then((success) => {
            console.log('write')
            firebase
            .storage()
            .ref('img/hello.jpg')
            .putFile(path)
            .then(res => console.log(res))
            .catch(err => console.log('ups',err));
            })
        .catch((err) => {
            console.log('there is err',err.message);
        });




        }
};

    export const deletePlace = (key) => {
        return {
            type: DELETE_PLACE,
            placeKey: key
        };
    };