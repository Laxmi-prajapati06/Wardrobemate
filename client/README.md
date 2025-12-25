Outfit Recommender (WardrobeMate)
A full-stack personalized fashion assistant that recommends outfits based on your unique Body Type and Skin Tone. It uses computer vision to analyze user photos and provides curated style suggestions for various occasions (Casual, Business, Formal, Party, etc.).

🚀 Features
User Authentication: Secure Login and Registration system.

Body Type Analysis: Calculates body shape (Hourglass, Pear, Rectangle, etc.) based on user measurements.

Skin Tone Analysis: Machine Learning (Python/OpenCV) service that detects face region and classifies skin tone (Cool, Warm, Neutral).

Smart Recommendations: Filters outfit database to match user's physical attributes and selected occasion.

Profile Management: Users can view their analysis results and manage saved favorite outfits.

Responsive UI: Modern "Glassmorphism" design built with React.

🏗 Architecture
The application is split into three main components:

Client (/client): React frontend for user interaction.

Server (/server): Node.js/Express backend that handles API requests, auth, and database interactions.

ML Model (/ml-model): Python Flask microservice dedicated to image processing and skin tone classification.

🛠 Prerequisites
Ensure you have the following installed:

Node.js (v14+ recommended)

Python (v3.8+)

PostgreSQL

📦 Installation & Setup
1. Database Setup
Open your PostgreSQL tool (e.g., pgAdmin or psql).

Create a database named wardrobemate (or update config/database.js with your DB name).

Run the provided SQL scripts (in your project documentation) to create the users, body_measurements, skin_tones, outfits, and user_outfits tables.

2. Backend (Node.js)

cd server
npm install
Create a .env file in the server directory:

Code snippet

PORT=5000
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wardrobemate
JWT_SECRET=your_jwt_secret_key
ML_SERVICE_URL=http://localhost:5001
3. Machine Learning Service (Python)

cd ml-model
# Create virtual environment (optional but recommended)
python -m venv venv
# Activate it:
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
Create a .env file in the ml-model directory (optional, mainly for configuration):

Code snippet

PORT=5001
4. Frontend (React)

cd client
npm install
🏃‍♂️ Running the Application
You need to run all three services simultaneously. It is recommended to use three separate terminal windows.

Terminal 1: ML Service

cd ml-model
python app.py
# Runs on http://localhost:5001
Terminal 2: Backend Server

cd server
npm start
# Runs on http://localhost:5000
Terminal 3: Frontend Client

cd client
npm start
# Runs on http://localhost:3000
📂 Project Structure

outfit-recommender/
├── client/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── context/        # React Context (Auth)
│       ├── pages/          # Full page components
│       └── services/       # API call functions
├── server/                 # Node.js Backend
│   ├── config/             # DB configuration
│   ├── controllers/        # Route logic
│   ├── middleware/         # Auth & Upload middleware
│   ├── models/             # Database queries
│   └── routes/             # API Endpoints
└── ml-model/               # Python Microservice
    ├── app.py              # Flask app entry point
    └── requirements.txt    # Python dependencies
🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request for any features or bug fixes.

🌟 Next Step: Verify GitHub Push
Since you mentioned you are creating a new repo, don't forget to push this README.md along with your code!

git add README.md
git commit -m "Add project documentation"
git push origin main