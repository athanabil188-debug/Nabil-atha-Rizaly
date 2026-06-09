import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { Card, Divider, FAB, Text } from "react-native-paper";

type ReportRow = {
  id: string;
  judul: string;
  isi: string;
  lokasi: string | null;
  status: string | null;
  created_at: string | null;
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

function statusLabel(status: string | null) {
  const st = status ?? "pending";

  if (st === "selesai" || st === "resolved") return "Selesai";
  if (st === "diproses" || st === "processing") return "Diproses";

  return "Menunggu";
}

function truncate(text: string, maxLen: number) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1) + "…";
}

const dummyReports: ReportRow[] = [
  {
    id: "1",
    judul: "Mobil Tidak Sesuai Pesanan",
    isi: "Mobil yang diterima berbeda dengan tipe yang dipesan melalui aplikasi sehingga pelanggan merasa dirugikan.",
    lokasi: "Rental Mobil Sukarame",
    status: "pending",
    created_at: "2026-06-09T08:00:00Z",
  },
  {
    id: "2",
    judul: "Kondisi AC Mobil Rusak",
    isi: "AC mobil tidak berfungsi dengan baik selama masa penyewaan sehingga perjalanan menjadi kurang nyaman.",
    lokasi: "Cabang Bandung",
    status: "diproses",
    created_at: "2026-06-07T10:30:00Z",
  },
  {
    id: "3",
    judul: "Pengembalian Deposit Terlambat",
    isi: "Deposit belum dikembalikan meskipun mobil sudah dikembalikan sesuai jadwal dan kondisi kendaraan baik.",
    lokasi: "Cabang Cimahi",
    status: "selesai",
    created_at: "2026-06-06T15:20:00Z",
  },
  {
    id: "4",
    judul: "Pelayanan Kurang Ramah",
    isi: "Petugas rental kurang responsif saat pelanggan meminta bantuan terkait kendaraan yang disewa.",
    lokasi: "Cabang Lembang",
    status: "selesai",
    created_at: "2026-06-05T09:15:00Z",
  },
  {
    id: "5",
    judul: "Kebersihan Kendaraan Kurang",
    isi: "Mobil yang diterima dalam kondisi kurang bersih pada bagian interior sehingga mengurangi kenyamanan pelanggan.",
    lokasi: "Cabang Garut",
    status: "pending",
    created_at: "2026-06-04T14:45:00Z",
  },
];

export default function ReportsListScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [reports, setReports] = useState<ReportRow[]>([]);

  const fetchReports = useCallback(async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("reports")
        .select("id, judul, isi, lokasi, status, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Supabase Error:", error);
        setReports(dummyReports);
        return;
      }

      if (!data || data.length === 0) {
        setReports(dummyReports);
        return;
      }

      setReports(data as ReportRow[]);
    } catch (err) {
      console.log("Fetch Error:", err);
      setReports(dummyReports);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReports();
    setRefreshing(false);
  };

  const listEmptyText = useMemo(() => {
    if (loading) return "Memuat...";
    return "Belum ada laporan.";
  }, [loading]);

  return (
    <View style={styles.container}>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{listEmptyText}</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => router.push(`/reports/${item.id}` as any)}
          >
            <Card.Content>
              <Text style={styles.title}>{item.judul}</Text>

              <Text style={styles.meta}>
                🗓️ {formatTanggal(item.created_at)}
              </Text>

              {item.lokasi ? (
                <Text style={styles.meta}>📍 {item.lokasi}</Text>
              ) : null}

              <Divider style={styles.divider} />

              <Text style={styles.body}>{truncate(item.isi, 120)}</Text>

              <Text style={styles.status}>
                Status: {statusLabel(item.status)}
              </Text>
            </Card.Content>
          </Card>
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/add" as any)}
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

  listContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 110,
  },

  card: {
    borderRadius: 14,
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },

  meta: {
    fontSize: 12,
    color: "#ffffff",
    marginBottom: 3,
  },

  divider: {
    marginVertical: 10,
  },

  body: {
    fontSize: 13,
    color: "#ffffff",
    lineHeight: 20,
  },

  status: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "#0D47A1",
  },

  empty: {
    padding: 40,
    alignItems: "center",
  },

  emptyText: {
    color: "#ffffff",
    fontSize: 16,
  },

  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: Platform.OS === "ios" ? 10 : 0,
    backgroundColor: "#FF6B35",
  },
});
