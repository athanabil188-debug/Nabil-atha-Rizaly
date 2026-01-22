# Panduan Upload ke GitHub

Ikuti langkah-langkah berikut untuk mengupload proyek ini ke GitHub:

## 1. Buat Repositori Baru di GitHub

- Kunjungi https://github.com
- Login ke akun Anda
- Klik tombol "New" atau "+ New repository"
- Beri nama repositori "simple-todo-list-app" atau nama pilihan Anda
- Pilih "Public" atau "Private" sesuai keinginan
- Jangan centang "Initialize this repository with a README" karena kita sudah memiliki README
- Klik "Create repository"

## 2. Salin URL Repositori

- Setelah repositori dibuat, salin URL SSH atau HTTPS dari repositori tersebut
- Contoh: `https://github.com/nama-user/simple-todo-list-app.git`

## 3. Hubungkan Lokal ke GitHub

Jalankan perintah berikut di terminal (ganti `<URL_REPOSITORI>` dengan URL yang telah disalin):

```bash
git remote add origin <URL_REPOSITORI>
```

## 4. Ganti Nama Branch

Ubah nama branch dari `master` ke `main`:

```bash
git branch -M main
```

## 5. Upload Kode ke GitHub

Push kode ke GitHub:

```bash
git push -u origin main
```

## 6. Selesai!

Kode Anda sekarang telah diupload ke GitHub dan dapat diakses oleh orang lain.