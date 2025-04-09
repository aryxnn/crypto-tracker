import React from 'react';
import Banner from '../components/Banner/Banner';
import CoinTable from '../components/CoinTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="bg-light text-dark min-vh-100">
      {/* Hero Section */}
      <div className="py-5 text-center">
        <h1 className="display-4 fw-bold">Welcome to Crypto Hunter</h1>
        <p className="lead">Track your favorite cryptocurrencies in real-time and manage your portfolio smartly.</p>
        <hr className="my-4 mx-auto w-75" />
      </div>

      {/* Banner Carousel */}
      <div className="px-3 mb-4 d-flex justify-content-center">
        <div
          className="bg-white shadow-sm p-4"
          style={{
            borderRadius: '1.5rem',
            width: '100%',
            maxWidth: '1200px',
            overflow: 'hidden',
          }}
        >
          <Banner />
        </div>
      </div>

      {/* Coin Table */}
      <div className="px-3 d-flex justify-content-center">
        <div
          className="bg-white shadow p-4"
          style={{
            borderRadius: '1.5rem',
            width: '100%',
            maxWidth: '1200px',
            overflowX: 'auto',
          }}
        >
          <h2 className="mb-4 text-center">Cryptocurrency Prices by Market Cap</h2>
          <CoinTable />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5 py-3 text-muted">
        Made with ❤️ by Aryan | Crypto Hunter © 2025
      </footer>
    </div>
  );
};

export default Home;
