import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth';
import NavBar from '../components/NavBar';
import image3 from '../assets/AllUrlsImages/image3.jpg'; // Ensure the path is correct

// Define a type for the URL data structure
type UrlData = {
  longUrl: string;
  shortUrl: string;
};

const AllUrls: React.FC = () => {
  const isLoggedIn = useAuth();
  const [urls, setUrls] = useState<UrlData[]>([]); // Use the UrlData type for state typing

  useEffect(() => {
    const fetchUrls = async () => {
      // Retrieve userId from localStorage
      const userId = localStorage.getItem('userId');

      const apiUrl = 'http://localhost:3000/api/urls/all';

      if (!userId) {
        console.error('No userId found, ensure the user is logged in.');
        return; // Exit if not logged in or userId not found
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }), // Send userId in the request body
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: UrlData[] = await response.json(); // Explicitly type the response data as UrlData[]
        setUrls(data);
      } catch (error) {
        console.error('Error fetching URLs:', error);
        // Handle error here (e.g., set an error state and display a message)
      }
    };

    // Only fetch URLs if the user is logged in
    if (isLoggedIn) {
      fetchUrls();
    }
  }, [isLoggedIn]); // Depend on isLoggedIn to refetch when the login state changes

  // Define the background style
  const backgroundStyle: React.CSSProperties = { // Explicitly type as React.CSSProperties
    backgroundImage: `url(${image3})`,
    backgroundSize: 'cover', // Cover the entire page
    backgroundPosition: 'center', // Center the background image
    width: '100vw',
    height: '100vh',
    overflow: 'auto', // Add scroll if content is larger than the viewport
  };

  return (
    <div style={backgroundStyle}>
      <NavBar isLoggedIn={isLoggedIn} />
      <div style={{ padding: '20px', color: 'white' }}>
        <h2>URLs List</h2>
        <table style={{ width: '100%', tableLayout: 'fixed', border: '1px solid black' }}>
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Shortened URL</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url, index) => (
              <tr key={index}>
                <td style={{ wordWrap: 'break-word' }}>{url.longUrl}</td>
                <td style={{ wordWrap: 'break-word' }}>{url.shortUrl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUrls;
