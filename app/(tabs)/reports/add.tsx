import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, FAB, Text, TextInput } from "react-native-paper";

type FormState = {
  judul: string;
  isi: string;
  lokasi: string;
};

export default function AddReportScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    judul: "",
    isi: "",
    lokasi: "",
  });

  const canSubmit = useMemo(() => {
    return form.judul.trim().length > 0 && form.isi.trim().length > 0;
  }, [form.judul, form.isi]);

  const resetForm = () => {
    setForm({
      judul: "",
      isi: "",
      lokasi: "",
    });
  };

  const handleSubmit = async () => {
    if (!canSubmit) {
      Alert.alert("Error", "Judul dan isi laporan wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError) throw authError;

      const userId = authData.user?.id;

      if (!userId) {
        Alert.alert("Login diperlukan", "Silakan login terlebih dahulu");
        return;
      }

      const payload = {
        user_id: userId,
        judul: form.judul.trim(),
        isi: form.isi.trim(),
        lokasi: form.lokasi.trim() || null,
        status: "pending",
      };

      console.log("Payload laporan:", payload);

      const { data, error } = await supabase
        .from("reports")
        .insert(payload)
        .select()
        .single();

      if (error) {
        console.log("Supabase Error:", error);
        throw error;
      }

      console.log("Laporan berhasil dibuat:", data);

      resetForm();

      Alert.alert("Berhasil", "Laporan berhasil dikirim", [
        {
          text: "Lihat Daftar",
          onPress: () => {
            router.replace("/reports");
          },
        },
      ]);
    } catch (e: any) {
      console.log("ERROR REPORT:", e);

      Alert.alert(
        "Gagal menambahkan laporan",
        e?.message || "Terjadi kesalahan saat menyimpan data",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tambah Laporan</Text>

        <Text style={styles.headerSubtitle}>
          Laporkan masalah yang terjadi di sekitar kamu
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Informasi Pengaduan</Text>

            <TextInput
              label="Judul *"
              value={form.judul}
              mode="outlined"
              style={styles.input}
              placeholder="Contoh: Lampu jalan rusak"
              onChangeText={(text) =>
                setForm((prev) => ({
                  ...prev,
                  judul: text,
                }))
              }
            />

            <TextInput
              label="Lokasi"
              value={form.lokasi}
              mode="outlined"
              style={styles.input}
              placeholder="Contoh: Jl. Merdeka"
              onChangeText={(text) =>
                setForm((prev) => ({
                  ...prev,
                  lokasi: text,
                }))
              }
            />

            <TextInput
              label="Isi *"
              value={form.isi}
              mode="outlined"
              multiline
              numberOfLines={5}
              style={styles.textArea}
              placeholder="Jelaskan detail masalah..."
              onChangeText={(text) =>
                setForm((prev) => ({
                  ...prev,
                  isi: text,
                }))
              }
            />

            <Button
              mode="contained"
              loading={loading}
              disabled={loading || !canSubmit}
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              Kirim Laporan
            </Button>

            <Button
              mode="outlined"
              disabled={loading}
              onPress={() => router.back()}
              style={styles.cancelButton}
            >
              Batal
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="list"
        color="#fff"
        style={styles.fab}
        onPress={() => router.push("/reports")}
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
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#BBDEFB",
    fontSize: 14,
    marginTop: 6,
  },

  scrollContent: {
    padding: 15,
    paddingBottom: 120,
  },

  card: {
    borderRadius: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  textArea: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  submitButton: {
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: "#FF6B35",
  },

  cancelButton: {
    marginTop: 10,
    borderRadius: 10,
  },

  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 16,
    backgroundColor: "#0D47A1",
  },
});
