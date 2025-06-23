# 📊 User Management App – Angular + Express + MongoDB

This is a fullstack technical test project built with **Angular**, **Express**, and **MongoDB**, designed for evaluation purposes at Athenea Solutions.

---

## ⚙️ Technologies Used

- Frontend: Angular 17 
- Backend: Express + Mongoose
- Database: MongoDB 
- Containerization: Docker & Docker Compose

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/rdalmau23/prova-tecnica.git
cd prova-tecnica
```

---

### 2. Start all services

Make sure you have **Docker and Docker Compose** installed, then run:

```bash
docker-compose up --build
```

This will:

- Serve the **Angular app** at: http://localhost:4200  
- Start the **Express API** at: http://localhost:3000  
- Start the **MongoDB database** on port `27017` internally

---

### 3. Seed the database with sample users

The project includes a `users.json` file and a script to import the data into MongoDB:

```bash
docker-compose exec backend node import-users.js
```

This script will:
- Connect to the `usersdb` database
- Delete existing users
- Import users from `users.json`

---

## 📂 Project Structure

```
.
├── frontend/              # Angular App
│   ├── src/
│   ├── Dockerfile
│   └── ...
├── backend/               # Express API
│   ├── import-users.js    # Seeder script
│   ├── users.json         # User data
│   |── index.js           # All the logic
|   └── ...
├── docker-compose.yml
└── README.md
```

---

## 📋 Features Implemented

- ✅ Users table
- ✅ View user profile
- ✅ Add new user with form
- ✅ Data persistence with MongoDB
- ✅ JSON-to-DB migration script
- ✅ Dockerized frontend and backend
- ✅ Export users to Excel / PDF
- ✅ User search and filtering
- ✅ Sorting and pagination

---

## 🧰 To Do / Possible Extras

- Scheduled JSON export every night
- Hybrid version with Ionic

---

## 👤 Author

Rafel Dalmau – [LinkedIn](https://www.linkedin.com/in/rafeldalmauchaco/)  
Project developed as part of a technical test for Athenea Solutions.
