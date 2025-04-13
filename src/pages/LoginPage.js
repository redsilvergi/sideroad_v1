import './LoginPage.css';
import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

const LoginPage = () => {
  // setup ----------------------------------------------------------------------
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // handle ----------------------------------------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/auth/login`, {
        username,
        password,
      });
      // console.log('handleLogin response.data\n', response.data);
      if (response.status === 200) {
        login(response.data.user);
        navigate('/');
      } else {
        alert('로그인 정보가 잘못되었습니다');
      }

      // localStorage.setItem('token', response.data.token)
    } catch (err) {
      alert('로그인 정보가 잘못되었습니다');
    }
  };

  // return ----------------------------------------------------------------------
  return (
    <div className="login-body">
      <div className="login-container">
        <h2>로그인</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
          <div className="login-goback" onClick={() => navigate('/')}>
            뒤로가기
          </div>
          {/* <div className="login-goback">
            <button onClick={() => console.log('user\n', user)}>
              check user state
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
