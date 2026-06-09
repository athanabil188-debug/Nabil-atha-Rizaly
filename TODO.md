const fetchCommentsWithFallback = async (reportId: string) => {
const relationColumns = [
"report_id",
"reportId",
"laporan_id",
"pengaduan_id",
];

for (const column of relationColumns) {
try {
const { data, error } = await supabase
.from("comments")
.select("*")
.eq(column, reportId)
.order("created_at", { ascending: true });

```
  if (!error && data) {
    console.log(
      `[COMMENTS] memakai kolom ${column}`,
      data
    );

    return data;
  }

  console.log(
    `[COMMENTS] gagal pakai kolom ${column}`,
    error
  );
} catch (err) {
  console.log(err);
}
```

}

return [];
};

const fetchDetail = async () => {
if (!id) return;

setLoading(true);

try {
const { data: rep, error: repErr } = await supabase
.from("reports")
.select("*")
.eq("id", id)
.single();

```
if (repErr) throw repErr;

setReport(rep);

const commentsData =
  await fetchCommentsWithFallback(id);

setComments(commentsData || []);
```

} catch (e: any) {
Alert.alert(
"Error",
e?.message || "Gagal mengambil data"
);
} finally {
setLoading(false);
}
};

const submitComment = async () => {
if (!id || !commentText.trim()) return;

try {
const { data: authData } =
await supabase.auth.getUser();

```
const userId = authData.user?.id;

if (!userId) {
  Alert.alert(
    "Error",
    "User belum login"
  );
  return;
}

const relationPayloads = [
  {
    report_id: id,
    user_id: userId,
    isi: commentText.trim(),
  },
  {
    reportId: id,
    user_id: userId,
    isi: commentText.trim(),
  },
  {
    laporan_id: id,
    user_id: userId,
    isi: commentText.trim(),
  },
  {
    pengaduan_id: id,
    user_id: userId,
    isi: commentText.trim(),
  },
];

let success = false;

for (const payload of relationPayloads) {
  console.log(
    "[INSERT COMMENT PAYLOAD]",
    payload
  );

  const { data, error } = await supabase
    .from("comments")
    .insert(payload)
    .select();

  if (!error) {
    console.log(
      "[INSERT COMMENT SUCCESS]",
      data
    );

    success = true;
    break;
  }

  console.log(
    "[INSERT COMMENT ERROR]",
    error.message,
    error.details
  );
}

if (!success) {
  Alert.alert(
    "Gagal",
    "Semua percobaan insert komentar gagal"
  );
  return;
}

setCommentText("");

await fetchDetail();
```

} catch (e: any) {
Alert.alert(
"Gagal menambahkan komentar",
e?.message ||
"Terjadi kesalahan saat menyimpan komentar"
);
}
};
