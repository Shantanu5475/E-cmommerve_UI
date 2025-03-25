import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadWishlist);
    return unsubscribe;
  }, [navigation]);

  const loadWishlist = async () => {
    const wishlistData =
      JSON.parse(await AsyncStorage.getItem("wishlist")) || [];
    setWishlist(wishlistData);
  };

  const removeFromWishlist = async (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  
    // Notify HomeScreen to update its wishlist
    navigation.navigate({ wishlistUpdated: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Wishlist</Text>

      {wishlist.length === 0 ? (
        <Text style={styles.emptyText}>Your wishlist is empty</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.wishlistItem}>
              {/* Left: Product Details */}
              <View style={styles.itemInfo}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductDetails", { product: item })
                  }
                >
                  <Text style={styles.itemTitle}>{item.title}</Text>
                </TouchableOpacity>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>

              {/* Right: Remove Button */}
              <TouchableOpacity
                onPress={() => removeFromWishlist(item.id)}
                style={styles.removeButton}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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

  // Wishlist Item Card
  wishlistItem: {
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
    textDecorationLine: "underline", 
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
});

export default WishlistScreen;
