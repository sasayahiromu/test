import {Navigation} from 'react-native-navigation'

import AuthScreen from './src/screens/Auth/Auth'

Navigation.registerComponent("awsome-places.AuthScreen", () => AuthScreen);

Navigation.startSingleScreenApp({
  screen:{
    screen: "awsome-places.AuthScreen",
    title: "Login"
  }
});