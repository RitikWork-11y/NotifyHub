# 🔗 Notify Hub - Backend (API)

The **Notify Hub Backend** is a RESTful API built with **Laravel**, providing authentication, notification management, and API endpoints consumed by the **Notify Hub Frontend**.  
It is designed for scalability, security, and easy integration with external services.

---

## ✨ Features

- 🔑 **Authentication & Authorization** – User login, registration, OTP & Social login ready  
- 🔔 **Notification API** – Create, fetch, update, and manage notifications  
- 🌍 **Multi-language Support** – Built-in localization support  
- 📡 **RESTful API** – Well-structured endpoints for frontend integration  
- 🛠️ **Modular & Scalable** – Clean architecture with service-based design  
- 📑 **API Documentation** – Swagger/Postman collection available  

---

## 🚀 Tech Stack

- **Framework**: [Laravel 10+](https://laravel.com/)  
- **Database**: MySQL / PostgreSQL  
- **Authentication**: Laravel Sanctum / Passport (JWT-based)  
- **Notifications**: Laravel Notifications & Custom Channels  
- **Caching/Queue**: Redis + Laravel Queues  
- **Testing**: PHPUnit + Pest  

---

## 📂 Project Structure

```bash
notify-hub-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/   # API Controllers
│   │   ├── Middleware/    # Custom middlewares
│   │   └── Requests/      # Validation requests
│   ├── Models/            # Eloquent models
│   └── Services/          # Business logic services
├── config/                # Laravel config files
├── database/
│   ├── migrations/        # DB migrations
│   └── seeders/           # Database seeders
├── routes/
│   ├── api.php            # API routes
│   └── web.php            # Web routes (if any)
├── tests/                 # Unit & Feature tests
├── .env.example           # Example environment variables
└── composer.json
