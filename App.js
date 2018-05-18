import {Navigation} from 'react-native-navigation'

import AuthScreen from './src/screens/Auth/Auth'
import SharePlaceScreen from './src/screens/SharePlace/SharePlace'
import FindPlaceScreen from './src/screens/FindPlace/FindPlace'

// Register Screen
Navigation.registerComponent("awsome-places.AuthScreen", () => AuthScreen);
Navigation.registerComponent("awsome-places.SharePlaceScreen", () => SharePlaceScreen);
Navigation.registerComponent("awsome-places.FindPlaceScreen", () => FindPlaceScreen);


Navigation.startSingleScreenApp({
  screen:{
    screen: "awsome-places.AuthScreen",
    title: "Login"
  }
});