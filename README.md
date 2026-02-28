# Tena Flow - Healthcare Management App 🏥

A comprehensive full-stack healthcare management application for booking appointments, managing medical records, finding doctors and hospitals, and connecting with healthcare providers.

![Tena Flow](https://img.shields.io/badge/Version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-14.x-339933)
![Electron](https://img.shields.io/badge/Electron-Latest-47848F)

## ✨ Features

- **🔐 User Authentication** - Secure login and registration system
- **📅 Appointment Booking** - Book appointments with doctors easily
- **👨‍⚕️ Doctor Directory** - Browse and search for doctors by specialty
- **🏥 Hospital Directory** - Find hospitals and healthcare facilities
- **💳 Finance Management** - Track payments and financial records
- **🤖 AI Chat Assistant** - Get health-related assistance powered by AI
- **🎮 Health Games** - Interactive nutrition and age-checking games
- **📱 Admin Dashboard** - Comprehensive admin panel for managing the platform
- **📲 Mobile Ready** - Works on Android devices via Capacitor
- **💻 Desktop App** - Windows executable available

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Capacitor** - Mobile deployment
- **Electron** - Desktop deployment

### Backend
- **Node.js** - Runtime
- **Express** - Web framework

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Babycmd/TENA.git
   cd tena-flow
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

#### Development Mode

**Start the backend server:**
```bash
cd server
npm start
```

**Start the frontend (in a new terminal):**
```bash
cd client
npm run dev
```

The app will be available at `http://localhost:5173`

#### Desktop Application (Windows)

A pre-built Windows executable is available:
```
client/release/win-unpacked/Tena Flow.exe
```

#### Build Desktop App

```bash
cd client
npm run electron:build
```

#### Build Mobile App (Android)

```bash
cd client
npm run android
```

## 📁 Project Structure

```
tena 3/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── electron/          # Electron configuration
│   ├── android/           # Android mobile app
│   └── release/           # Built executables
├── server/                # Node.js backend
│   └── (server files)
└── README.md              # This file
```

## 📱 Screenshots

| Login | Dashboard | Booking |
|-------|-----------|---------|
| ![Login](link) | ![Dashboard](link) | ![Booking](link) |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tenaflow
JWT_SECRET=your-secret-key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [GitHub](https://github.com/yourusername)

---

<p align="center">Made with ❤️ for healthcare</p>
