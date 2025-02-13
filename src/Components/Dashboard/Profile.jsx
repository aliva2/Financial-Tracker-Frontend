import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa"; // Import profile icon
import "./Profile.css";
import axios from "../../api/axios";

const Profile = ({ handleSectionClick, handleLogout }) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState({});
  const profileRef = useRef(null);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen); // Toggle profile menu
  };

  const authAxios = axios.create({
    baseURL: axios.baseURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  // Close the profile menu if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false); // Close the menu if click is outside
      }
    };

    // Add event listener when component mounts
    document.addEventListener("click", handleClickOutside);

    const fetchUser = async () => {
      try {
        const response = await authAxios.get("/user/profile");
        setUser(response.data); // Assume the API returns an array of categories
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };

    fetchUser();

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-section" ref={profileRef}>
      <div className="profile-info" onClick={toggleProfileMenu}>
        <FaUserCircle className="profile-icon" /> {/* Profile icon */}
        <span className="profile-name">
          {user.name} {user.surname}
        </span>{" "}
        {/* Display user name */}
      </div>

      {/* Profile Dropdown */}
      {isProfileMenuOpen && (
        <div className="profile-dropdown">
          <ul>
            <li>
              <a href="#view-profile" onClick={() => handleSectionClick("settings")}>
                View Profile
              </a>
            </li>
            <li>
              <a href="#logout" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
