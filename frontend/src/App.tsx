// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar'; // Import Navbar
import AdminDashboard from './pages/AdminDashboard';


function App() {
  return (
    <div>
      <Navbar /> {/* Add Navbar here */}
      <div style={{ padding: '0 2rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminDashboard />} /> 
        </Routes>
      </div>
    </div>
  )
}

export default App;