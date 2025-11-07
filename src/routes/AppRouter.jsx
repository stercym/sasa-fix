import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import ProviderDashboard from "../pages/Serviceprovider/ProviderDash";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import CreateAcc from "../components/CreateAcc/createAcc";
import About from "../pages/About";

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateAcc />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pages/Serviceprovider/dashboard" element={<ProviderDashboard />}/>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateAcc />}/>
      </Routes>
    </Router>
  );
}

export default AppRouter;
