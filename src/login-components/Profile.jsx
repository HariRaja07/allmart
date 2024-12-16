import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
const backendUrl = "https://all-mart-e-com-server.onrender.com";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    email:"",
  });
  const [isEditing, setIsEditing] = useState({
    name: false,
    phoneNumber: false,
    address: false,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${backendUrl}/api/v1/users/details`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUserDetails(data);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSaveDetails = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${backendUrl}/api/v1/users/save-details`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(userDetails),
      }
    );

    const data = await response.json();
    if (response.ok) {
      alert("Details saved successfully");
    } else {
      alert(data.message || "Error saving details");
    }
  };

  const handleDeleteAccount = () => {
    navigate("/user/delete-account");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-blue-100 mt-40 rounded-xl flex justify-center p-8">
      <div className="max-w-3xl w-full h-fit bg-blue-50 shadow-lg rounded-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-700">Profile</h2>
          <p className="text-gray-500">Manage your account details below.</p>
        </div>

        {/* User details section */}
        <div className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Name
            </label>
            {isEditing.name ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={userDetails.name}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, name: e.target.value })
                  }
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setIsEditing({ ...isEditing, name: false })}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{userDetails.name || "N/A"}</span>
                <button
                  onClick={() => setIsEditing({ ...isEditing, name: true })}
                  className="text-blue-500 hover:underline"
                >
                  <TbEdit className="h-6 w-6"/>
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
              <div className="flex items-center space-x-2">
                <p className="text-gray-700">{userDetails.email}</p>
              </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Phone Number
            </label>
            {isEditing.phoneNumber ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={userDetails.phoneNumber}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() =>
                    setIsEditing({ ...isEditing, phoneNumber: false })
                  }
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{userDetails.phoneNumber || "N/A"}</span>
                <button
                  onClick={() =>
                    setIsEditing({ ...isEditing, phoneNumber: true })
                  }
                  className="text-blue-500 hover:underline"
                >
                  <TbEdit className="h-6 w-6"/>
                </button>
              </div>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Address
            </label>
            {isEditing.address ? (
              <div className="flex items-center space-x-2">
                <textarea
                  value={userDetails.address}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, address: e.target.value })
                  }
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
                <button
                  onClick={() => setIsEditing({ ...isEditing, address: false })}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{userDetails.address || "N/A"}</span>
                <button
                  onClick={() => setIsEditing({ ...isEditing, address: true })}
                  className="text-blue-500 hover:underline"
                >
                  <TbEdit className="h-6 w-6"/>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleSaveDetails}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Save All Changes
          </button>
          {/*<button
            onClick={handleDeleteAccount}
            className="w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
          >
            Delete Account
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
          >
            Logout
          </button>*/}
        </div>
      </div>
    </div>
  );
};

export default Profile;
