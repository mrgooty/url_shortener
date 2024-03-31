import { useState, useEffect } from 'react';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if userId is stored in localStorage
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId); // !! converts the value to a boolean: true if userId exists, false otherwise
  }, []);

  return isLoggedIn;
}
