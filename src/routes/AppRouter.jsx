// src/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import ProviderDashboard from "../pages/Serviceprovider/ProviderDash";
import About from "../pages/About";
function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/pages/Serviceprovider/dashboard" element={<ProviderDashboard />}/>
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
