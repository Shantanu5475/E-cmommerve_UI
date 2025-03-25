import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const storedCart = JSON.parse(await AsyncStorage.getItem("cart")) || [];
    setCart(storedCart);
  };

  const removeItem = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = async () => {
    await AsyncStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              {/* Left Section: Product Details */}
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>

              {/* Right Section: Remove Button */}
              <TouchableOpacity
                onPress={() => removeItem(item.id)}
                style={styles.removeButton}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Cart Summary */}
      {cart.length > 0 && (
        <View style={styles.cartSummary}>
          <Text style={styles.totalText}>
            Total:{" "}
            <Text style={styles.totalAmount}>
              ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </Text>
          </Text>
          <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#7f8c8d",
  },

  // Cart Item Card
  cartItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34495e",
  },
  itemPrice: {
    fontSize: 14,
    color: "#16a085",
    marginTop: 4,
  },

  // Remove Button
  removeButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  // Cart Summary
  cartSummary: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e67e22",
  },

  // Clear Cart Button
  clearButton: {
    marginTop: 10,
    backgroundColor: "#e67e22",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
