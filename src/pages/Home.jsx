import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    if (!serviceType || !location) return;
    navigate(`/providers?service_type=${serviceType}&location=${location}`);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center min-h-[80vh] relative overflow-hidden">
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-blue-500 via-blue-300 to-gray-200 bg-[length:400%_400%]"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-white font-extrabold text-5xl md:text-6xl mb-6 drop-shadow-md">
            Find Trusted Service Providers Near You
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Connect instantly with verified mechanics, plumbers, electricians, and more —
            anywhere in Kenya.
          </p>
          
          {/* Auth Buttons */}
          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium border border-white"
            >
              Sign Up
            </button>
          </div>

          {/* Search Form */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-64 md:w-56 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              <option value="">Select Service</option>
              <option value="mechanic">Mechanic</option>
              <option value="plumber">Plumber</option>
              <option value="electrician">Electrician</option>
              <option value="tyre repair">Tyre Repair</option>
              <option value="boda pickup">Boda Pickup</option>
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-64 md:w-56 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              <option value="">Select Location</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Kinoo">Kinoo</option>
              <option value="Thika">Thika</option>
              <option value="Kisumu">Kisumu</option>
              <option value="Mombasa">Mombasa</option>
            </select>

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          How SasaFix Helps You
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Whether your car breaks down or you need quick help at home, SasaFix
          connects you with rated service providers nearby. Browse by category,
          compare ratings, and contact them directly — no middlemen.
        </p>
      </div>

      {/* Gradient Animation */}
      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradientBG 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
