import { useState } from "react";

const UserProfile = ({ user }) => {
  const [profilePic, setProfilePic] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePic(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            {profilePic ? (
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={profilePic}
                alt="Profile"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {getInitials(user.name)}
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg cursor-pointer">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 mb-4">{user.email}</p>

          <div className="w-full space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Member since</span>
              <span className="text-gray-900">
                {new Date(user.created_at || Date.now()).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Posts created</span>
              <span className="text-gray-900">0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Skills offered</span>
              <span className="text-gray-900">0</span>
            </div>
          </div>

          <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm font-medium">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
