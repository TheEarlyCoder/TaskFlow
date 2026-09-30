import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white font-outfit">
    <Navbar />
    <main className="flex-1 flex items-center justify-center">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute >
          <Dashboard />
        </ProtectedRoute>
        } 
      />
    </Routes>
    </main>

    </div>

  );
}

export default App;
