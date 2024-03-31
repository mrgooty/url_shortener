import React from 'react';
import NavBar from '../components/NavBar';
import HomePageImage from '../components/HomePageImages';
import { useAuth } from '../components/auth';

function HomePage() {
  const isLoggedIn = useAuth();

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <HomePageImage />
      {/* Additional content for the HomePage can go here */}
    </div>
  );
}

export default HomePage;