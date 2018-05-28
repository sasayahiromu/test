import { TRY_AUTH } from './actionTypes';
import firebase from 'react-native-firebase';
import { uiStartLoading, uiStopLoading } from './index'
import startMainTabs from "../../screens/MainTabs/startMainTabs";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    if (authMode === "login") {
      dispatch(authSignin(authData))
    } else {
      dispatch(authSignup(authData))
    }
  }
};

export const authSignup = authData => {
  return dispatch => {
    firebase.auth()
      .createUserAndRetrieveDataWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
        dispatch(uiStopLoading());
        startMainTabs();
      })
      .catch(err => {
        alert('Authentication failed. Try again.');
        console.log(err)
        dispatch(uiStopLoading());
      })
  };
};

export const authSignin = authData => {
  return dispatch => {
    firebase.auth()
      .signInAndRetrieveDataWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
        dispatch(uiStopLoading());
        startMainTabs();
      })
      .catch(err => {
        alert('Authentication failed. Try again.');
        console.log(err)
        dispatch(uiStopLoading());
      })
  }
}