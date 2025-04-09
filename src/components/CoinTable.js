import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { coinWithComa } from './Banner/Corousels';
import { Pagination } from '@material-ui/lab';
import 'bootstrap/dist/css/bootstrap.min.css';

const CoinTable = () => {
  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="px-3 py-5">
      <div className="mx-auto shadow rounded-4 bg-white p-4" style={{ maxWidth: '1000px' }}>
        <h2 className="text-center mb-4 fw-bold" style={{ fontFamily: 'Montserrat', color: '#333' }}>
          Crypto Currency Prices By Market Cap
        </h2>

        <input
          type="text"
          className="form-control mb-4 rounded-3"
          placeholder="Search for a Crypto Currency..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="table-responsive">
          {loading ? (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped bg-info progress-bar-animated"
                style={{ width: '100%' }}
              ></div>
            </div>
          ) : (
            <table className="table table-hover align-middle rounded-4 overflow-hidden" style={{ borderRadius: '1rem' }}>
              <thead className="bg-light text-dark">
                <tr>
                  <th>Coin</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">24h Change</th>
                  <th className="text-end">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    let profit = row.price_change_percentage_24h > 0;
                    return (
                      <tr
                        key={row.name}
                        style={{ cursor: 'pointer' }}
                        onClick={() => history.push(`/coins/${row.id}`)}

                        className="rounded-3"
                      >
                        <td className="d-flex align-items-center gap-3">
                          <img src={row?.image} alt={row.name} height="40" className="rounded-circle" />
                          <div className="text-start">
                            <div className="fw-bold text-uppercase fs-5" style={{ color: '#212529' }}>{row.symbol}</div>
                            <div className="text-muted small">{row.name}</div>
                          </div>
                        </td>
                        <td className="text-end text-dark">
                          {symbol} {coinWithComa(row.current_price.toFixed(2))}
                        </td>
                        <td
                          className="text-end"
                          style={{
                            color: profit ? 'rgba(14,203,129)' : 'red',
                            fontWeight: '500',
                          }}
                        >
                          {profit && '+'}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </td>
                        <td className="text-end text-dark">
                          {symbol} {coinWithComa(row.market_cap.toString().slice(0, -6))}M
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>

        <div className="d-flex justify-content-center mt-4">
        <Pagination
  count={Math.ceil(handleSearch()?.length / 10)} // ✅ returns a number
  onChange={(_, value) => {
    setPage(value);
    window.scroll(0, 450);
  }}
  variant="outlined"
  color="primary"
/>

        </div>
      </div>
    </div>
  );
};

export default CoinTable;
