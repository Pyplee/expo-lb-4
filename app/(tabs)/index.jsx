import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { initDB, addToCart, removeFromCart, getCountItem } from '../../db/database';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        initDB();
        // dropDB();
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setRefreshing(true);
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts([]);
            setProducts(data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    };

    const handleAddFromCart = async (product) => {
      try {
        await addToCart(product);
        await fetchProducts();
        setError(null);
      } catch (error) {
        setError(error);
      }
  };

    const handleRemoveFromCart = async (id) => {
      try {
        await removeFromCart(id);
        await fetchProducts();
        setError(null);
      } catch (error) {
        setError(error);
      }
  };

    const renderItem = ({ item }) => (
        <ProductCard
        product={item}
        addToCart={handleAddFromCart}
        removeFromCart={handleRemoveFromCart}
        getCount={getCountItem}
        />
    );

    if (error !== null) {
      return (
        <View style={styles.container}>
          <MaterialIcons name="error" size={100} color="red" />
            <Text style={styles.textError}>Произошла ошибка, попробуйте ещё раз</Text>
            <Text style={styles.textError}>Ошибка: { error }</Text>
        </View>
      );
    }

  if (loading) {
      return (
        <View style={styles.container}>
          <SafeAreaProvider>
            <SafeAreaView style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      );
  }

    return (
        <View style={styles.container}>
          <FlatList
              data={products}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              refreshing={refreshing}
              onRefresh={fetchProducts}
          />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 34,
        color: '#f3faf9',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 20,
        color: '#fffaf9',
        textAlign: 'center',
    },
    textError: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
});
