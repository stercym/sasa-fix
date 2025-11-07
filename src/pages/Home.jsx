// src/pages/Home.jsx (or Home.tsx if you're using TypeScript)
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";



// ✅ Correct export syntax
export default function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ---- UI state -------------------------------------------------
  const [serviceType, setServiceType] = useState(searchParams.get("service_type") ?? "");
  const [location, setLocation] = useState(searchParams.get("location") ?? "");

  // ---- Data state -----------------------------------------------
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---- Fetch providers -------------------------------------------
  const fetchProviders = async (svc, loc) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (svc) params.append("service_type", svc);
      if (loc) params.append("location", loc);

      const url = `${API_BASE}/providers${params.toString() ? `?${params}` : ""}`;
      const { data } = await axios.get(url);
      setProviders(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---- On mount & when URL params change -------------------------
  useEffect(() => {
    const svc = searchParams.get("service_type") ?? "";
    const loc = searchParams.get("location") ?? "";
    setServiceType(svc);
    setLocation(loc);
    fetchProviders(svc || undefined, loc || undefined);
  }, [searchParams]);

  // ---- Search handler --------------------------------------------
  const handleSearch = () => {
    if (!serviceType && !location) {
      fetchProviders(); // show all
      navigate("/"); // clear query string
      return;
    }
    const query = new URLSearchParams();
    if (serviceType) query.set("service_type", serviceType);
    if (location) query.set("location", location);
    navigate(`/providers?${query.toString()}`);
  };

  // ---- Render ----------------------------------------------------
  return (
    <div className="min-h-screen w-full">
      {/* ==== HERO ==== */}
      <div className="flex flex-col items-center justify-center text-center min-h-[70vh] relative overflow-hidden">
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-blue-500 via-blue-300 to-gray-200 bg-[length:400%_400%]"></div>

        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-white font-extrabold text-4xl md:text-6xl mb-6 drop-shadow-md">
            Find Trusted Service Providers Near You
          </h1>
          <p className="text-white text-lg md:text-xl mb-8">
            Connect instantly with verified mechanics, plumbers, electricians, and more — anywhere in Kenya.
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
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full md:w-56 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              <option value="">All Services</option>
              <option value="mechanic">Mechanic</option>
              <option value="plumber">Plumber</option>
              <option value="electrician">Electrician</option>
              <option value="tyre repair">Tyre Repair</option>
              <option value="boda pickup">Boda Pickup</option>
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full md:w-56 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              <option value="">All Locations</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Kinoo">Kinoo</option>
              <option value="Thika">Thika</option>
              <option value="Kisumu">Kisumu</option>
              <option value="Mombasa">Mombasa</option>
              <option value="Other">Other</option>
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

      {/* ==== RESULTS ==== */}
      <div className="py-12 px-4 max-w-6xl mx-auto">
        {loading && <p className="text-center text-gray-600">Loading providers…</p>}
        {error && <p className="text-center text-red-600">Error: {error}</p>}
        {!loading && !error && providers.length === 0 && (
          <p className="text-center text-gray-600">
            No providers match your criteria. Try adjusting the filters.
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{p.name}</h3>

              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(p.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.953c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.953a1 1 0 00-.364-1.118L2.335 9.38c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.95-.69l1.286-3.953z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {p.rating} ({p.reviews.length} review{p.reviews.length !== 1 ? "s" : ""})
                </span>
              </div>

              <p className="text-gray-700">
                <strong>Service:</strong> {p.service_type}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {p.location}
              </p>

              <div className="mt-4 flex gap-3">
                <a href={`tel:${p.phone}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                  📞 {p.phone}
                </a>

                <a href={`mailto:${p.email}`} className="flex items-center gap-1 text-green-600 hover:underline">
                  ✉️ Email
                </a>
              </div>

              {p.reviews?.length > 0 && (
                <details className="mt-3 text-sm text-gray-600">
                  <summary className="cursor-pointer font-medium">
                    View {p.reviews.length} review{p.reviews.length !== 1 ? "s" : ""}
                  </summary>
                  <ul className="mt-2 space-y-2">
                    {p.reviews.map((r) => (
                      <li key={r.id} className="border-l-4 border-gray-300 pl-3">
                        <strong>{r.user}:</strong> {r.score}★ – {r.comment}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ==== INFO SECTION ==== */}
      <div className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">How SasaFix Helps You</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Whether your car breaks down or you need quick help at home, SasaFix connects you with rated service providers nearby. Browse by category, compare ratings, and contact them directly — no middlemen.
        </p>
      </div>

      {/* ==== Gradient Animation ==== */}
      <style jsx>{`
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
