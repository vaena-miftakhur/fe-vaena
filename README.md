# Event Management System – Frontend

Website manajemen event berbasis React TypeScript dengan autentikasi Zustand dan integrasi API ke backend Express.

## 🌐 Demo

- **Frontend (Vercel):** [https://fe-vaena.vercel.app/](https://fe-vaena.vercel.app/)
- **Backend (Railway):** [https://be-v-production.up.railway.app/](https://be-v-production.up.railway.app/)
- **Video Demo (YouTube):** [https://www.youtube.com/watch?v=0-wCwtFgxKI](https://www.youtube.com/watch?v=0-wCwtFgxKI)

## 👤 Identitas

- **Nama:** Vaena Miftakhur Risko
- **NIM:** 24090100
- **Program Studi:** D-4 Teknik Informatika
- **Fakultas:** Sekolah Vokasi

## 🛠️ Teknologi

- React + TypeScript
- Zustand (state management & auth)
- React Hook Form + Zod (validasi form)
- React Router DOM (routing & protected routes)
- Tailwind CSS

## ✨ Fitur

- Login manual menggunakan NIM dan Password
- Protected Routes — halaman dashboard tidak bisa diakses tanpa login
- CRUD Kategori, Pembicara, dan Event
- Dropdown dinamis Kategori dan Pembicara saat tambah/edit Event
- Menu Biodata mahasiswa

## 🚀 Cara Menjalankan Lokal

```bash
# Clone repo
git clone https://github.com/vaena-miftakhur/fe-vaena.git
cd repo-frontend

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

## 📁 Struktur Folder

```
src/
├── components/       # Komponen reusable (FormInput, Button, dll)
├── pages/
│   ├── auth/         # Halaman login
│   └── dashboard/
│       ├── category/ # CRUD Kategori
│       ├── speakers/ # CRUD Pembicara
│       ├── events/   # CRUD Event
│       └── biodata/  # Halaman Biodata
├── store/            # Zustand store (auth state)
└── routes/           # Protected Routes
```
