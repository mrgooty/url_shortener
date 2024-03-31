import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import image2 from '../assets/loginImage/image2.jpg';
import { useAuth } from '../components/auth';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const isLoggedIn = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Logging in with email:", email, "and password:", password);

        // API endpoint where the login request is sent
        const endpoint = 'http://localhost:3000/api/users/login';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('Login successful:', data);

            // Assuming the API response includes a userId field
            if (data.userId) {
                localStorage.setItem('userId', data.userId);
                console.log('UserId stored in localStorage');
                // Handle post-login success (e.g., redirect to a dashboard)
            } else {
                console.error('No userId returned from the API');
                // Handle missing userId (e.g., show error message)
            }
        } catch (error) {
            console.error('Failed to log in:', error);
            // Handle error (e.g., show error message)
        }
    };

    // Define the background style
    const backgroundStyle: React.CSSProperties = {
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${image2})`, 
        backgroundSize: 'cover', // Cover the entire page
        backgroundPosition: 'center', // Center the background image
    };

    return (
        <div style={backgroundStyle}>
            <NavBar isLoggedIn={isLoggedIn} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '20%', backgroundColor: 'rgba(255,255,255,0.8)', padding: '20px', borderRadius: '10px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        required
                        style={{ marginBottom: '10px', padding: '10px' }}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        required
                        style={{ marginBottom: '20px', padding: '10px' }}
                    />
                    <button type="submit" style={{ padding: '10px' }}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
