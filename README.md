# Aplikasi Todo List Sederhana

Ini adalah aplikasi Todo List sederhana yang dibangun dengan React Native dan Expo. Aplikasi ini menggunakan AsyncStorage untuk menyimpan data todo secara lokal di perangkat pengguna.

## Fitur

- Menambahkan todo baru
- Menandai todo sebagai selesai/belum
- Menghapus todo
- Penyimpanan data lokal menggunakan AsyncStorage
- Antarmuka yang sederhana dan intuitif

## Teknologi yang Digunakan

- React Native
- Expo
- TypeScript
- AsyncStorage

## Cara Menjalankan Aplikasi

1. Pastikan Anda memiliki Node.js terinstal di sistem Anda
2. Instal dependensi dengan perintah:
   ```
   npm install
   ```
3. Jalankan aplikasi dengan salah satu perintah berikut:
   - Untuk Android: `npm run android`
   - Untuk iOS: `npm run ios`
   - Untuk Web: `npm run web`

## Struktur Proyek

- `app/index.tsx` - Komponen utama aplikasi
- `components/TodoItem.tsx` - Komponen untuk menampilkan item todo
- `components/AddTodoForm.tsx` - Form untuk menambahkan todo baru
- `utils/storage.ts` - Fungsi-fungsi bantuan untuk AsyncStorage

## Penyimpanan Data

Aplikasi ini menggunakan AsyncStorage untuk menyimpan data todo secara lokal di perangkat. Data akan tetap tersimpan meskipun aplikasi ditutup dan dibuka kembali.

## Cara Upload ke GitHub

Untuk mengupload proyek ini ke GitHub, silakan ikuti petunjuk dalam file [GITHUB_UPLOAD_GUIDE.md](./GITHUB_UPLOAD_GUIDE.md).