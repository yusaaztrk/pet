import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const MarketScreen: React.FC = () => {
  // Örnek kategoriler
  const categories = [
    { id: 1, name: 'Mama', icon: '🍽️' },
    { id: 2, name: 'Oyuncak', icon: '🎾' },
    { id: 3, name: 'Bakım', icon: '🧴' },
    { id: 4, name: 'Aksesuar', icon: '🎀' },
    { id: 5, name: 'Yatak', icon: '🛏️' },
    { id: 6, name: 'Taşıma', icon: '🎒' },
  ];

  // Örnek ürünler için boş kutular
  const products = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    name: `Ürün ${index + 1}`,
  }));

  return (
    <ScrollView style={styles.container}>
      {/* Arama çubuğu alanı */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchPlaceholder}>🔍 Ürün ara...</Text>
      </View>

      {/* Kategoriler */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kategoriler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => console.log(`${category.name} kategorisi seçildi`)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Öne Çıkan Ürünler */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Öne Çıkan Ürünler</Text>
        <View style={styles.featuredContainer}>
          <TouchableOpacity style={styles.featuredCard}>
            <View style={styles.productPlaceholder}>
              <Text style={styles.placeholderText}>Özel Ürün</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Ürünler Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tüm Ürünler</Text>
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => console.log(`${product.name} seçildi`)}
            >
              <View style={styles.productImagePlaceholder}>
                <Text style={styles.placeholderText}>Resim</Text>
              </View>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>₺00.00</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#D8BFD8',
  },
  searchPlaceholder: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  categoryCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: 80,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  },
  featuredContainer: {
    paddingHorizontal: 15,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#8A2BE2',
  },
  productPlaceholder: {
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '47%',
  },
  productImagePlaceholder: {
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
});

export default MarketScreen;