import React from 'react';
import { CryptoState } from '../CryptoContext';
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { coinWithComa } from '../components/Banner/Corousels';

const Watchlist = () => {
  const { user, watchlist, coins, symbol, setAlert } = CryptoState();

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((watch) => watch !== coin.id) },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} removed from Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="p-4 bg-light rounded-4 shadow-lg">
        <h3 className="mb-4 fw-bold text-center" style={{ fontFamily: "Montserrat" }}>⭐ Your Watchlist</h3>

        {coins
          .filter((coin) => watchlist.includes(coin.id))
          .map((coin) => (
            <div
              key={coin.id}
              className="d-flex justify-content-between align-items-center bg-white text-dark rounded-3 shadow-sm p-3 mb-3"
            >
              <span className="fw-medium">{coin.name}</span>
              <span className="fw-bold">
                {symbol}
                {coinWithComa(coin.current_price.toFixed(2))}
              </span>
              <AiFillDelete
                onClick={() => removeFromWatchlist(coin)}
                style={{ cursor: 'pointer', color: 'red', fontSize: '1.3rem' }}
              />
            </div>
          ))}

        {watchlist.length === 0 && (
          <div className="text-center text-muted fs-6">No coins in your Watchlist yet.</div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
