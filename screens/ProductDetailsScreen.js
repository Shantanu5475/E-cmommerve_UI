import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    loadCart();
    loadWishlist();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", marginRight: 10 }}>
          <IconButton
            icon="heart"
            size={24}
            onPress={() => navigation.navigate("Wishlist")}
          />
          <IconButton
            icon="cart"
            size={24}
            onPress={() => navigation.navigate("Cart")}
          />
        </View>
      ),
    });
  }, [navigation]);

  const loadCart = async () => {
    try {
      const storedCart = JSON.parse(await AsyncStorage.getItem("cart")) || [];
      setCart(storedCart);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const loadWishlist = async () => {
    try {
      const storedWishlist =
        JSON.parse(await AsyncStorage.getItem("wishlist")) || [];
      setWishlist(storedWishlist);
      setIsWishlisted(storedWishlist.some((item) => item.id === product.id));
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  };

  const addToCart = async () => {
    try {
      const currentCart = JSON.parse(await AsyncStorage.getItem("cart")) || [];

      if (currentCart.some((item) => item.id === product.id)) {
        alert("This item is already in your cart!");
        return;
      }

      const updatedCart = [...currentCart, product];
      setCart(updatedCart);
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      alert("Added to Cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  const toggleWishlist = async () => {
    try {
      const newStatus = !isWishlisted;
      let updatedWishlist;

      if (newStatus) {
        updatedWishlist = [...wishlist, product];
      } else {
        updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      }

      setIsWishlisted(newStatus);
      setWishlist(updatedWishlist);
      await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <TouchableOpacity
            style={styles.wishlistIcon}
            onPress={toggleWishlist}
          >
            <IconButton
              icon={isWishlisted ? "heart" : "heart-outline"}
              size={30}
              color={isWishlisted ? "red" : "gray"}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>

        <ScrollView
          style={styles.descriptionContainer}
          nestedScrollEnabled={true}
        >
          <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
      </ScrollView>

      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 80 },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  image: { width: "100%", height: 300, resizeMode: "contain" },
  wishlistIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8, color: "#333" },
  price: {
    fontSize: 20,
    color: "#2ecc71",
    marginBottom: 15,
    fontWeight: "bold",
  },
  descriptionContainer: {
    maxHeight: 180,
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  description: {
    fontSize: 17, 
    color: "#333",
    lineHeight: 24, 
    textAlign: "left", 
    fontWeight: "400",
    letterSpacing: 0.5,
  },

  fixedButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  cartButton: {
    backgroundColor: "#ff6f00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },
  cartButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default ProductDetailsScreen;
