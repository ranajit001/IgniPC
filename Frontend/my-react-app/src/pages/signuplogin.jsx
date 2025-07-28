import React, { useState } from "react";
import { baseApi } from "../utils/baseApi";
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext'



const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const {setAuth} = useAuth();

  const navigate = useNavigate();


  const toggleMode = () => {
    setIsSignup((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =baseApi+ (isSignup ? "/user/register" : "/user/login");
    console.log(url);
    

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  

      const data = await res.json();
      if(res.ok){
        setAuth(data)
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Signup" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {isSignup && (
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <button type="submit">{isSignup ? "Signup" : "Login"}</button>
        <p onClick={toggleMode} className="toggle-text">
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Signup"}
        </p>
      </form>

      <style>{`
        .auth-container {
          max-width: 400px;
          margin: 4rem auto;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          background: #fff;
          font-family: Arial, sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .form-group {
          margin-bottom: 1.2rem;
        }

        label {
          display: block;
          margin-bottom: 0.4rem;
          color: #555;
        }

        input, select {
          width: 100%;
          padding: 0.6rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }

        button {
          width: 100%;
          padding: 0.8rem;
          background-color: #f39c12;
          border: none;
          border-radius: 4px;
          color: white;
          font-size: 1rem;
          cursor: pointer;
        }

        button:hover {
          background-color: #e67e22;
        }

        .toggle-text {
          margin-top: 1rem;
          text-align: center;
          color: #007bff;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
