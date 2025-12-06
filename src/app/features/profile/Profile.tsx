import React, { useState, useEffect } from 'react';
import { useAuth } from '../../core/services/AuthService';
import './profile.css';


export function Profile() {
  const { currentUser, updateUser } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formValues, setFormValues] = useState({ username: '', email: '' });
  const [touched, setTouched] = useState({ username: false, email: false });

  useEffect(() => {
    if (currentUser) {
      setFormValues({
        username: currentUser.username || '',
        email: currentUser.email || '',
      });
    }
  }, [currentUser]);

  const handleEdit = () => {
    setIsEditMode(true);
    setTouched({ username: false, email: false });
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setFormValues({ username: '', email: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleBlur = (field: 'username' | 'email') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isUsernameValid = touched.username && !formValues.username.trim();
  const isEmailValid = touched.email && !formValues.email.trim();

  const usernameErrorMessage = isUsernameValid ? 'Username is required!' : '';
  const emailErrorMessage = isEmailValid ? 'Email is required!' : '';

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.username.trim() || !formValues.email.trim()) return;

    const storedUser = localStorage.getItem('currentUser');
    console.log(storedUser);
    
    if (!storedUser) {
      console.error('User ID not found in localStorage');
      return;
    }

     const parsedUser = JSON.parse(storedUser);                // ✅ FIXED LINE

    const updatedUser = {
      id: parsedUser.id, 
      username: formValues.username,
      email: formValues.email,
    };

    try {
      await updateUser(updatedUser);
      setIsEditMode(false);
      setFormValues({ username: '', email: '' });
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div className="profile">
      <h3>User details:</h3>

      {!isEditMode ? (
        <>
          <div className="flex">
            <p>Username:</p>
            <p>{currentUser?.username || 'N/A'}</p>
          </div>
          <div className="flex">
            <p>Email:</p>
            <p>{currentUser?.email || 'N/A'}</p>
          </div>
          <button className="edit-button" onClick={handleEdit}>Edit</button>
        </>
      ) : (
        <form onSubmit={handleSave}>
          <div className="flex">
            <p>Username:</p>
            <div className="input-container">
              <input
                type="text"
                id="username"
                value={formValues.username}
                onChange={handleChange}
                onBlur={() => handleBlur('username')}
                className={isUsernameValid ? 'input-error' : ''}
              />
              {isUsernameValid && <p className="error">{usernameErrorMessage}</p>}
            </div>
          </div>
          <div className="flex">
            <p>Email:</p>
            <div className="input-container">
              <input
                type="email"
                id="email"
                value={formValues.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                className={isEmailValid ? 'input-error' : ''}
              />
              {isEmailValid && <p className="error">{emailErrorMessage}</p>}
            </div>
          </div>
          <div className="button-container">
            <button type="button" onClick={handleCancel}>Cancel</button>
            <button type="submit" disabled={isUsernameValid || isEmailValid}>Save</button>
          </div>
        </form>
      )}
    </div>
  );
}
