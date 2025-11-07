import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === 'provider') {
        setProvider(user);
        // Load mock notifications
        setNotifications([
          { id: 1, message: "New client inquiry for your services", is_read: false, created_at: new Date().toISOString() },
          { id: 2, message: "You received a 5-star rating!", is_read: true, created_at: new Date(Date.now() - 86400000).toISOString() }
        ]);
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

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
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Provider Dashboard</h1>
          <p className="text-gray-600">Welcome back, {provider.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm ${
            provider.rating >= 4 ? 'bg-green-100 text-green-800' : 
            provider.rating >= 3 ? 'bg-yellow-100 text-yellow-800' : 
            'bg-gray-100 text-gray-800'
          }`}>
            {provider.service_type}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                {provider.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold">{provider.name}</h3>
              <p className="text-gray-600">{provider.service_type}</p>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Location:</span> {provider.location}</p>
              <p><span className="font-medium">Phone:</span> {provider.phone}</p>
              <p><span className="font-medium">Rating:</span> ⭐ {provider.rating?.toFixed(1) || "No ratings yet"}</p>
            </div>
          </div>
        </div>

        {/* Stats & Notifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-gray-600">Total Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{provider.rating?.toFixed(1) || "0.0"}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{notifications.filter(n => !n.is_read).length}</div>
                <div className="text-sm text-gray-600">New Notifications</div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-3">
              {notifications.length > 0 ? notifications.map(notification => (
                <div key={notification.id} className={`p-3 rounded-lg border ${
                  notification.is_read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                }`}>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </p>
                </div>
              )) : (
                <p className="text-gray-500 text-sm">No notifications</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center">
            <div className="text-blue-600 mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm font-medium">View Jobs</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center">
            <div className="text-green-600 mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <p className="text-sm font-medium">Reviews</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center">
            <div className="text-purple-600 mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium">Settings</p>
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/login');
            }}
            className="p-4 border border-red-300 rounded-lg hover:bg-red-50 text-center"
          >
            <div className="text-red-600 mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <p className="text-sm font-medium">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
}