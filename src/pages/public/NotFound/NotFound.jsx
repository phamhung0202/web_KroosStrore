import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';

const NotFound = () => {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '6rem', marginBottom: '1rem', fontFamily: 'var(--font-secondary)' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--color-dark-gray)', marginBottom: '2rem', maxWidth: '400px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">Return to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
