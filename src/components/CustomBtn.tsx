import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
interface ButtonProps {
    onPress:()=>void;
    title:string;
    btnStyle?:ViewStyle,
    titleStyle?:TextStyle
}

const CustomBtn:React.FC<ButtonProps>  = ({onPress , title , btnStyle,titleStyle}) => {
  return (
    <TouchableOpacity style={[styles.btnStyle ,btnStyle]} onPress={onPress}>
        <Text style={[styles.titleStyle , titleStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomBtn

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#87CEEB',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  titleStyle:{
    color:'#000',
    fontWeight:'700',
  }
});