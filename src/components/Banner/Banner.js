import React from 'react';
import Corousels from './Corousels';
import 'bootstrap/dist/css/bootstrap.min.css';

const Banner = () => {
  return (
    <div
      className="position-relative overflow-hidden rounded-4 m-3"
      style={{
        backgroundImage: 'url(./banner4.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        borderRadius: '1.5rem',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)', // Enhanced shadow
      }}
    >
      {/* Dark Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }}
      ></div>

      {/* Content */}
      <div
        className="container h-100 position-relative d-flex flex-column justify-content-center align-items-center text-center"
        style={{ zIndex: 2 }}
      >
        <h1 className="display-4 fw-bold text-white mb-3" style={{ fontFamily: 'Montserrat' }}>
          Track the Crypto Universe
        </h1>
        <p className="lead text-light" style={{ fontFamily: 'Montserrat' }}>
          Stay updated with real-time prices and trends.
        </p>

        {/* Carousel */}
        <div className="mt-4 w-100 px-3">
          <Corousels />
        </div>
      </div>
    </div>
  );
};

export default Banner;
