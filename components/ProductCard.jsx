import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CustomBtn from './CustomBtn';

const ProductCard = ({ product, addToCart, removeFromCart, getCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getCount(product.id));
  }, [product.id, count]);

  const handlePlusCount = async (product) => {
    addToCart(product);
    setCount(getCount(product.id));
  };

  const handleMinusCount = async (product) => {
    removeFromCart(product.id);
    setCount(getCount(product.id));
  };

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: product.image }}
                style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1,
                    resizeMode: 'contain',
                    marginBottom: 10
                }}
            />
            <Text style={styles.title}>{product.title}</Text>
            <View style={styles.priceAndButton}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              {count > 0 ? (
                  <CustomBtn
                  count={count}
                  addToCart={handlePlusCount}
                  removeFromCart={handleMinusCount}
                  product={product}
                  />
              ) : (
                <TouchableOpacity style={styles.button} onPress={() => addToCart(product) && setCount(1)}>
                  <Text style={styles.buttonText}>В корзину</Text>
                </TouchableOpacity>
              )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginVertical: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    price: {
        fontSize: 30,
        color: '#ff2b2b',
        marginBottom: 10,
        width: '50%',
    },
    button: {
        backgroundColor: '#0a7dff',
        borderRadius: 8,
        paddingVertical: 12,
        width: '40%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        width: '100%',
        textAlign: 'center',
    },
    priceAndButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
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
});

export default ProductCard;
