import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import AuthScreen from './src/screens/Auth/Auth';
// import SideDrawer from './src/screens/SideDrawer/SideDrawer';

import UserInputScreen from './src/screens/UserInput/UserInput';
import BodyScreen from './src/screens/Sections/Body';
import SleeveAScreen from './src/screens/Sections/SleeveA';
import SleeveBScreen from './src/screens/Sections/SleeveB';
import YokeScreen from './src/screens/Sections/Yoke';
// import StepDetailScreen from './src/screens/StepDetail';
import SummaryScreen from './src/screens/Summary/Summary';

import configureStore from './src/store/configureStore';
const store = configureStore();

// console.log(store.getState());

//register screens by id
Navigation.registerComponent("knitrino.AuthScreen", ()=> AuthScreen, store, Provider );
Navigation.registerComponent("knitrino.UserInputScreen", ()=> UserInputScreen, store, Provider);
Navigation.registerComponent("knitrino.BodyScreen", ()=> BodyScreen, store, Provider);
Navigation.registerComponent("knitrino.SleeveAScreen", ()=> SleeveAScreen, store, Provider);
Navigation.registerComponent("knitrino.SleeveBScreen", ()=> SleeveBScreen, store, Provider);
Navigation.registerComponent("knitrino.YokeScreen", ()=> YokeScreen, store, Provider);
Navigation.registerComponent("knitrino.SummaryScreen", ()=> SummaryScreen, store, Provider);

// Navigation.registerComponent("knitrino.SideDrawerScreen", ()=> SideDrawer);

Navigation.startSingleScreenApp({
  screen: {
    screen: "knitrino.AuthScreen",
    title: "Welcome to Knitrino"
  }
});