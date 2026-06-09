import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  List,
  Text,
} from "react-native-paper";
import { useRouter } from "expo-router";

// Import data iklan untuk statistik
const MY_ADS_DATA = [
  { id: "1", status: "active" },
  { id: "2", status: "active" },
  { id: "3", status: "sold" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email || "");
        setUserName(user.user_metadata?.name || user.email?.split("@")[0] || "User");
      }
    });
  }, []);

  const handleLogout = async () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin keluar?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await supabase.auth.signOut();
          router.replace("/auth");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        <Text style={styles.headerSubtitle}>Kelola akun Anda</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.profileCard}>
          <Card.Content>
            <View style={styles.profileHeader}>
              <Avatar.Text
                size={80}
                label={userName.substring(0, 2).toUpperCase()}
                style={styles.avatar}
                color="#fff"
              />
              <View style={styles.profileInfo}>
                <Text style={styles.nameText}>{userName}</Text>
                <Text style={styles.emailText}>{userEmail}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {MY_ADS_DATA.filter((ad) => ad.status === "active").length}
                </Text>
                <Text style={styles.statLabel}>Iklan Aktif</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {MY_ADS_DATA.filter((ad) => ad.status === "sold").length}
                </Text>
                <Text style={styles.statLabel}>Mobil Terjual</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Favorit</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.menuCard}>
          <List.Section>
            <List.Item
              title="Iklan Saya"
              left={(props) => (
                <List.Icon {...props} icon="car" color="#0D47A1" />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => router.push("/my-ads")}
            />
            <Divider />
            <List.Item
              title="Mobil Favorit"
              left={(props) => (
                <List.Icon {...props} icon="heart" color="#0D47A1" />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() =>
                Alert.alert("Coming Soon", "Fitur ini belum tersedia")
              }
            />
            <Divider />
            <List.Item
              title="Pesan"
              left={(props) => (
                <List.Icon {...props} icon="message" color="#0D47A1" />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => router.push("/(tabs)/pesan")}
            />
            <Divider />

            <List.Item
              title="Pengaturan Akun"
              left={(props) => (
                <List.Icon {...props} icon="cog" color="#0D47A1" />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => router.push("/(tabs)/settings")}
            />
            <Divider />

            <List.Item
              title="Bantuan"
              left={(props) => (
                <List.Icon {...props} icon="help-circle" color="#0D47A1" />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() =>
                Alert.alert("Bantuan", "Hubungi: support@carsdepok.id")
              }
            />
          </List.Section>
        </Card>

        <Card style={styles.aboutCard}>
          <Card.Content>
            <Text style={styles.aboutTitle}>carsdepok</Text>
            <Text style={styles.aboutVersion}>Versi 1.0.0</Text>
            <Text style={styles.aboutDescription}>
              Platform jual beli mobil terpercaya di Indonesia. Temukan mobil
              impianmu atau jual mobil dengan mudah.
            </Text>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          contentStyle={styles.logoutButtonContent}
          icon="logout"
        >
          Logout
        </Button>
      </ScrollView>
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
  scrollContent: {
    padding: 15,
    paddingBottom: 40,
  },
  profileCard: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    backgroundColor: "#FF6B35",
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  emailText: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  divider: {
    marginVertical: 15,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
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
  menuCard: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 2,
    overflow: "hidden",
  },
  aboutCard: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 2,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D47A1",
    textAlign: "center",
    marginBottom: 5,
  },
  aboutVersion: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 10,
  },
  aboutDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  logoutButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 10,
    marginTop: 10,
  },
  logoutButtonContent: {
    paddingVertical: 8,
  },
});
