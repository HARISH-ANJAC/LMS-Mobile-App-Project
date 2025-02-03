import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import { THEMECOLORS } from '../../Constants/ThemeColor';

interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  inputType?: 'email'| 'name' | 'password' | 'search' | 'phone' | 'numeric' | 'default';
  borderColor?: string;
  bgColor?: string;
  iconColor?: string;
  textColor?: string;
  placeholderColor?: string;
  customStyles?: ViewStyle;
  inputTextStyle?: TextStyle;
}

const CustomInputContainer: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder,
  inputType = 'default',
  borderColor = '#ccc',
  bgColor = '#fff',
  iconColor = '#666',
  textColor = '#000',
  placeholderColor = '#999',
  customStyles = {},
  inputTextStyle = {},
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const getKeyboardType = () => {
    switch (inputType) {
      case 'email':
        return 'email-address';
      case 'phone':
        return 'phone-pad';
      case 'numeric':
        return 'numeric';
      default:
        return 'default';
    }
  };

  const getLeftIcon = () => {
    switch (inputType) {
      case 'email':
        return 'mail';
      case 'password':
        return 'lock';
      case 'name':
        return 'user';
      case 'search':
        return 'search';
      case 'phone':
        return 'phone';
      case 'numeric':
        return 'hash';
      default:
        return null;
    }
  };

  return (
    <>
     <View style={[styles.inputWrapper, customStyles]}>
      <View style={[styles.inputContainer, { borderColor, backgroundColor: bgColor }]}> 
        {getLeftIcon() && (
          <View style={styles.iconContainerLeft}>
            <Icon name={getLeftIcon()!} size={20} color={iconColor} />
          </View>
        )}

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          secureTextEntry={inputType === 'password' && !passwordVisible}
          style={[styles.input, { color: textColor, paddingLeft: getLeftIcon() ? wp('10%') : wp('4%') }, inputTextStyle]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={getKeyboardType()}
          autoCapitalize={inputType === 'email' ? 'none' : 'sentences'}
        />

        {inputType === 'password' && (
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.iconContainer}>
            <Icon name={passwordVisible ? 'eye' : 'eye-off'} size={20} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
    </>
  );
};

export default CustomInputContainer;

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    marginBottom: hp('2%'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('2%'),
    borderWidth: 1,
    paddingHorizontal: wp('3%'),
    },
  input: {
    flex: 1,
    paddingVertical: hp('1.8%'),
    fontSize: wp('4.2%'),
  },
  iconContainer: {
    position: 'absolute',
    right: wp('4%'),
  },
  iconContainerLeft: {
    position: 'absolute',
    left: wp('3%'),
  },
});
