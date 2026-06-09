import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  Card,
  SegmentedButtons,
  Text,
  TextInput,
} from "react-native-paper";

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) {
      Alert.alert("Error", "Email and password tidak boleh kosong");
      return;
    }

    if (mode === "register" && !name) {
      Alert.alert("Error", "Nama wajib diisi");
      return;
    }

    setLoading(true);

    try {
      if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        });
        if (error) {
          Alert.alert("Gagal", error.message);
        } else {
          Alert.alert("Sukses", "Registrasi berhasil! Silakan login.");
          setMode("login");
          setEmail("");
          setPassword("");
          setName("");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          Alert.alert("Gagal", error.message);
        } else {
          router.replace("/(tabs)");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>🚗</Text>
            <Text style={styles.title}>nabil_rental</Text>
            <Text style={styles.subtitle}>
              Sistem Pelaporan Pengaduan Masyarakat
            </Text>
          </View>

          {/* Auth Card */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>
                {mode === "login" ? "Selamat Datang" : "Buat Akun Baru"}
              </Text>
              <Text style={styles.cardSubtitle}>
                {mode === "login"
                  ? "Login untuk melanjutkan"
                  : "Daftar untuk mulai bertransaksi"}
              </Text>

              <SegmentedButtons
                value={mode}
                onValueChange={(v) => setMode(v)}
                buttons={[
                  {
                    label: "Login",
                    value: "login",
                  },
                  {
                    label: "Register",
                    value: "register",
                  },
                ]}
                style={styles.segmentedButtons}
              />

              {mode === "register" && (
                <TextInput
                  label="Nama Lengkap"
                  placeholder="Masukkan nama lengkap"
                  style={styles.input}
                  onChangeText={(text) => setName(text)}
                  value={name}
                  mode="outlined"
                />
              )}

              <TextInput
                label="Email"
                placeholder="contoh@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
                mode="outlined"
              />

              <TextInput
                label="Password"
                placeholder="Masukkan password"
                secureTextEntry={!showPassword}
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                mode="outlined"
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
                contentStyle={styles.buttonContent}
                loading={loading}
                disabled={loading}
              >
                {mode === "login" ? "Login" : "Daftar Sekarang"}
              </Button>

              {mode === "login" && (
                <Button
                  mode="text"
                  onPress={() => {}}
                  style={styles.forgotButton}
                >
                  Lupa Password?
                </Button>
              )}
            </Card.Content>
          </Card>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {mode === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
            </Text>
            <Button
              mode="text"
              onPress={() => setMode(mode === "login" ? "register" : "login")}
              style={styles.footerButton}
              labelStyle={styles.footerButtonLabel}
            >
              {mode === "login" ? "Daftar" : "Login"}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D47A1",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: "#BBDEFB",
    marginTop: 5,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 5,
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  segmentedButtons: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#FF6B35",
  },
  buttonContent: {
    paddingVertical: 8,
  },
  forgotButton: {
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#BBDEFB",
    fontSize: 14,
  },
  footerButton: {
    margin: 0,
    padding: 0,
  },
  footerButtonLabel: {
    color: "#FF6B35",
    fontWeight: "bold",
    fontSize: 14,
  },
});
