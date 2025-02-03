import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ForgetPassFrame } from '../Constants/image';
import { THEMECOLORS } from '../Constants/ThemeColor';
import CustomInputContainer from '../Components/CustomComponents/CustomInputContainer';
import CustomButton from '../Components/CustomComponents/CustomButton';
import { TYPOGRAPHY } from '../Constants/Typography';
const ForgetpassScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  // Email Validation
  const validateEmail = (email: string) => {
    const EMAILPATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EMAILPATTERN.test(email);
  };
  const CheckForgetPass=()=>{
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
    if (valid) {
      console.log('Forget Password success');
     // navigation.navigate('StudentDashboard');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.TopContainer}>
         <Image source={ForgetPassFrame} style={styles.Image} />
          <View style={styles.TextContainer}>
            <Text style={styles.saveSubText}>Save your account now!</Text>
            <Text style={styles.ResetText}>Reset Password</Text>
          </View>
          <View style={styles.InputContainer}>
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
            
            <CustomButton
              title="Reset Password"
              onPress={CheckForgetPass}
              />
          </View>
      </View>
    </View>
  );
};

export default ForgetpassScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin:6,
    backgroundColor:'white',
   },
   TopContainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'flex-start',
      marginTop:hp('7%'),
    },
    Image:{
      width:wp('100%'),
      height:hp('25%'),
      resizeMode:'contain',
    },
    TextContainer:{
      alignItems:'center',
      justifyContent:'center',
      textAlign:'center',
      marginVertical:hp('3%'),
      marginHorizontal:wp('5%'),
    },
    saveSubText:{
      ...TYPOGRAPHY.heading1,
      fontSize: wp('6%'),
      textAlign: 'center',
      color: THEMECOLORS.primaryColor,
    },
    ResetText:{
      ...TYPOGRAPHY.subText,
      fontSize: wp('4%'),
      textAlign: 'center',
      marginTop: hp('1%'),
    },
    InputContainer:{
      width:wp('90%'),
      height:hp('20%'),
      marginVertical:hp('2%'),
      marginHorizontal:wp('5%'),
      borderRadius:wp('2%'),
      alignItems:'center',
    },
    errorMessage: {
       color: 'red',
       alignSelf: 'flex-start',
       marginBottom: hp('1%'),
       marginLeft:wp('1.4%'),
    },
});
