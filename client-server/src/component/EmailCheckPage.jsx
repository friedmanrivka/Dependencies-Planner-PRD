// src/component/EmailCheckPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkEmailExists } from './services';

const EmailCheckPage = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const exists = await checkEmailExists(email);
      if (exists) {
        navigate('/table'); // Replace with your actual next page path
      } else {
        setErrorMessage('Email not found');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setErrorMessage('Error checking email');
    }
  };

  return (
    <div>
      <h2>Check Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit">Check Email</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default EmailCheckPage;
