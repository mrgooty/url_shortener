import React, { useState } from 'react';
import image1 from '../assets/HomePageImages/image1.jpg';

const HomePageImage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState(''); // State for the custom slug
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const userId = localStorage.getItem('userId');
    const apiEndpoint = 'http://localhost:3000/api/urls/shorten';

    try {
      const requestBody = userId ? 
        { longUrl: url, userId, customSlug: customSlug.trim() } : 
        { longUrl: url, customSlug: customSlug.trim() }; // Include customSlug in the body

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setShortenedUrl(data?.shortUrl);
      } else {
        const errorText = await response.text();
        setError(`Error: ${response.status} ${errorText}`);
        setShortenedUrl(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch.');
    }

    setUrl('');
    setCustomSlug(''); // Reset custom slug input
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('URL copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy URL:', err);
      alert('Failed to copy URL');
    });
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${image1})`,
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: '300px', textAlign: 'center' }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          required
        />
        {/* Input field for custom slug */}
        <input
          type="text"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          placeholder="Custom Slug (optional)"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Submit</button>
        {shortenedUrl && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ wordWrap: 'break-word', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px', marginBottom: '5px' }}>
              Shortened URL: <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
            </span>
            <button onClick={() => copyToClipboard(shortenedUrl)} style={{ cursor: 'pointer' }}>
              Copy URL
            </button>
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default HomePageImage;
