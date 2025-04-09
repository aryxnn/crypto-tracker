import React, { useState, useEffect } from "react";
import axios from "axios";

const Converter = () => {
  const [coins, setCoins] = useState([]);
  const [fromCoin, setFromCoin] = useState("bitcoin");
  const [toCoin, setToCoin] = useState("ethereum");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(null);

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
      }
    }).then(res => setCoins(res.data));
  }, []);

  const convert = () => {
    const from = coins.find(c => c.id === fromCoin)?.current_price || 1;
    const to = coins.find(c => c.id === toCoin)?.current_price || 1;
    const result = (amount * from) / to;
    setConverted(result.toFixed(6));
  };

  return (
    <div className="container mt-5">
      <div className="p-4 bg-light rounded-4 shadow-lg">
        <h2 className="text-center mb-4 fw-bold" style={{ fontFamily: "Montserrat" }}>
          🔄 Crypto Converter
        </h2>

        <div className="row g-3 align-items-center mb-4">
          <div className="col-md-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-control"
              placeholder="Amount"
            />
          </div>
          <div className="col-md-3">
            <select value={fromCoin} onChange={(e) => setFromCoin(e.target.value)} className="form-select">
              {coins.map(coin => (
                <option key={coin.id} value={coin.id}>{coin.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select value={toCoin} onChange={(e) => setToCoin(e.target.value)} className="form-select">
              {coins.map(coin => (
                <option key={coin.id} value={coin.id}>{coin.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <button onClick={convert} className="btn btn-success w-100">Convert</button>
          </div>
        </div>

        {converted && (
          <div className="alert alert-info text-center fs-5 rounded-3">
            ✅ {amount} {fromCoin} = <strong>{converted}</strong> {toCoin}
          </div>
        )}
      </div>
    </div>
  );
};

export default Converter;
