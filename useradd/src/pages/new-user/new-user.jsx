import React, { useState } from "react";
import axios from "axios";
import '../Styles/new-user.css';
import { Link } from 'react-router-dom';

const NewUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://aliakbar-fake-api.netlify.app/.netlify/functions/server/create-user",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response);
      console.log("Data:", response.data);

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("The user has been successfully added");
        setUserData({ name: "", email: "", phone: "" });
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error:", error); 
      setErrorMessage("An error occurred while adding the user.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="new-user-container">
      <div className="backpage">
        <Link to="/" className="back">
          <div></div>
          <h4>Users</h4>
          <span>Back to home</span>
        </Link>
      </div>
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit} className="new-user-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Add User</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default NewUser;
