import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  Text,
  Avatar,
  List,
  Divider,
  Appbar,
  Switch,
} from "react-native-paper";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();

  const [notif, setNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Yakin mau keluar?", [
      { text: "Batal", style: "cancel" },
      { text: "Keluar", onPress: () => console.log("Logout") },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Appbar.Header>
        <Appbar.Content title="Pengaturan" />
      </Appbar.Header>

      {/* PROFILE */}
      <View style={styles.profile}>
        <Avatar.Text size={70} label="NA" />
        <Text style={styles.name}>Nabil Atha</Text>
        <Text style={styles.sub}>Akun aktif</Text>
      </View>

      <Divider />

      {/* AKUN */}
      <List.Section>
        <List.Subheader>Akun</List.Subheader>

        <List.Item
          title="Edit Profil"
          description="Ubah nama & foto"
          left={(props) => <List.Icon {...props} icon="account-edit" />}
          onPress={() => Alert.alert("Info", "Fitur belum ada")}
        />

        <List.Item
          title="Pesan"
          description="Chat dengan penjual / bantuan"
          left={(props) => <List.Icon {...props} icon="message" />}
          onPress={() => router.push("/(tabs)/pesan")}
        />
      </List.Section>

      <Divider />

      {/* PREFERENSI */}
      <List.Section>
        <List.Subheader>Preferensi</List.Subheader>

        <List.Item
          title="Notifikasi"
          description="Aktifkan notifikasi"
          left={(props) => <List.Icon {...props} icon="bell" />}
          right={() => <Switch value={notif} onValueChange={setNotif} />}
        />

        <List.Item
          title="Dark Mode"
          description="Mode gelap aplikasi"
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => <Switch value={darkMode} onValueChange={setDarkMode} />}
        />
      </List.Section>

      <Divider />

      {/* LAINNYA */}
      <List.Section>
        <List.Subheader>Lainnya</List.Subheader>

        <List.Item
          title="Bantuan"
          left={(props) => <List.Icon {...props} icon="help-circle" />}
          onPress={() => router.push("/(tabs)/pesan")}
        />

        <List.Item
          title="Tentang Aplikasi"
          left={(props) => <List.Icon {...props} icon="information" />}
          onPress={() => Alert.alert("HeyBro Store", "Versi 1.0")}
        />

        <List.Item
          title="Logout"
          left={(props) => <List.Icon {...props} icon="logout" color="red" />}
          titleStyle={{ color: "red" }}
          onPress={handleLogout}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  profile: {
    alignItems: "center",
    padding: 20,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  sub: {
    fontSize: 14,
    color: "#666",
  },
});
