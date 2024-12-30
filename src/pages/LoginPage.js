import React from 'react';
import './LoginPage.css'; // Assuming you will create a CSS file for styling

const LoginPage = () => {
  return (
    <div className="login-body">
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="login-goback">
            <a href="./">Go Back</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
