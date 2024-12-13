import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import CartItem from '../../components/CartItem';
import { addToCart, removeFromCart, getCountItem, getCartItems, deleteItem } from '../../db/database';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
      try {
        const cartItemsFromDB = await getCartItems();
        setCartItems(cartItemsFromDB);
      } catch (error) {
        console.error('Ошибка при получении товаров из корзины:', error);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      fetchData();
    }, [setCartItems]);

    const handleDeleteFromCart = async (item) => {
      setLoading(true);
      await deleteItem(item.id);
      await fetchData();
    };
    
    const handlePlusCount = async (item) => {
      await addToCart(item);
      await fetchData();
    };
    
    const handleMinusCount = async (item) => {
      await removeFromCart(item.id);
      await fetchData();
    };

    const fetchCartItems = async () => {
        setRefreshing(true);
        try {
            const cartItemsFromDB = await getCartItems();
            setCartItems(cartItemsFromDB);
        } catch (error) {
            console.error('Ошибка при получении товаров из корзины:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <CartItem
            item={item}
            getCountItem={getCountItem}
            addToCart={handlePlusCount}
            removeFromCart={handleMinusCount}
            deleteFromCart={handleDeleteFromCart}
            />
        );
    };

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Корзина пуста</Text>
        </View>
    );

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
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                refreshing={refreshing}
                onRefresh={fetchCartItems}
                ListEmptyComponent={renderEmptyComponent}
                contentContainerStyle={cartItems.length === 0 ? styles.emptyList : null}
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
        padding: 20,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        
    },
    emptyText: {
        fontSize: 25,
        color: '#999',
    },
    emptyList: {
        flexGrow: 1, 
        justifyContent: 'center',
        textAlign: 'center', 
    },
});
