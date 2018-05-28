import { ADD_PLACE, DELETE_PLACE } from './actionTypes';
import firebase from 'react-native-firebase';
import RNFS from 'react-native-fs';
import UUIDGenerator from 'react-native-uuid-generator';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        // create a path you want to write to
        // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`, 
        // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
        // // write the file
        const path = RNFS.DocumentDirectoryPath + "/uploaded-image.jpg";
        const metadata = {
            contentType: 'image/jpeg'
        };

        RNFS.writeFile(path, image.base64, "base64")
            .then(() => UUIDGenerator.getRandomUUID())
            .then((uuid) => {
                firebase
                    .storage()
                    .ref('img/' + uuid + '.jpg')
                    .putFile(path, metadata)
                    .then(res => {
                        const placeData = {
                            name: placeName,
                            location: location,
                            image: res.downloadURL
                        }
                        this.ref = firebase.firestore().collection('places')
                        this.ref.add(placeData)
                            .then(res => {
                                console.log(res.id)
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log('firebase error', err));
            })
            .catch((err) => {
                console.log('there is err', err.message);
            });
    }
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};