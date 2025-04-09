import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SingleCoin } from '../config/api';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);  // optional: to show loader
  const [error, setError] = useState(null);      // optional: error handling

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
      } catch (err) {
        setError('Failed to fetch coin data.');
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>
        {coin.name} ({coin.symbol.toUpperCase()})
      </h2>

      <div className="mt-3">
        <img src={coin.image.large} alt={coin.name} height="100" />
        <p dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ')[0] + '.' }} />
        <p><strong>Market Cap Rank:</strong> #{coin.market_cap_rank}</p>
        <p><strong>Current Price:</strong> {coin.market_data.current_price.usd} USD</p>
        <p><strong>Homepage:</strong> <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer">{coin.links.homepage[0]}</a></p>
      </div>
    </div>
  );
};

export default CoinPage;
