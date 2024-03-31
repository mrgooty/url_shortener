import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for potential redirection

interface NavBarProps {
  isLoggedIn: boolean;
  onSignOut?: () => void; // Optional sign out handler prop
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, onSignOut }) => {
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const navigate = useNavigate(); // Use navigate for redirecting after sign out

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold' as const,
    padding: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease-in-out',
  };

  const hoveredLinkStyle = {
    ...linkStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  };

  const navbarStyle = {
    position: 'absolute' as const,
    top: 0,
    width: '100%',
    zIndex: 1000,
    backgroundImage: 'url("/assets/NavBarImage/navbarImage.jpg")',
    backgroundSize: 'cover' as const,
    backgroundRepeat: 'no-repeat' as const,
    backgroundPosition: 'center' as const,
  };

  const handleSignOut = () => {
    // Clear user data from storage or invalidate session
    localStorage.removeItem('userId');
    // Call an optional sign out handler, if provided
    if (onSignOut) {
      onSignOut();
    }
    // Optionally, redirect the user to the homepage or login page
    navigate('/login');
  };

  const paths = isLoggedIn ? ['/', '/allUrls'] : ['/', '/login', '/createAccount'];

  return (
    <nav style={navbarStyle}>
      <ul style={{
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0',
        margin: 0,
      }}>
        {paths.map((path, index) => (
          <li key={path} style={{ padding: '10px' }}>
            <Link
              to={path}
              style={hoverIndex === index ? hoveredLinkStyle : linkStyle}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
            >
              {path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
            </Link>
          </li>
        ))}
        {isLoggedIn && (
          <li style={{ padding: '10px' }}>
            <button
              onClick={handleSignOut}
              style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Sign Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
