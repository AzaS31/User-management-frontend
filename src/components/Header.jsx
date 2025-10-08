import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import api from '../utils/api';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) setUser(userData);
    }, []);

    // Nota Bene: handleLogout clears localStorage, resets state, and navigates to login
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <header className="bg-dark text-white py-3">
            <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
                <ul className="nav mb-2 mb-md-0">
                    <li>
                        <Link to="/" className="nav-link px-3 text-white">Home</Link>
                    </li>
                    <li>
                        <Link to="/admin" className="nav-link px-3 text-white">Users</Link>
                    </li>
                </ul>

                <div className="d-flex align-items-center">
                    {user ? (
                        <>
                            <span className="me-3">Hello, {user.name}</span>
                            <Button variant="outline-light" onClick={handleLogout}>
                                Log out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button as={Link} to="/login" variant="outline-light" className="me-2">
                                Login
                            </Button>
                            <Button as={Link} to="/register" variant="warning">
                                Sign-up
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
