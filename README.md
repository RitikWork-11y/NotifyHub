# 📢 Notify Hub – Full Stack Project

Notify Hub is a **real-time notification management system** with a **Laravel backend (API)** and a **React + Vite frontend**.  
It enables users to authenticate, send, and receive notifications in real-time with a modern UI and scalable backend.

---

## ✨ Key Features

- 🔑 **Authentication & Authorization** – Login, registration, OTP, and social login support  
- 🔔 **Notification System** – Create, manage, and deliver notifications in real time  
- 📡 **RESTful API** – Clean, well-documented API for integration  
- 🎨 **Modern UI/UX** – Built with TailwindCSS + ShadCN UI  
- 📱 **Responsive Design** – Optimized for desktop, tablet, and mobile  
- 🌍 **Multilingual Support** – Powered by Laravel Localization  
- ⚡ **High Performance** – Vite bundler + Laravel queues and caching  
- 🛠️ **Developer Friendly** – Clean architecture, modular code, and linting  

---

## 🛠️ Tech Stack

**Frontend**
- ⚛️ React 18 + Vite  
- 🎨 TailwindCSS + ShadCN UI + Lucide Icons  
- 📡 Axios for API requests  

**Backend**
- 🖥️ Laravel 10+  
- 🛢️ MySQL / PostgreSQL  
- 🔐 Laravel Sanctum / Passport (API auth)  
- ⚡ Redis + Queues for async jobs  
- 🧪 PHPUnit + Pest for testing  

**DevOps**
- 🐳 Docker (Optional)  
- 🔧 Nginx / Apache for production  
- 🌐 Postman / Swagger for API docs  

---

## 📂 Project Structure

```bash
notify-hub/
│── backend/                  # Laravel API backend
│   ├── app/                  # Controllers, Models, Services
│   ├── routes/               # API routes
│   ├── database/             # Migrations & seeders
│   └── tests/                # Unit & Feature tests
│
│── frontend/                 # React + Vite frontend
│   ├── src/                  # Components, Pages, Hooks, Services
│   ├── public/               # Static assets
│   └── vite.config.js        # Vite config
│
│── docs/                     # Documentation (screenshots, API docs, etc.)
│── docker-compose.yml        # Docker setup
│── README.md                 # This file
