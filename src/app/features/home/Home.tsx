import { Link } from 'react-router-dom';
import { useAuth } from '../../core/services/AuthService';
import './home.css';

export function Home() {
  const { isLoggedIn, currentUser } = useAuth();

  return (
    <div className="welcome">
      <h3>Welcome to Songshop!</h3>
      <p>
        Your go-to place for discovering, buying, and enjoying the best music MP3s.
        Browse our collection, preview tracks, and purchase your favorite songs easily and securely.
      </p>

      {!isLoggedIn ? (
        <div className="logged">
          <ul>
            <li>
              <Link to="/login">
                <i className="fas fa-sign-in-alt"></i>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <i className="fas fa-user-plus"></i>
                Register
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="logged">
          <p>Welcome back, {currentUser?.username}!</p>
        </div>
      )}
    </div>
  );
}
