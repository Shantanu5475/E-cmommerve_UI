import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import CartScreen from "./screens/CartScreen";
import WishlistScreen from "./screens/WishlistScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
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
          })}
        />

        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
