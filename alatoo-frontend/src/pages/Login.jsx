import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/accounts/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Save tokens and message in localStorage
        localStorage.setItem('message', data.message);
        localStorage.setItem('access', data.access); // Save access token
        localStorage.setItem('refresh', data.refresh); // Save refresh token
        
        console.log("You logged in successfully");
        console.log("Access Token:", data.access, "Refresh Token:", data.refresh);

        navigate('/create'); // Redirect to create page (or home)
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Forgot Password Link */}
      <div>
        <Link to="/reset-password">Forgot Password?</Link>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
