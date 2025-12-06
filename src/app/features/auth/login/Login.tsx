// Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../core/services/AuthService';
import './login.css';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('dobromirtt@gmail.com');
  const [password, setPassword] = useState('123');
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const emailError = touchedEmail && !email;
  const passwordError = touchedPassword && !password;
  const isFormValid = email && password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Submitted form values:', { email, password });
      const success = await login(email, password);
      if (success) {
        navigate('/home');
      } else {
        alert('Login failed - 401 Unauthorized');
      }
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <fieldset>
        <h2>Login</h2>

        <p className="field field-icon">
          <label htmlFor="email">
            <span>
              <i className={`fas fa-envelope ${emailError ? 'text-danger' : ''}`} />
            </span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setTouchedEmail(true)}
            className={emailError ? 'input-error' : ''}
          />
        </p>
        {emailError && <div className="alert alert-danger">Email is required!</div>}

        <p className="field field-icon">
          <label htmlFor="password">
            <span>
              <i className={`fas fa-lock ${passwordError ? 'text-danger' : ''}`} />
            </span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="******"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onBlur={() => setTouchedPassword(true)}
            className={passwordError ? 'input-error' : ''}
          />
        </p>
        {passwordError && <div className="alert alert-danger">Password is required!</div>}

        <button type="submit" disabled={!isFormValid}>Login</button>

        <p className="text-center">
          Have an account? <Link to="/register">Register</Link>
        </p>
      </fieldset>
    </form>
  );
}
