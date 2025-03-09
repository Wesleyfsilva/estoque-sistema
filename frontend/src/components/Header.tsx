import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#f4f4f4' }}>
            <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
            <Link to="/register" style={{ margin: '0 10px' }}>Registro</Link>
            <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
        </nav>
    );
};

export default Header;
