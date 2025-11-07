// src/pages/ProviderDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  // For MVP, simulate a logged-in provider
  const providerId = 1; // This will later come from JWT or context

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/providers/${providerId}`);
        const data = await res.json();
        setProvider(data);
      } catch (error) {
        console.error("Failed to load provider:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProvider();
  }, [providerId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">Provider not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {provider.name}</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </header>

      {/* Profile Overview */}
      <section className="bg-white shadow rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Profile</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p><span className="font-semibold text-gray-600">Name:</span> {provider.name}</p>
            <p><span className="font-semibold text-gray-600">Service Type:</span> {provider.service_type}</p>
            <p><span className="font-semibold text-gray-600">Location:</span> {provider.location}</p>
          </div>
          <div>
            <p><span className="font-semibold text-gray-600">Phone:</span> {provider.phone}</p>
            <p><span className="font-semibold text-gray-600">Rating:</span> ⭐ {provider.rating?.toFixed(1) || "No ratings yet"}</p>
          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Reviews</h2>
        {provider.reviews && provider.reviews.length > 0 ? (
          <div className="space-y-4">
            {provider.reviews.map((review, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <p className="text-gray-800 font-medium">⭐ {review.rating}/5</p>
                <p className="text-gray-600 italic">"{review.comment}"</p>
                <p className="text-sm text-gray-400 mt-1">— {review.user_name || "Anonymous"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">You haven’t received any reviews yet.</p>
        )}
      </section>

      {/* Edit Button (future feature) */}
      <div className="text-center mt-12">
        <button
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          disabled
        >
          ✏️ Edit Profile (Coming Soon)
        </button>
      </div>
    </div>
  );
}
