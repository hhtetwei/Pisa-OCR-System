# 🧾 OCR Scan Job Management System

This project is a web-based system to manage scan jobs using OCR (Optical Character Recognition). Users can upload documents, associate them with templates, extract answers from regions, and auto-grade results. Built with **React**, **Mantine**, **Tailwind CSS**, and **i18next** for multi-language support.

---

## 📦 Features

- 🗂 Template creation with multiple region types (QR Code, Multiple Choice, Math)
- 📤 Scan job upload and document processing
- 🔎 OCR result display with auto-grading
- 🌐 Language support (English & Thai)

---

## 🛠 Tech Stack

- Frontend: [React](https://reactjs.org/), [Mantine UI](https://mantine.dev/), [Tailwind CSS](https://tailwindcss.com/)
- Internationalization: [i18next](https://react.i18next.com/)
- State Management: React Hooks
- Backend API: (Node.js/Express.js)
- OCR & Grading logic: Tesseract and OCR pipeline

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ocr-scan-job-manager.git
cd ocr-scan-job-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file (optional)

Configure your API endpoints or environment variables.

### 4. Run the development server

```bash
npm run dev
```

App will be available at `http://localhost:3000`

---

## 🌍 Language Support

This project supports:
- English (`en`)
- ไทย (Thai) (`th`)

Switching is handled via `i18next`.

## 📄 JSON Translations

Stored in `src/locales/en.json` and `src/locales/th.json`. Wrapped with `t('your_key')` using `useTranslation()` hook from `react-i18next`.

---

## 🧑‍💻 Contributors

- Grace — [@hhtetweii](https://github.com/hhtetwei)
