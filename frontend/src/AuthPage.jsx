import React, { useState } from 'react';
import axios from 'axios';

const AuthPage = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    axios.post('http://localhost:3001/authenticate', { username, password })
      .then(response => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          // Successful authentication
          props.onAuth({ username:username, secret: password });
        }
      })
      .catch(error => {
        console.log('Error:', error);
        setError('An error occurred during authentication');
      });
  };

  const handleAuthSuccess = (userData) => {
    props.onAuth(userData);
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">InstaChat🙋</div>
        <div className="form-subtitle">Enter Your Credentials</div>

        <div className="auth">
          <input
            className="auth-input"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="auth-input"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="auth-input"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
          <button className="auth-button" type="submit">Time to gossip! 🗣️</button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
