import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CustomBtn from './CustomBtn';
import AntDesign from '@expo/vector-icons/AntDesign';

const CartItem = ({ item, addToCart, removeFromCart, deleteFromCart, getCountItem }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getCountItem(item.id));
  }, [count, item.id]);

    return (
        <View style={styles.container}>
            <View style={styles.imageAndText}>
              <Image
                  source={{ uri: item.image }}
                  style={{
                      width: '50%',
                      height: undefined,
                      aspectRatio: 1,
                      resizeMode: 'contain',
                      marginBottom: 10
                  }}
              />
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <Text style={styles.price}>${(item.price * count).toFixed(2)}</Text>
            <View style={styles.containerButtonns}>
              <CustomBtn
              count={count}
              addToCart={() => {
                addToCart(item)
                setCount(count + 1)
              }}
              removeFromCart={() => {
                removeFromCart(item)
                setCount(count - 1)
              }}
              product={item}
              />
              <TouchableOpacity style={styles.button} onPress={() => deleteFromCart(item)}>
                  <Text style={styles.buttonText}>
                    <AntDesign name="delete" size={24} color="#ff6161" />
                  </Text>
              </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 10,
        flexDirection: 'column',
    },
    image: {
        width: 101,
        height: 101,
        borderRadius: 12,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        width: '50%'
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0AA5FF',
    },
    quantity: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 5,
    },
    button: {
      backgroundColor: 'gray',
      borderRadius: 8,
      paddingVertical: 12,
      width: '20%',
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
      width: '100%',
      textAlign: 'center',
    },
    containerButtonns: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginTop: 10
    },
    imageAndText: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
});

export default CartItem;
