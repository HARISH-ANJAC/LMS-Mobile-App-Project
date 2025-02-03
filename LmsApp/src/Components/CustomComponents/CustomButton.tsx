import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle, StyleProp } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { THEMECOLORS } from '../../Constants/ThemeColor';

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    activeOpacity?: number;
    bgColor?: string;
    textColor?: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    borderRadius?: number;
    paddingVertical?: number;
    width?: number | `${number}%`;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    onPress,
    title,
    activeOpacity = 0.8,
    bgColor = THEMECOLORS.buttonColor,
    textColor = THEMECOLORS.buttonText,
    style,
    textStyle,
    disabled = false,
    borderRadius = wp('3%'),
    paddingVertical = hp('2%'),
    width = '85%',
}) => {
    return (
        <TouchableOpacity
            onPress={!disabled ? onPress : undefined}
            activeOpacity={activeOpacity}
            style={[
                styles.loginButton,
                { 
                    backgroundColor: disabled ? THEMECOLORS.inputBorderColor : bgColor,
                    borderRadius,
                    paddingVertical,
                    width: typeof width === 'string' ? width : `${width}%`,
                    opacity: disabled ? 0.5 : 1,
                },
                style,
            ]}
            disabled={disabled}
        >
            <Text style={[styles.buttonText, { color: textColor }, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: hp('1.5%'),
        elevation: 6,
        shadowColor: THEMECOLORS.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    buttonText: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
