import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check admin status when component mounts and when localStorage changes
        const checkAdminStatus = () => {
            const adminValue = localStorage.getItem('isAdmin');
            const adminStatus = adminValue === 'true';
            console.log('NavBar: Checking admin status:', {
                rawValue: adminValue,
                isAdmin: adminStatus,
                allStorage: {
                    isAdmin: localStorage.getItem('isAdmin'),
                    authToken: !!localStorage.getItem('authToken')
                }
            });
            setIsAdmin(adminStatus);
        };

        checkAdminStatus();
        
        // Listen for storage changes
        window.addEventListener('storage', checkAdminStatus);
        return () => window.removeEventListener('storage', checkAdminStatus);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAdmin');
        setIsAdmin(false);
        navigate('/login');
    };

    const isLoggedIn = !!localStorage.getItem('authToken');
    console.log('NavBar render:', { isLoggedIn, isAdmin });

    return (
        <nav className="navbar">
            <span className="logo">Sports Courts</span>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courts">Courts</Link></li>
                {isAdmin && (
                    <li><Link to="/add-court">Add Court</Link></li>
                )}
                {isLoggedIn ? (
                    <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;