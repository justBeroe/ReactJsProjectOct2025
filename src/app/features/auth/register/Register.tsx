import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../core/services/AuthService'; // ✅ import the context hook
import './register.css';

export function Register() {
  const navigate = useNavigate();
  const { register, registerInMongo } = useAuth();   // ✅ use service methods

  // Form state
  const [username, setUsername] = useState('justberoe');
  const [email, setEmail] = useState('dobromirtt@gmail.com');
  const [password, setPassword] = useState('123');
  const [rePassword, setRePassword] = useState('123');

  // Touched flags for validation
  const [touchedUsername, setTouchedUsername] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedRePassword, setTouchedRePassword] = useState(false);

  // Validation helpers
  const noWhitespace = (value: string) => value.trim().length > 0;

  const usernameError = touchedUsername && (!username || !noWhitespace(username));
  const emailError = touchedEmail && !email;
  const passwordError = touchedPassword && (!password || !noWhitespace(password));
  const rePasswordError = touchedRePassword && (!rePassword || !noWhitespace(rePassword));
  const passwordsMismatch = password !== rePassword;

  const isFormValid =
    username &&
    email &&
    password &&
    rePassword &&
    !usernameError &&
    !emailError &&
    !passwordError &&
    !rePasswordError &&
    !passwordsMismatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      console.log('Submitted form values:', { username, email, password, rePassword });

      // ✅ Call local register (updates context immediately)
      const success = register(username, email, password, rePassword);

      if (!success) {
        alert('Registration failed. Please try again.');
        return;
      }

      try {
        // ✅ Call backend Mongo registration
        await registerInMongo(username, email, password, rePassword);
        navigate('/home');
      } catch (err) {
        console.error('MongoDB registration failed:', err);
        alert('Registration failed. Please check API or DB conflict.');
      }
    }
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <fieldset>
        <h2>Registration Form</h2>

        {/* Username */}
        <p className="field field-icon">
          <label htmlFor="username">
            <span>
              <i className={`fas fa-user ${usernameError ? 'text-danger' : ''}`} />
            </span>
          </label>
          <input
            type="text"
            id="username"
            placeholder="SAMO Beroe"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onBlur={() => setTouchedUsername(true)}
            className={usernameError ? 'input-error' : ''}
          />
        </p>
        {usernameError && <div className="alert alert-danger">Username is required!</div>}
        {touchedUsername && !noWhitespace(username) && (
          <div className="alert alert-danger">Username cannot be empty or just spaces.</div>
        )}

        {/* Email */}
        <p className="field field-icon">
          <label htmlFor="email">
            <span>
              <i className={`fas fa-envelope ${emailError ? 'text-danger' : ''}`} />
            </span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="admin@beroe.bg"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setTouchedEmail(true)}
            className={emailError ? 'input-error' : ''}
          />
        </p>
        {emailError && <div className="alert alert-danger">Email is required!</div>}

        {/* Password */}
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
        {touchedPassword && !noWhitespace(password) && (
          <div className="alert alert-danger">Password cannot be empty or just spaces.</div>
        )}

        {/* Re-enter Password */}
        <p className="field field-icon">
          <label htmlFor="rePassword">
            <span>
              <i className={`fas fa-lock ${rePasswordError ? 'text-danger' : ''}`} />
            </span>
          </label>
          <input
            type="password"
            id="rePassword"
            placeholder="******"
            value={rePassword}
            onChange={e => setRePassword(e.target.value)}
            onBlur={() => setTouchedRePassword(true)}
            className={rePasswordError ? 'input-error' : ''}
          />
        </p>
        {passwordsMismatch && <div className="alert alert-danger">Passwords do not match.</div>}

        <button type="submit" disabled={!isFormValid}>
          Create Account
        </button>

        <p className="text-center">
          Have an account? <Link to="/login">Log In</Link>
        </p>
      </fieldset>
    </form>
  );
}
