import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

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

  const handleSubmit = async () => {
    if (!canSubmit) {
      Alert.alert("Error", "Judul dan isi wajib diisi");
      return;
    }

    setLoading(true);
    try {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr) throw userErr;

      const userId = userData.user?.id;

      if (!userId) {
        Alert.alert("Error", "Sesi login tidak ditemukan. Silakan login lagi.");
        return;
      }

      const payload: Record<string, any> = {
        user_id: userId,
        judul: form.judul,
        isi: form.isi,
        lokasi: form.lokasi || null,
        status: "pending",
      };

      // Ambil created_at dari DB kalau ada default/trigger
      // (supaya list yang order by created_at tidak kosong)
      const { error: insertErr } = await supabase
        .from("reports")
        .insert(payload);

      if (insertErr) throw insertErr;

      Alert.alert("Terkirim", "Laporan berhasil ditambahkan.", [
        {
          text: "OK",
          onPress: () => router.replace("/reports" as any),
        },
      ]);
    } catch (e: any) {
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
        <Text style={styles.headerTitle}>Tambah Pengaduan</Text>
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
              placeholder="Contoh: Lampu jalan tidak menyala"
              value={form.judul}
              onChangeText={(t) => setForm((p) => ({ ...p, judul: t }))}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Lokasi"
              placeholder="Contoh: Depan minimarket, Jl. ..."
              value={form.lokasi}
              onChangeText={(t) => setForm((p) => ({ ...p, lokasi: t }))}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Isi *"
              placeholder="Ceritakan detail masalah..."
              value={form.isi}
              onChangeText={(t) => setForm((p) => ({ ...p, isi: t }))}
              mode="outlined"
              multiline
              numberOfLines={5}
              style={styles.textArea}
            />

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
              loading={loading}
              disabled={loading || !canSubmit}
            >
              Kirim Pengaduan
            </Button>

            <Button
              mode="outlined"
              onPress={() => router.back()}
              style={styles.cancelButton}
              disabled={loading}
            >
              Batal
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    backgroundColor: "#0D47A1",
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
  },
  headerTitle: { fontSize: 26, fontWeight: "bold", color: "#fff" },
  headerSubtitle: { fontSize: 14, color: "#BBDEFB", marginTop: 6 },
  scrollContent: { padding: 15, paddingBottom: 120 },
  card: { borderRadius: 15, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: { marginBottom: 12, backgroundColor: "#fff" },
  textArea: { backgroundColor: "#fff", marginBottom: 12 },
  submitButton: {
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: "#FF6B35",
  },
  cancelButton: { marginTop: 10, borderRadius: 10 },
});
