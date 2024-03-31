import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import NavBar from '../components/NavBar';
import image2 from '../assets/loginImage/image2.jpg';
import { useAuth } from '../components/auth';

const CreateAccount: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const isLoggedIn = useAuth();
    const navigate = useNavigate(); // Use useNavigate hook for navigation

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Creating account with email:", email, "and password:", password);

        const endpoint = 'http://localhost:3000/api/users/createUser';

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
            console.log('Account created successfully:', data);

            if (data.userId) {
                localStorage.setItem('userId', data.userId);
                console.log('UserId stored in localStorage');
                navigate('/'); // Redirect to the homepage using navigate
            }
        } catch (error) {
            console.error('Failed to create account:', error);
            // Handle error (e.g., show an error message to the user)
        }
    };

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
                    <button type="submit" style={{ padding: '10px' }}>Create Account</button>
                </form>
            </div>
        </div>
    );
}

export default CreateAccount;
