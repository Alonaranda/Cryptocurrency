import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import { Coin } from './Component/Coin';

function App() {

  const baseUrL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(baseUrL)
    .then(response => {
      setCoins(response.data);
    })
    .catch(e => console.warn(e)); 
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin => {
    return (coin.name.toLowerCase()).includes(search.toLowerCase());
  })

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input 
            type="text" 
            placeholder="Search..."
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      <hr/>
      {
        filteredCoins.map(coin => {
          return (
            <Coin 
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              price={coin.current_price}
              volume={coin.market_cap}
              priceChange={coin.price_change_percentage_24h}
              marketcap={coin.market_cap_change_percentage_24h}
            />
          )
        })
      }
    </div>
  );
}

export default App;
