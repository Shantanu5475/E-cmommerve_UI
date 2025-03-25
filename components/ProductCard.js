import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; 

const ProductCard = ({ product, onPress, onWishlist, isWishlisted }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onWishlist} style={styles.wishlistButton}>
        <FontAwesome
          name="heart"
          size={24}
          color={isWishlisted ? "red" : "grey"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: { width: "100%", height: 150, resizeMode: "contain" },
  title: { fontSize: 16, fontWeight: "bold", marginVertical: 5 },
  price: { fontSize: 14, color: "green" },
  wishlistButton: { position: "absolute", top: 10, right: 10 },
});

export default ProductCard;
