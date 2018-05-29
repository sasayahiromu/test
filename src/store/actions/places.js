import { SET_PLACES, PLACE_ADDED, START_ADD_PLACE } from './actionTypes';
import firebase from 'react-native-firebase';
import RNFS from 'react-native-fs';
import UUIDGenerator from 'react-native-uuid-generator';
import { uiStartLoading, uiStopLoading } from './index'

export const startAddPlace = () => {
    return {
        type: START_ADD_PLACE
    };
}

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
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
                        console.log(res)
                        const placeData = {
                            name: placeName,
                            location: location,
                            image: res.downloadURL,
                            ref: res.ref
                        }
                        this.ref = firebase.firestore().collection('places')
                        this.ref.add(placeData)
                            .then(res => {
                                dispatch(uiStopLoading());
                                console.log(res.id);
                                dispatch(getPlaces());
                                dispatch(placeAdded())
                            })
                            .catch(err => {
                                dispatch(uiStopLoading());
                                alert('Try again');
                                console.log(err);
                            });
                    })
                    .catch(err => {
                        dispatch(uiStopLoading());
                        alert('Try again');
                        console.log(err);
                    });
            })
    }
};

export const placeAdded = () => {
    return {
        type: PLACE_ADDED
    }
}

export const getPlaces = () => {
    return dispatch => {
        this.ref = firebase.firestore().collection('places');
        this.ref
            .get()
            .then(querySnapshot => {
                const places = [];
                for (let i in querySnapshot.docs) {
                    value = querySnapshot.docs[i].data();
                    places.push({
                        ...value,
                        image: {
                            uri: value.image
                        },
                        key: querySnapshot.docs[i].id
                    });
                }
                dispatch(setPlaces(places));
            })
            .catch(err => {
                alert('something wrong');
                console.log(err)
            })
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
};

export const deletePlace = (key) => {
    return dispatch => {
        this.ref = firebase.firestore().collection('places');
        this.ref.doc(key).get()
            .then(snapshot => {
                console.log(snapshot.data().ref);
                const ref = firebase.storage().ref(snapshot.data().ref);
                ref.delete()
                    .then(() => {
                        //Delete in firestore
                        this.ref.doc(key)
                            .delete()
                            .catch(err => {
                                alert("Something went wrong, sorry :/")
                                console.log(err)
                            })
                            .then(parsedRes => {
                                dispatch(getPlaces());
                            })
                    })
            })
    };
};