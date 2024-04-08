import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const sizes = ["S", "M", "L", "XL"] as const;

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image ?? defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
  },
  price: {
    color: "black",
    fontWeight: "600",
    fontSize: 18,
    marginTop: "auto",
  },
});

export default ProductDetailScreen;
