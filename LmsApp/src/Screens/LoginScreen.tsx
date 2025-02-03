import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Alert, BackHandler} from 'react-native';
import {THEMECOLORS} from '../Constants/ThemeColor';
import {TYPOGRAPHY} from '../Constants/Typography';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {LoginFrame} from '../Constants/image';
import CustomButton from '../Components/CustomComponents/CustomButton';
import CustomInputContainer from '../Components/CustomComponents/CustomInputContainer';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../Redux/Auth/LoginSlice';
import { AppDispatch } from '../Redux/Store';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const {userType} = route.params as {userType: string};

  //redux state
  const dispatch =useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');


  // Email Validation
  const validateEmail = (email: string) => {
    const EMAILPATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EMAILPATTERN.test(email);
  };

  // Password Validation
  const validatePass = (password: string) => {
    return password.length >= 8;
  };

  const CheckLogin = async () => {
    let valid = true;

    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPassError('Password is required.');
      valid = false;
    } else if (!validatePass(password)) {
      setPassError('Password must be at least 8 characters.');
      valid = false;
    } else {
      setPassError('');
    }

    if (valid) {

      const credentials={email,password,role:userType}
      dispatch(LoginUser(credentials)).then(()=>{
        console.log('Login success');
        navigation.navigate('StudentDashboard');
      }).catch((err:any)=>console.log("Dispatch Error:",err.message) );
      
    }
  };


  return (
    <View style={styles.container}>
      {/* Top Section with Image and Title */}
      <View style={styles.topContainer}>
        <Image source={LoginFrame} style={styles.image} />
        <Text style={styles.title}>{userType} Login</Text>
        <Text style={styles.subtitle}>
          Access your account by logging in below
        </Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <CustomInputContainer
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          inputType="email"
          borderColor={THEMECOLORS.primaryColor}
          iconColor={THEMECOLORS.primaryColor}
          bgColor="white"
          inputTextStyle={{color: THEMECOLORS.primaryColor}}
          placeholderColor={THEMECOLORS.primaryColor}
        />
        {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}

        <CustomInputContainer
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          inputType="password"
          borderColor={THEMECOLORS.primaryColor}
          iconColor={THEMECOLORS.primaryColor}
          bgColor="white"
          inputTextStyle={{color: THEMECOLORS.primaryColor}}
          placeholderColor={THEMECOLORS.primaryColor}
        />
        {passError ? <Text style={styles.errorMessage}>{passError}</Text> : null}
      </View>

      {/* Forgot Password */}
      <TouchableOpacity
        onPress={() =>  navigation.navigate('Forgetpass')}
        style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <CustomButton
        title="Login"
        bgColor={THEMECOLORS.buttonColor}
        textColor={THEMECOLORS.buttonText}
        textStyle={{fontWeight: 'bold'}}
        width={'100%'}
        activeOpacity={0.8}
        onPress={CheckLogin}
      />

      {/* Sign Up Section */}
      <Text style={styles.signupText}>Don't have an account?</Text>
      <CustomButton
        title="Sign up"
        bgColor={THEMECOLORS.buttonsecondaryColor}
        textColor={THEMECOLORS.primaryColor}
        textStyle={{fontWeight: 'bold'}}
        width={'100%'}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Signup', {userType})}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEMECOLORS.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: hp('4%'),
  },
  image: {
    width: wp('50%'),
    height: hp('25%'),
    resizeMode: 'contain',
  },
  title: {
    ...TYPOGRAPHY.heading1,
    fontSize: wp('6%'),
    textAlign: 'center',
    color: THEMECOLORS.primaryColor,
  },
  subtitle: {
    ...TYPOGRAPHY.subText,
    fontSize: wp('4%'),
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',  
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  errorMessage: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: hp('1%'),

  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: hp('2%'),
  },
  forgotPasswordText: {
    ...TYPOGRAPHY.subText,
    fontSize: wp('4%'),
    color: THEMECOLORS.primaryColor,
    textDecorationLine: 'underline',
  },
  signupText: {
    ...TYPOGRAPHY.subText,
    fontSize: wp('4%'),
    textAlign: 'center',
    marginTop: hp('2%'),
  },
});
