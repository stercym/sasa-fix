import { useState, useEffect } from "react";
import axios from "axios";
import { Bell, PlusCircle } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProviderDashboard() {
  const [skills, setSkills] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", description: "", level: "Beginner" });

  // Load data
  useEffect(() => {
    fetchSkills();
    fetchNotifications();
  }, []);

  const fetchSkills = async () => {
    const { data } = await axios.get(`${API_BASE}/api/skills`);
    setSkills(data);
  };

  const fetchNotifications = async () => {
    const { data } = await axios.get(`${API_BASE}/api/notifications`);
    setNotifications(data);
  };

  const handleAddSkill = async () => {
    await axios.post(`${API_BASE}/api/skills`, newSkill);
    setShowSkillModal(false);
    fetchSkills();
  };

  const handleMarkAsRead = async (id) => {
    await axios.patch(`${API_BASE}/api/notifications/${id}`, { is_read: true });
    fetchNotifications();
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Service Provider Dashboard</h1>

        <button
          onClick={() => setShowNotifModal(true)}
          className="relative bg-white p-3 rounded-full shadow hover:shadow-md"
        >
          <Bell className="w-6 h-6 text-blue-600" />
          {notifications.some(n => !n.is_read) && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {notifications.filter(n => !n.is_read).length}
            </span>
          )}
        </button>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Skills</h2>
          <button
            onClick={() => setShowSkillModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <PlusCircle className="w-4 h-4" /> Add Skill
          </button>
        </div>

        {skills.length === 0 ? (
          <p className="text-gray-500">No skills added yet.</p>
        ) : (
          <ul className="space-y-3">
            {skills.map((s) => (
              <li key={s.id} className="border-b pb-2">
                <strong>{s.name}</strong> — {s.level}
                <p className="text-sm text-gray-600">{s.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Skill Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Skill</h3>
            <input
              type="text"
              placeholder="Skill Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />
            <textarea
              placeholder="Description"
              value={newSkill.description}
              onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            ></textarea>
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
              className="w-full border p-2 rounded mb-4"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSkillModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Notifications</h3>
            {notifications.length === 0 ? (
              <p className="text-gray-500">No notifications yet.</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`border p-3 rounded mb-3 ${!n.is_read ? "bg-blue-50" : ""}`}
                >
                  <p>{n.message}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      From: {n.client_name}
                    </span>
                    {!n.is_read && (
                      <button
                        onClick={() => handleMarkAsRead(n.id)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
            <button
              onClick={() => setShowNotifModal(false)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
