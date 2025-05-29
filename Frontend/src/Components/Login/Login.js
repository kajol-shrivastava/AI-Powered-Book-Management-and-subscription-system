import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "@mui/material";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {loginUser} from '../../services/auth'
import { registerUser } from '../../services/user';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  const handleSignup = async () => {
  try {
    const userData = {
      name,
      email,
      password,
      title,
      phone,
      street,
      city,
      pincode
    };

    const result = await registerUser(userData);
    
    if (result.status) {
        toast.success(result.data.message || "Signup successful");
        setIsSignup(false); // Switch to login after signup
      } else {
        toast.error(result.data.message || "Signup failed");
      }
  } catch (error) {
    console.error("Signup failed:", error);
    // Axios puts non-2xx responses here
    const backendMessage = error?.response?.data?.message || "Something went wrong!";
    toast.error(backendMessage);
  }
};


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isSignup) {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    await handleSignup();
    return;
    }  

    let result ;
 
    try {
      result = await loginUser(email, password);
      console.log("Login success:", result.status);

      // ✅ Save token to localStorage
      if (result.status ) {
        localStorage.setItem("token", result?.data?.token);
        toast.success(result.message)

        // Authentication logic here
        navigate('/dashboard');
      }
      else{
        toast.error(result.message)
      }

       
      

    } catch (err) {
    console.log("Login failed:", err);

      toast.error("login Failed")
    }
  
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const switchMode = () => {
    setIsSignup(!isSignup);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        {/* Left Side */}
        <div className="leftSide">
          <div className="imageContainer">
            <img 
              src="/loginimage.jpg"
              alt="Books Background" 
              className="backgroundImage" 
            />
          </div>
          <h2 className="leftHeading">
            Dive into a world of stories and knowledge.
          </h2>
        </div>

        {/* Right Side */}
        <div className="rightSide">
          <h1 className="rightHeading">
            {isSignup ? "Join Our Book Club!" : "Welcome Back, Reader!"}
            <br />
            <span className="rightHeading1">
              {isSignup 
                ? "Create your account to start exploring books, reviews, and more." 
                : "Sign in to access your personal library, bookmarks, and more."}
            </span>
          </h1>

          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input 
                type="email" 
                className="input" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            <div>
              <label>Password</label>
              <div className="password-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="input" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <IconButton 
                  onClick={togglePasswordVisibility} 
                  className="eye-icon"
                  sx={{
                    position: 'absolute',
                    right: '10px',
                    top: '35%',
                    transform: 'translateY(-50%)',
                    zIndex: 1 
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </div>
            </div>

            {isSignup && (
              <div>
                <label>Confirm Password</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="input" 
                  required 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                <div>
                <label>Title</label>
                <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Mr , Mrs or Miss' required />
              </div>

              <div>
                <label>Full Name</label>
                <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              {/* Flex container for side-by-side layout */}
              <div className="flex-row">
                <div className="flex-item">
                  <label>Phone</label>
                  <input type="text" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <div className="flex-item">
                  <label>Street</label>
                  <input type="text" className="input" value={street} onChange={(e) => setStreet(e.target.value)} required />
                </div>

                <div className="flex-item">
                  <label>City</label>
                  <input type="text" className="input" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>

                <div className="flex-item">
                  <label>Pincode</label>
                  <input type="text" className="input" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                </div>
                </div>
                
              </div>
            )}

            {/* <div className="terms">
              <input type="checkbox" required />
              <span>
                I agree to the{' '}
                <span className='tandc' style={{cursor:"pointer"}}>Terms & Conditions</span> and{' '}
                <span className='tandc' style={{cursor:"pointer"}}>Privacy Policy</span>
              </span>
            </div> */}

            <button type="submit" className="loginButton">
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <p className="switchText">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{' '}
            <span 
              onClick={switchMode} 
              className="switchLink"
              style={{ color: '#1e90ff', cursor: 'pointer' }}
            >
              {isSignup ? "Login here" : "Sign up here"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
