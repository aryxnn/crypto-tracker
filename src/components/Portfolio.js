import React, { useState, useEffect } from "react";
import axios from "axios";

const Portfolio = () => {
  const [holdings, setHoldings] = useState([]);
  const [coins, setCoins] = useState([]);

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

  const addHolding = (e) => {
    e.preventDefault();
    const coin = e.target.coin.value;
    const amount = parseFloat(e.target.amount.value);
    const price = parseFloat(e.target.price.value);
    setHoldings([...holdings, { coin, amount, price }]);
    e.target.reset();
  };

  const getCurrentPrice = (coinId) => {
    const coin = coins.find(c => c.id === coinId);
    return coin?.current_price || 0;
  };

  return (
    <div className="container mt-5">
      <div className="p-4 bg-light rounded-4 shadow-lg">
        <h2 className="text-center mb-4 fw-bold" style={{ fontFamily: "Montserrat" }}>
          📊 Portfolio Tracker
        </h2>

        <form onSubmit={addHolding} className="row g-3 mb-4">
          <div className="col-md-4">
            <select name="coin" className="form-select" required>
              {coins.map(coin => (
                <option key={coin.id} value={coin.id}>{coin.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input type="number" step="0.01" name="amount" placeholder="Amount Owned" className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="number" step="0.01" name="price" placeholder="Buy Price ($)" className="form-control" required />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">Add</button>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-secondary">
              <tr>
                <th>Coin</th>
                <th>Amount</th>
                <th>Buy Price</th>
                <th>Current Price</th>
                <th>P / L</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h, i) => {
                const currentPrice = getCurrentPrice(h.coin);
                const profitLoss = ((currentPrice - h.price) * h.amount).toFixed(2);
                return (
                  <tr key={i}>
                    <td className="text-capitalize">{h.coin}</td>
                    <td>{h.amount}</td>
                    <td>${h.price}</td>
                    <td>${currentPrice}</td>
                    <td className={profitLoss >= 0 ? "text-success fw-bold" : "text-danger fw-bold"}>
                      ${profitLoss}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
