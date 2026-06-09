import { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import {
  Card,
  Text,
  Searchbar,
  Chip,
  Divider,
  SegmentedButtons,
} from "react-native-paper";
import { useRouter } from "expo-router";

const CARS_DATA = [
  {
    id: "1",
    brand: "Toyota",
    model: "Avanza",
    year: 2022,
    price: 250000000,
    location: "Jakarta",
    image: require("@/assets/images/toyota avanza (2022).png"),
    km: "15,000",
    transmission: "Manual",
    fuel: "Bensin",
    type: "used",
  },
  {
    id: "2",
    brand: "Honda",
    model: "Jazz",
    year: 2019,
    price: 180000000,
    location: "Bandung",
    image: require("@/assets/images/honda jazz (2019).png"),
    km: "35,000",
    transmission: "Otomatis",
    fuel: "Bensin",
    type: "used",
  },
  {
    id: "3",
    brand: "Mitsubishi",
    model: "Pajero",
    year: 2000,
    price: 150000000,
    location: "Surabaya",
    image: require("@/assets/images/mitsubisi pajero (2000).png"),
    km: "120,000",
    transmission: "Manual",
    fuel: "Diesel",
    type: "used",
  },
  {
    id: "4",
    brand: "Toyota",
    model: "Kijang Innova",
    year: 2023,
    price: 450000000,
    location: "Yogyakarta",
    image: require("@/assets/images/toyota kijang innova (2023).png"),
    km: "8,000",
    transmission: "Otomatis",
    fuel: "Bensin",
    type: "new",
  },
  {
    id: "5",
    brand: "Toyota",
    model: "Land Cruiser",
    year: 2006,
    price: 280000000,
    location: "Semarang",
    image: require("@/assets/images/toyota land cruiser (2006).png"),
    km: "150,000",
    transmission: "Otomatis",
    fuel: "Bensin",
    type: "used",
  },
  {
    id: "6",
    brand: "Toyota",
    model: "Alphard",
    year: 2018,
    price: 580000000,
    location: "Medan",
    image: require("@/assets/images/toyota alphard (2018).png"),
    km: "45,000",
    transmission: "Otomatis",
    fuel: "Bensin",
    type: "used",
  },
];

function formatRupiah(number: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [carType, setCarType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredCars = CARS_DATA.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = carType === "all" || car.type === carType;
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "year") return b.year - a.year;
    return 0;
  });

  const renderCarCard = ({ item }: any) => (
    <Pressable onPress={() => router.push(`/car-detail?id=${item.id}`)}>
      <Card style={styles.carCard}>
        <Card.Cover source={item.image} style={styles.carImage} />
        <Card.Content style={styles.cardContent}>
          <View style={styles.carHeader}>
            <View style={styles.titleSection}>
              <Text style={styles.carBrand}>{item.brand}</Text>
              <Text style={styles.carModel}>{item.model}</Text>
              <Chip mode="outlined" style={styles.typeChip} textStyle={{ fontSize: 10 }}>
                {item.type === "new" ? "Baru" : "Bekas"}
              </Chip>
            </View>
            <Text style={styles.carPrice}>{formatRupiah(item.price)}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.carDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Tahun</Text>
              <Text style={styles.detailValue}>{item.year}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>KM</Text>
              <Text style={styles.detailValue}>{item.km}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Transmisi</Text>
              <Text style={styles.detailValue}>{item.transmission}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>BBM</Text>
              <Text style={styles.detailValue}>{item.fuel}</Text>
            </View>
          </View>
          <View style={styles.locationRow}>
            <Text style={styles.locationText}>📍 {item.location}</Text>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cari Mobil</Text>
        <Text style={styles.headerSubtitle}>Temukan mobil terbaik untukmu</Text>
      </View>

      <Searchbar
        placeholder="Cari berdasarkan merek, model, atau kota..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <View style={styles.filtersContainer}>
        <Text style={styles.filterLabel}>Tipe Mobil</Text>
        <View style={styles.chipRow}>
          <Chip
            selected={carType === "all"}
            onPress={() => setCarType("all")}
            style={[styles.chip, carType === "all" && styles.chipSelected]}
            textStyle={carType === "all" ? { color: "#fff" } : {}}
          >
            Semua
          </Chip>
          <Chip
            selected={carType === "new"}
            onPress={() => setCarType("new")}
            style={[styles.chip, carType === "new" && styles.chipSelected]}
            textStyle={carType === "new" ? { color: "#fff" } : {}}
          >
            Baru
          </Chip>
          <Chip
            selected={carType === "used"}
            onPress={() => setCarType("used")}
            style={[styles.chip, carType === "used" && styles.chipSelected]}
            textStyle={carType === "used" ? { color: "#fff" } : {}}
          >
            Bekas
          </Chip>
        </View>

        <Text style={styles.filterLabel}>Urutkan</Text>
        <SegmentedButtons
          value={sortBy}
          onValueChange={setSortBy}
          buttons={[
            { label: "Terbaru", value: "newest" },
            { label: "Termurah", value: "price-low" },
            { label: "Termahal", value: "price-high" },
          ]}
          style={styles.sortButtons}
        />
      </View>

      <View style={styles.resultsInfo}>
        <Text style={styles.resultsText}>{filteredCars.length} mobil ditemukan</Text>
      </View>

      <FlatList
        data={filteredCars}
        renderItem={renderCarCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>🔍</Text>
            <Text style={styles.emptyText}>Tidak ada mobil ditemukan</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#0D47A1",
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#BBDEFB",
    marginTop: 5,
  },
  searchBar: {
    margin: 15,
    elevation: 2,
    borderRadius: 10,
  },
  filtersContainer: {
    backgroundColor: "#fff",
    padding: 15,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },
  chip: {
    backgroundColor: "#E3F2FD",
  },
  chipSelected: {
    backgroundColor: "#0D47A1",
  },
  sortButtons: {
    marginBottom: 10,
  },
  resultsInfo: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  resultsText: {
    fontSize: 13,
    color: "#666",
  },
  listContent: {
    padding: 15,
    paddingBottom: 100,
  },
  carCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
  },
  carImage: {
    height: 180,
    backgroundColor: "#f0f0f0",
  },
  cardContent: {
    padding: 15,
  },
  carHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  titleSection: {
    flex: 1,
  },
  carBrand: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  carModel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  typeChip: {
    alignSelf: "flex-start",
    marginTop: 5,
  },
  carPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B35",
  },
  divider: {
    marginVertical: 10,
  },
  carDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailItem: {
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  locationRow: {
    marginTop: 5,
  },
  locationText: {
    fontSize: 13,
    color: "#666",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 40,
    marginBottom: 10,
  },
});
