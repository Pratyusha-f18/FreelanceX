📌 FreelanceX – Freelance Marketplace Platform

FreelanceX is a full-stack web application that connects **customers** with **freelancers**. Users can explore services, book them, and freelancers can add and manage their offerings.

## 🚀 Live Demo

👉 [https://freelance-x-rose.vercel.app](https://freelance-x-rose.vercel.app)

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* CSS (inline styling)

### Backend

* Spring Boot
* REST APIs
* Maven

### Database

* MySQL / H2 (depending on your setup)

### Deployment

* Frontend: Vercel
* Backend: Render


## ✨ Features

### 👤 Authentication

* User Registration (Customer / Freelancer)
* Login & Logout

### 🧑‍💻 Freelancer Features

* Add new services
* View services
* Manage offerings

### 🛍️ Customer Features

* Browse services
* Search services
* Book services

### 📦 Services

* Display service cards
* Ratings & pricing
* Reviews (basic)


## 📂 Project Structure

```
frontend/
 ├── src/
 │   ├── pages/
 │   ├── components/
 │   └── config.js

backend/
 ├── controller/
 ├── model/
 ├── repository/
 └── services/
```



## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd project-folder
```


### 2️⃣ Backend Setup (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```


### 3️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```


### 4️⃣ Configure API URL

In `frontend/src/config.js`:

```js
const BASE_URL = "https://your-render-backend-url.onrender.com";
export default BASE_URL;
```


## 📌 API Endpoints

### Auth

* `POST /auth/register`
* `POST /auth/login`

### Services

* `GET /services`
* `POST /services`
* `DELETE /services/{id}`

### Booking

* `POST /book`
* `GET /book/service/{name}`


## ⚠️ Known Issues

* Basic authentication (no JWT)
* Minimal validation
* UI can be further improved


## 📈 Future Improvements

* Add JWT Authentication 🔐
* Freelancer Dashboard 📊
* Payment Integration 💳
* Better UI/UX 🎨


## 👩‍💻 Author

* Pratyusha



## ⭐ Conclusion

FreelanceX demonstrates a complete **full-stack workflow** including frontend, backend, API integration, and deployment.
