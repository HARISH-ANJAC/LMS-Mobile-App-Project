import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RootScreen from './Screens/RootScreen';
import SignUpScreen from './Screens/SignUpScreen';
import { Provider } from 'react-redux';
import ForgetpassScreen from './Screens/ForgetpassScreen';
import LoginScreen from './Screens/LoginScreen';
import StudentDashboard from './Screens/StudentScreens/StudentDashboard';
import TutorDashboard from './Screens/TutorScreens/TutorDashboard';
import store from './Redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage'
type RootStackParamList = {
  Root: undefined;
  Login: { userType: string };
  Forgetpass: { userType: string };
  Signup: { userType: string };
  StudentDashboard: undefined;
  TutorDashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const App: React.FC = () => {
  console.log("isLoggedIn",AsyncStorage.getItem("isLoggedIn"));
  
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Root" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Root" component={RootScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Forgetpass" component={ForgetpassScreen} />
          <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
          <Stack.Screen name="TutorDashboard" component={TutorDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

