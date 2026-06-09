import { supabase } from "@/lib/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  Card,
  Divider,
  FAB,
  Text,
  TextInput,
} from "react-native-paper";

type CommentRow = {
  id: string;
  report_id: string;
  isi: string;
  created_at: string | null;
  user_id: string;
};

type ReportRow = {
  id: string;
  judul: string;
  isi: string;
  lokasi: string | null;
  status: string | null;
  created_at: string | null;
  user_id: string;
};

function formatTanggal(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function CarDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [report, setReport] = useState<ReportRow | null>(null);
  const [comments, setComments] = useState<CommentRow[]>([]);

  const [commentText, setCommentText] = useState("");
  const canSend = useMemo(() => commentText.trim().length > 0, [commentText]);

  const fetchDetail = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const { data: rep, error: repErr } = await supabase
        .from("reports")
        .select("id, judul, isi, lokasi, status, created_at, user_id")
        .eq("id", id)
        .single();

      if (repErr) throw repErr;
      setReport(rep as ReportRow);

      const { data: cData, error: cErr } = await supabase
        .from("comments")
        .select("id, report_id, isi, created_at, user_id")
        .eq("report_id", id)
        .order("created_at", { ascending: true });

      if (cErr) throw cErr;
      setComments((cData ?? []) as CommentRow[]);
    } catch (e: any) {
      Alert.alert(
        "Gagal memuat detail laporan",
        e?.message || "Terjadi kesalahan saat mengambil data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDetail();
    setRefreshing(false);
  };

  const submitComment = async () => {
    if (!id || !canSend) return;

    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      if (!userId) {
        Alert.alert("Error", "Sesi login tidak ditemukan. Silakan login lagi.");
        return;
      }

      const payload = {
        report_id: id,
        user_id: userId,
        isi: commentText.trim(),
      };

      const { data: insertData, error: insertErr } = await supabase
        .from("comments")
        .insert(payload)
        .select();

      if (insertErr) {
        Alert.alert(
          "Gagal insert komentar",
          insertErr.message || "Terjadi kesalahan saat menyimpan komentar",
        );
        return;
      }

      if (__DEV__) {
        console.log("insert comment data:", insertData);
      }

      setCommentText("");
      await fetchDetail();
    } catch (e: any) {
      Alert.alert(
        "Gagal menambahkan komentar",
        e?.message || "Terjadi kesalahan saat menyimpan komentar",
      );
    }
  };

  const statusLabel = (status: string | null) => {
    const st = status ?? "pending";
    if (st === "selesai" || st === "resolved") return "Selesai";
    if (st === "diproses" || st === "processing") return "Diproses";
    return "Menunggu";
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, { paddingTop: Platform.OS === "ios" ? 60 : 20 }]}
      >
        <Button
          mode="text"
          icon="arrow-left"
          onPress={() => router.back()}
          textColor="#fff"
        >
          Kembali
        </Button>
        <Text style={styles.headerTitle}>Detail Pengaduan</Text>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View style={styles.content}>
            {report ? (
              <>
                <Card style={styles.reportCard}>
                  <Card.Content>
                    <Text style={styles.reportTitle}>{report.judul}</Text>
                    <Text style={styles.reportMeta}>
                      🗓️ {formatTanggal(report.created_at)}
                    </Text>
                    {report.lokasi ? (
                      <Text style={styles.reportMeta}>📍 {report.lokasi}</Text>
                    ) : null}
                    <Divider style={styles.divider} />
                    <Text style={styles.reportBody}>{report.isi}</Text>
                    <Divider style={styles.divider} />
                    <Text style={styles.statusText}>
                      Status: {statusLabel(report.status)}
                    </Text>
                  </Card.Content>
                </Card>

                <Text style={styles.commentsTitle}>
                  Komentar ({comments.length})
                </Text>
                {loading ? (
                  <Text style={{ color: "#666" }}>Memuat...</Text>
                ) : null}
              </>
            ) : (
              <Text style={{ color: "#666" }}>Memuat detail...</Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.commentRow}>
            <View style={styles.commentBubble}>
              <Text style={styles.commentText}>{item.isi}</Text>
              <Text style={styles.commentDate}>
                🕒 {formatTanggal(item.created_at)}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyComments}>
            <Text style={styles.emptyTitle}>Belum ada komentar</Text>
            <Text style={styles.emptySubtitle}>
              Tambahkan komentar untuk membantu.
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 160 }}
      />

      <View style={[styles.commentInputWrap, { paddingBottom: 0 }]}>
        <TextInput
          label="Tambah komentar"
          value={commentText}
          onChangeText={setCommentText}
          mode="outlined"
          style={styles.commentInput}
          multiline
          numberOfLines={3}
        />
        <Button
          mode="contained"
          onPress={submitComment}
          style={styles.sendButton}
          disabled={!canSend}
        >
          Kirim
        </Button>
      </View>

      <FAB
        icon="refresh"
        style={styles.fab}
        onPress={fetchDetail}
        color="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    backgroundColor: "#0D47A1",
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  content: { padding: 15 },
  reportCard: { borderRadius: 15 },
  reportTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  reportMeta: { fontSize: 12, color: "#666", marginBottom: 4 },
  reportBody: { fontSize: 15, color: "#444", lineHeight: 22 },
  divider: { marginVertical: 12 },
  statusText: { fontSize: 14, color: "#0D47A1", fontWeight: "600" },
  commentsTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  commentRow: { paddingHorizontal: 15, paddingTop: 10 },
  commentBubble: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 1,
  },
  commentText: { fontSize: 14, color: "#333", marginBottom: 6 },
  commentDate: { fontSize: 12, color: "#999" },
  emptyComments: { padding: 30, alignItems: "center" },
  emptyTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  commentInputWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  commentInput: { marginBottom: 8, backgroundColor: "#fff" },
  sendButton: { backgroundColor: "#FF6B35", borderRadius: 10 },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    top: 110,
    backgroundColor: "#0D47A1",
  },
});
