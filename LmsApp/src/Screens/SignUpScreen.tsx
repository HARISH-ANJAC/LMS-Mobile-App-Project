import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {THEMECOLORS} from '../Constants/ThemeColor';
import {TYPOGRAPHY} from '../Constants/Typography';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SignupFrame} from '../Constants/image';
import CustomButton from '../Components/CustomComponents/CustomButton';
import CustomInputContainer from '../Components/CustomComponents/CustomInputContainer';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch,useSelector } from 'react-redux';
import { registerUser } from '../Redux/Auth/RegisterSlice';
import { AppDispatch } from '../Redux/Store';
import { Alert } from 'react-native';



const SignUpScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const {userType} = route.params as {userType: string};

  //Redux Dispatch State
  const dispatch = useDispatch<AppDispatch>();
  const {loading, error} = useSelector((state: { register: { loading: boolean; error: string } }) => state.register)

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

  //Phone Validation
  const validatePhone = (phone: string) => {
    return phone.length >= 10;
  };

  // Email Validation
  const validateEmail = (email: string) => {
    const EMAILPATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EMAILPATTERN.test(email);
  };

  // Password Validation
  const validatePass = (password: string) => {
    return password.length >= 8;
  };

  const Checkregister = async () => {
    let valid = true;

    if (!name) {
        setNameError('Name is required.');
        valid = false;
    } else {
        setNameError('');
    }
    if (!phone) {
        setPhoneError('Phone number is required.');
        valid = false;
    } else if (!validatePhone(phone)) {
        setPhoneError('Invalid phone number.');
        valid = false;
    } else {
        setPhoneError('');
    }
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

      console.log('Signup success');
      const userData = { name, email, password, role:userType, phone };
      console.warn("user",userData);
      
      dispatch(registerUser(userData)).unwrap();
      const datamsg = JSON.stringify(error);

      // Parse it back to an object before accessing `msg`
      const parsedData = JSON.parse(datamsg);
      
      if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
      }else if (parsedData.msg==='User already exists') {

        Alert.alert(  
          'Info',  
          parsedData.msg,  
          [  
              {  
                  text: 'Cancel',  
                  onPress: () => console.log('Cancel Pressed'),  
                  style: 'cancel',  
              },  
              {text: 'OK', onPress: () => console.log('OK Pressed')},  
          ]  
      );  
      }else if (parsedData.msg==='Server error') {
        console.log("Server : ",parsedData.msg);
        Alert.alert("Server Down");
      } else {
        navigation.navigate('Login', { userType });
      }
    
    }
  };
  return (
    <ScrollView style={styles.Scrollcontainer}>
      <View style={styles.container}>
        {/* Top Section with Image and Title */}
        <View style={styles.topContainer}>
          <Image source={SignupFrame} style={styles.image} />
          <Text style={styles.title}>{String(userType)} SignUp</Text>
          <Text style={styles.subtitle}>
            Create a new account by signing up below.
          </Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <CustomInputContainer
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            inputType="name"
            borderColor={THEMECOLORS.primaryColor}
            iconColor={THEMECOLORS.primaryColor}
            bgColor="white"
            inputTextStyle={{color: THEMECOLORS.primaryColor}}
            placeholderColor={THEMECOLORS.primaryColor}
          />
        {nameError ? <Text style={styles.errorMessage}>{nameError}</Text> : null} 
          <CustomInputContainer
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            inputType="phone"
            borderColor={THEMECOLORS.primaryColor}
            iconColor={THEMECOLORS.primaryColor}
            bgColor="white"
            inputTextStyle={{color: THEMECOLORS.primaryColor}}
            placeholderColor={THEMECOLORS.primaryColor}
          />
        {phoneError ? <Text style={styles.errorMessage}>{phoneError}</Text> : null}
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

        {/* Sign Up Button */}
        <CustomButton
          title="Sign Up"
          bgColor={THEMECOLORS.buttonColor}
          textColor={THEMECOLORS.buttonText}
          width={'100%'}
          textStyle={{fontWeight: 'bold'}}
          activeOpacity={0.8}
          onPress={() => Checkregister()}
        />

        {/* Login Section */}
        <Text style={styles.signupText}>Already have an account?</Text>
        <CustomButton
          title="Login"
          bgColor={THEMECOLORS.buttonsecondaryColor}
          textColor={THEMECOLORS.primaryColor}
          textStyle={{fontWeight: 'bold'}}
          width={'100%'}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login', {userType})}
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({

  Scrollcontainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: THEMECOLORS.secondaryColor,
  },
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
    marginBottom: hp('2%'),
  },
  errorMessage: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: hp('1%'),

  },
  signupText: {
    ...TYPOGRAPHY.subText,
    fontSize: wp('4%'),
    textAlign: 'center',
    marginTop: hp('2%'),
  },
});
