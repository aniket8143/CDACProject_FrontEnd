import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [message, setMessage] = useState(null);
  const [isWorker, setIsWorker] = useState(false); 

  const handleLogin = async (event) => {
    event.preventDefault();
    
    // Perform validation
    const validationErrors = validation({ email, password });
    if (validationErrors.email || validationErrors.password) {
      setError(validationErrors);
      return; // Stop the login process if validation fails
    }

    setError({});

    // Proceed with login
    if (isWorker) {
      try {
        const response = await axios.post('http://localhost:8080/worker/login', {
          email,
          password
        });
        const workerData = response.data; 
        setMessage("Login successful!");
        navigate('/worker/profile', { state: { workerData } }); 
      } catch (err) {
        setError({ general: err.response ? err.response.data : 'An error occurred' });
        setMessage(null);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:8080/user/login', {
          email,
          password
        });
        setMessage(response.data.user);
        console.log(response.data)
        setError(null);
        const userData = response.data;
     
        
        if (userData.role === "USER") {
          navigate('/user/userpage', { state: { userData } });
        } else if (userData.role === "ADMIN") {
          navigate('/admin/adminpage', { state: { userData } });
        }
      } catch (err) {
        setError(err.response ? err.response.data : 'An error occurred');
        setMessage(null);
      }
    }
  };

  const handleWorkerLogin = () => setIsWorker(true);
  const handleUserLogin = () => setIsWorker(false);

  const handleWorkerSignup = () => navigate('/worker/signup');
  const handleUserSignup = () => navigate('/user/signup');
  return (
    
    <div className="d-flex justify-content-center align-items-center vh-100 "  
    style={{ backgroundImage: 'url(/login1.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',flexDirection:'column' }}>
      {/* <div>
        <h1 style={{fontSize:'4rem' , color:'black'}}>WorkerHub</h1>
      </div><br></br> */}
      <div className="p-4 rounded-3  w-25" style={{backgroundColor:'whitesmoke'}}>
        <h2>Login</h2>
      <form onSubmit={handleLogin} className="form-group">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder='Enter Email' name='email'
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error?.email && <span className='text-danger'>{error.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder='Enter Password' name='email'
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error?.password && <span className='text-danger'>{error.password}</span>}
        </div>
        <div className="form-group">
          <label>
            <input
              type="radio"
              name="loginType"
              value="worker"
              checked={isWorker}
              onChange={handleWorkerLogin}
            />
            Worker
          </label>
          <label>
            <input
              type="radio"
              name="loginType"
              value="user"
              checked={!isWorker}
              onChange={handleUserLogin}
            />
           Consumer
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Login</button>
        
       <div className="mt-3">
          <p>Don't have an account?</p>
          {isWorker ? (
            <button type="button" className="btn btn-secondary" onClick={handleWorkerSignup}>
              Sign up as Worker
            </button>
          ) : (
            <button type="button" className="btn btn-secondary" onClick={handleUserSignup}>
              Sign up as Consumer
            </button>
          )}
        </div>


      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error?.general && <div className="alert alert-danger mt-3">{error.general}</div>}
      </div>
    </div>
  );
};

export default Login;
