import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import {
  Card,
  Chip,
  Divider,
  FAB,
  Text,
  Button,
} from "react-native-paper";
import { useRouter } from "expo-router";

// Data iklan pengguna
const MY_ADS_DATA = [
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
    status: "active",
    views: 125,
    created: "2 hari yang lalu",
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
    status: "active",
    views: 89,
    created: "5 hari yang lalu",
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
    status: "sold",
    views: 234,
    created: "1 minggu yang lalu",
  },
];

function formatRupiah(number: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

export default function MyAdsScreen() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredAds = MY_ADS_DATA.filter((ad) => {
    if (filterStatus === "all") return true;
    return ad.status === filterStatus;
  });

  const activeAdsCount = MY_ADS_DATA.filter((ad) => ad.status === "active").length;
  const soldAdsCount = MY_ADS_DATA.filter((ad) => ad.status === "sold").length;

  const handleDeleteAd = (adId: string, model: string) => {
    Alert.alert(
      "Hapus Iklan",
      `Apakah Anda yakin ingin menghapus iklan ${model}?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            Alert.alert("Sukses", "Iklan berhasil dihapus");
          },
        },
      ]
    );
  };

  const handleEditAd = (adId: string) => {
    router.push(`/add?edit=${adId}`);
  };

  const renderAdCard = ({ item }: any) => (
    <Card style={styles.adCard}>
      <Pressable onPress={() => router.push(`/car-detail?id=${item.id}`)}>
        <Card.Cover source={item.image} style={styles.adImage} />
      </Pressable>
      <Card.Content style={styles.cardContent}>
        <View style={styles.adHeader}>
          <View style={styles.titleSection}>
            <Text style={styles.adBrand}>{item.brand}</Text>
            <Text style={styles.adModel}>{item.model}</Text>
            <View style={styles.statusRow}>
              <Chip
                mode="outlined"
                style={[
                  styles.statusChip,
                  item.status === "active" ? styles.statusActive : styles.statusSold,
                ]}
                textStyle={{ fontSize: 10 }}
              >
                {item.status === "active" ? "Aktif" : "Terjual"}
              </Chip>
              <Chip mode="outlined" style={styles.viewsChip} textStyle={{ fontSize: 10 }}>
                👁️ {item.views}
              </Chip>
            </View>
          </View>
          <Text style={styles.adPrice}>{formatRupiah(item.price)}</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.adDetails}>
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
          <Text style={styles.dateText}>{item.created}</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            onPress={() => handleEditAd(item.id)}
            style={styles.editButton}
            icon="pencil"
            compact
          >
            Edit
          </Button>
          <Button
            mode="outlined"
            onPress={() => handleDeleteAd(item.id, item.model)}
            style={styles.deleteButton}
            textColor="#D32F2F"
            icon="delete"
            compact
          >
            Hapus
          </Button>
          {item.status === "active" && (
            <Button
              mode="outlined"
              onPress={() => {
                Alert.alert("Sukses", "Iklan ditandai terjual");
              }}
              style={styles.soldButton}
              textColor="#4CAF50"
              icon="check-circle"
              compact
            >
              Tandai Terjual
            </Button>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Iklan Saya</Text>
        <Text style={styles.headerSubtitle}>Kelola iklan mobil Anda</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{MY_ADS_DATA.length}</Text>
          <Text style={styles.statLabel}>Total Iklan</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#4CAF50" }]}>{activeAdsCount}</Text>
          <Text style={styles.statLabel}>Aktif</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#FF9800" }]}>{soldAdsCount}</Text>
          <Text style={styles.statLabel}>Terjual</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter:</Text>
        <View style={styles.filterButtons}>
          <Chip
            selected={filterStatus === "all"}
            onPress={() => setFilterStatus("all")}
            style={[styles.filterChip, filterStatus === "all" && styles.filterChipSelected]}
            textStyle={filterStatus === "all" ? { color: "#fff" } : {}}
          >
            Semua
          </Chip>
          <Chip
            selected={filterStatus === "active"}
            onPress={() => setFilterStatus("active")}
            style={[styles.filterChip, filterStatus === "active" && styles.filterChipSelected]}
            textStyle={filterStatus === "active" ? { color: "#fff" } : {}}
          >
            Aktif
          </Chip>
          <Chip
            selected={filterStatus === "sold"}
            onPress={() => setFilterStatus("sold")}
            style={[styles.filterChip, filterStatus === "sold" && styles.filterChipSelected]}
            textStyle={filterStatus === "sold" ? { color: "#fff" } : {}}
          >
            Terjual
          </Chip>
        </View>
      </View>

      <View style={styles.resultsInfo}>
        <Text style={styles.resultsText}>
          {filteredAds.length} iklan ditemukan
        </Text>
      </View>

      <FlatList
        data={filteredAds}
        renderItem={renderAdCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🚗</Text>
            <Text style={styles.emptyText}>Belum ada iklan</Text>
            <Text style={styles.emptySubtext}>
              Mulai jual mobil pertama Anda sekarang!
            </Text>
            <Button
              mode="contained"
              onPress={() => router.push("/add")}
              style={styles.emptyButton}
              icon="plus"
            >
              Pasang Iklan Pertama
            </Button>
          </View>
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/add")}
        color="#fff"
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
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    gap: 10,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0D47A1",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  filterContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 10,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: "row",
    gap: 8,
  },
  filterChip: {
    backgroundColor: "#E3F2FD",
  },
  filterChipSelected: {
    backgroundColor: "#0D47A1",
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
  adCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
  },
  adImage: {
    height: 200,
    backgroundColor: "#f0f0f0",
  },
  cardContent: {
    padding: 15,
  },
  adHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  titleSection: {
    flex: 1,
  },
  adBrand: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  adModel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  statusRow: {
    flexDirection: "row",
    gap: 5,
    marginTop: 8,
  },
  statusChip: {
    marginRight: 0,
  },
  statusActive: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
  },
  statusSold: {
    backgroundColor: "#FFF3E0",
    borderColor: "#FF9800",
  },
  viewsChip: {
    backgroundColor: "#F5F5F5",
  },
  adPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B35",
  },
  divider: {
    marginVertical: 10,
  },
  adDetails: {
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  locationText: {
    fontSize: 13,
    color: "#666",
  },
  dateText: {
    fontSize: 12,
    color: "#999",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  editButton: {
    flex: 1,
    borderColor: "#0D47A1",
  },
  deleteButton: {
    flex: 1,
    borderColor: "#D32F2F",
  },
  soldButton: {
    flex: 1,
    borderColor: "#4CAF50",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: "#FF6B35",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FF6B35",
  },
});
