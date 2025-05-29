# 📚 AI-Powered Book Management & Subscription System

This project is a full-stack application to manage books, subscriptions, and user interactions powered by AI-based smart book Search.

---

## 📦 Project Structure


root/
├── backend/ # Node.js + Express API
└── frontend/ # React js



---

## 🧰 Tech Stack

- **Frontend**: React, Axios, Material UI
- **Backend**: Node.js, Express, MongoDB
- **API Docs**: Swagger (OpenAPI)
- **Authentication**: JWT
- **AI Module**: Langchain

---

## 🚀 Getting Started

### ⚙️ Backend Setup (`/backend`)

1. Clone the repo:
   ```bash
   git clone https://github.com/kajol-shrivastava/AI-Powered-Book-Management-and-subscription-system.git

cd AI-Powered-Book-Management-and-subscription-system/backend

2. Install dependencies:

    ```bash 
    npm install

3. Create .env file in the /backend folder with the following:

    ```bash
    PORT=4000
    SECRET_KEY=your_secret_key
    MONGODB_URL=mongodb://0.0.0.0:27017/books
    GOOGLE_API_KEY=your_google_gemini_api_key



4. Run the backend server with command :

   ```bash
   npm start


API is now running on http://localhost:4000

📌 Swagger API Documentation
Once backend is running, view full API documentation at:
Swagger Documentation available at: http://localhost:4000/docs


### 🎨 Frontend Setup (`/frontend`)

Go to frontend directory: cd ../frontend


2. Install dependencies Run cmd:

    ```bash
    npm install

3. Create .env file in the /frontend folder with the following:

    ```bash
    REACT_APP_API_BASE_URL = http://localhost:4000 


4. Run the server with command :  

    ```bash 
    npm start


Frontend is now running on http://localhost:4002




