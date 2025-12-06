import "./header.css";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { Clock } from "./clock/clock/Clock";
import { useAuth } from "../../../core/services/AuthService";

// Example AuthService hook replacement
// Replace with your actual auth context/service
// const useAuth = () => {
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);
//   const [currentUser, setCurrentUser] = React.useState<{ username: string } | null>(null);

//   const login = (user: { username: string }) => {
//     setIsLoggedIn(true);
//     setCurrentUser(user);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setCurrentUser(null);
//   };

//   return { isLoggedIn, currentUser, login, logout };
// };

export function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, logout } = useAuth();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
    navigate("/home");
  };

  return (
    <header>
      <div className="mini-navbar-wrap">
        <div className="logo-wrap">
          <img src="logo1.png" alt="Logo" />
          <p className="logo">Song shop</p>
        </div>
        <div className="mini-navbar">
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile">{currentUser?.username}'s profile</Link>
                </li>
                <li>
                  <a href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
          <ul>
            {/* Replace with your Clock component */}
            {/* <Clock /> */}
            <Clock />
          </ul>
        </div>
      </div>
      <nav className="main-nav">
        <ul className="nav-list">
          <li>
            <Link to="/home">Home</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/songs">Deezer Songs</Link>
              </li>
              <li>
                <Link to="/songs2/9">Jamendo Songs</Link>
              </li>
              <li>
                <Link to="/change-song">New Deezer Artist</Link>
              </li>
              <li>
                <Link to="/change-song2">New Jamendo Artist</Link>
              </li>
              <li>
                <Link to="/artists">All Artists</Link>
              </li>
              <li>
                <Link to="/radio">Radio mix</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
