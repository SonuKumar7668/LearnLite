import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Home from "./pages/Home";
import Features from "./pages/Features";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmartQuiz from "./pages/SmartQuiz";
import ChatLearn from "./pages/ChatLearn";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import { AuthProvider } from "./context/AuthContext";
export const BACKEND_URL = "http://localhost:3000/api";

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/features" element={
          <ProtectedRoute>
            <Features />
          </ProtectedRoute>
         } />
        <Route path="/quiz" element={
          <ProtectedRoute>
             <SmartQuiz />
          </ProtectedRoute>
        } />
        <Route path="/chat" element={<ProtectedRoute><ChatLearn /></ProtectedRoute>} />
        <Route path="/notes" element={
        <ProtectedRoute>
          <Notes />
        </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
