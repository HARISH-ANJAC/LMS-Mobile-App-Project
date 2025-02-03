import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { THEMECOLORS } from '../Constants/ThemeColor';
import { TYPOGRAPHY } from '../Constants/Typography';
import { RootFrame } from '../Constants/image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomButton from '../Components/CustomComponents/CustomButton';

const RootScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleRootNavigation = (userType: string) => {
    navigation.navigate('Login', { userType });
  };

  return (
    <View style={styles.container}>
      {/* Top Section with Title & Image */}
      <View style={styles.topContainer}>
        <Text style={styles.title}>Welcome to Our Learning Hub</Text>
        <Image source={RootFrame} style={styles.image} />
      </View>

      {/* Bottom Section with Action Buttons */}
      <View style={styles.bottomContainer}>
        <CustomButton 
          onPress={() => handleRootNavigation('Student')}
          title="I am a Student"
          activeOpacity={0.9}
          bgColor={THEMECOLORS.primaryColor}
          textColor={THEMECOLORS.buttonText}
          style={styles.button}
        />

        <CustomButton 
          onPress={() => handleRootNavigation('Tutor')}
          title="I am a Tutor"
          activeOpacity={0.9}
          bgColor={THEMECOLORS.thirdColor}
          textColor={THEMECOLORS.buttonText}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default RootScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEMECOLORS.secondaryColor, // Set solid background color
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('5%'),
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...TYPOGRAPHY.heading1,
    fontSize: wp('6.5%'),
    color: THEMECOLORS.primaryColor,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: hp('3%'),
  },
  image: {
    width: wp('75%'),
    height: hp('40%'),
    resizeMode: 'contain',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: hp('5%'),
  },
  button: {
    width: wp('85%'),
    paddingVertical: hp('2%'),
    borderRadius: wp('10%'),
    marginVertical: hp('1.5%'),
    backgroundColor: THEMECOLORS.primaryColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
});
