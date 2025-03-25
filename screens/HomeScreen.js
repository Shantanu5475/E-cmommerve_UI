import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductCard from "../components/ProductCard";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Show all products initially
      })
      .catch((error) => console.error(error));

    loadWishlist();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadWishlist(); // Reload wishlist when screen is focused
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.headerTitle}>MobaKart</Text>,
      headerStyle: { backgroundColor: "#ff6f00" },
    });
  }, [navigation]);

  const loadWishlist = async () => {
    const storedWishlist =
      JSON.parse(await AsyncStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  };

  const toggleWishlist = async (product) => {
    let updatedWishlist;
    const storedWishlist =
      JSON.parse(await AsyncStorage.getItem("wishlist")) || [];

    if (storedWishlist.some((item) => item.id === product.id)) {
      updatedWishlist = storedWishlist.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist = [...storedWishlist, product];
    }

    setWishlist(updatedWishlist);
    await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleFilter = () => {
    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.category === selectedCategory.toLowerCase()
      );
    }

    if (selectedPriceRange === "$0 - $50") {
      filtered = filtered.filter((p) => p.price >= 0 && p.price <= 50);
    } else if (selectedPriceRange === "$50 - $100") {
      filtered = filtered.filter((p) => p.price > 50 && p.price <= 100);
    } else if (selectedPriceRange === "$100 - $200") {
      filtered = filtered.filter((p) => p.price > 100 && p.price <= 200);
    } else if (selectedPriceRange === "$200+") {
      filtered = filtered.filter((p) => p.price > 200);
    }

    setFilteredProducts(filtered);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Products..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      {/* Filter Button */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Options</Text>

            {/* Category Filter */}
            <Text style={styles.filterLabel}>Category</Text>
            {[
              "All",
              "Men's Clothing",
              "Women's Clothing",
              "Electronics",
              "Jewelery",
            ].map((category) => (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.filterOption,
                    selectedCategory === category && styles.selectedOption,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}

            {/* Price Range Filter */}
            <Text style={styles.filterLabel}>Price Range</Text>
            {["All", "$0 - $50", "$50 - $100", "$100 - $200", "$200+"].map(
              (price) => (
                <Pressable
                  key={price}
                  onPress={() => setSelectedPriceRange(price)}
                >
                  <Text
                    style={[
                      styles.filterOption,
                      selectedPriceRange === price && styles.selectedOption,
                    ]}
                  >
                    {price}
                  </Text>
                </Pressable>
              )
            )}

            {/* Apply Button */}
            <TouchableOpacity style={styles.applyButton} onPress={handleFilter}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Product List */}
      <FlatList
        data={filteredProducts.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetails", { product: item })
            }
            onWishlist={() => toggleWishlist(item)}
            isWishlisted={wishlist.some((wish) => wish.id === item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f8f9fa",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
  searchBar: {
    height: 45,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  filterButton: {
    backgroundColor: "#ff6f00",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  filterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  productList: {
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  filterOption: {
    fontSize: 14,
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#eee",
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: "#ff6f00",
    color: "#fff",
  },
  applyButton: {
    marginTop: 15,
    backgroundColor: "#ff6f00",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
