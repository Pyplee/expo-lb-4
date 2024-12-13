import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const CustomBtn = ({ count, addToCart, removeFromCart, product }) => {
  return (
  <View style={styles.complexButtonContainer}>
    <TouchableOpacity style={styles.buttonManageCount} onPress={() => removeFromCart(product)}>
      <Entypo name="minus" size={24} color="white" />
    </TouchableOpacity>
    <Text style={styles.countText}>{count}</Text>
    <TouchableOpacity style={styles.buttonManageCount} onPress={() => addToCart(product)}>
      <Entypo name="plus" size={24} color="white" />
    </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
  buttonManageCount: {
    width:'20%',
  },
  countText: {
    color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
      width: '60%',
      textAlign: 'center',
  },
  complexButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '40%',
    backgroundColor: '#0a7dff',
    borderRadius: 8,
    paddingVertical: 12,
  },
});

export  default CustomBtn;