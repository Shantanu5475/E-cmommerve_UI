import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckoutScreen = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const storedCart = JSON.parse(await AsyncStorage.getItem("cart")) || [];
    setCart(storedCart);
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>
              {item.title} - ${item.price}
            </Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${getTotal()}</Text>
      <Button
        title="Confirm Purchase"
        onPress={() => alert("Order Placed Successfully!")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  cartItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  total: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
});

export default CheckoutScreen;
