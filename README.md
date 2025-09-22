# 📊 Excel Analytics Platform (MERN Stack)

![Banner](https://via.placeholder.com/1200x300.png?text=Excel+Analytics+Platform)  
*(👉 Replace this with your custom banner image)*

<p align="center">
  <a href="https://github.com/namanchauhanrajput/excel-analytics-platform/stargazers">
    <img src="https://img.shields.io/github/stars/namanchauhanrajput/excel-analytics-platform?style=for-the-badge&logo=github" alt="GitHub stars"/>
  </a>
  <a href="https://github.com/namanchauhanrajput/excel-analytics-platform/network/members">
    <img src="https://img.shields.io/github/forks/namanchauhanrajput/excel-analytics-platform?style=for-the-badge&logo=github" alt="GitHub forks"/>
  </a>
  <a href="https://github.com/namanchauhanrajput/excel-analytics-platform/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/namanchauhanrajput/excel-analytics-platform?style=for-the-badge" alt="Contributors"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Highcharts-005A9C?style=for-the-badge&logo=highcharts&logoColor=white"/>
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white"/>
</p>

---

A powerful **Excel Analytics Platform** built with the MERN stack (MongoDB, Express, React, Node.js).  
It allows users to **upload Excel files, analyze data, generate charts, view history, and get AI-powered summaries**.  
Includes **JWT authentication, user dashboard, and admin controls**.

---

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - User register & login with JWT
  - Protected routes & role-based access (User/Admin)

- 📂 **File Upload & Parsing**
  - Upload Excel files
  - Parse and extract data using **SheetJS**

- 📊 **Chart Generation**
  - Dynamic charts with **Chart.js** & **Highcharts**
  - Supports: Bar, Line, Pie, Doughnut, 3D Pie, 3D Column, 3D Doughnut
  - Save charts & download

- 🤖 **AI Integration**
  - Generate **AI-powered summaries & insights** from Excel data

- 🕒 **History Management**
  - Save file analysis history
  - Retrieve past uploads & charts
  - Chart type also stored and displayed

- 👤 **User Dashboard**
  - Upload, view history, download reports
  - Mobile responsive design

- 🛠️ **Admin Dashboard**
  - Manage users
  - View all uploads & analytics

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS + Framer Motion
- Chart.js & Highcharts (3D charts)
- Axios (API requests)

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + bcrypt for authentication
- Multer for file uploads
- SheetJS for Excel parsing
- OpenAI API for AI summaries

---

## 📂 Folder Structure

```bash
excel-analytics-platform/
├── client/               # React frontend
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable React components (Navbar, ChartComponent, Dashboard, etc.)
│   │   ├── pages/        # Page components (DashboardUpload, DashboardHistory, Login, Register, etc.)
│   │   ├── context/      # React context for auth, theme, etc.
│   │   ├── utils/        # Helper functions (API calls, data formatting, etc.)
│   │   ├── App.jsx        # Main App component with routing
│   │   └── index.jsx      # Entry point
├── server/               # Express backend
│   ├── controllers/      # Business logic for routes (auth, charts, users)
│   ├── models/           # Mongoose models (User, Chart, File)
│   ├── routes/           # Express routes (authRoutes, chartRoutes, userRoutes)
│   ├── middlewares/      # Middleware (auth, error handling, file upload)
│   ├── config/           # Config files (DB connection, OpenAI, Cloudinary)
│   └── server.js          # Entry point for backend server
├── .env                  # Environment variables
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation