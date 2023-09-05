// https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=USD
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1
// https://binance-docs.github.io/apidocs/spot/en/

import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [crypto, setCrypto] = useState([]);
  const [search, setSearch] = useState("");

  const fetchingData = async () => {
    try {
      const response = await axios.get(
        'https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=USD'
      );
      setCrypto(response.data.coins);
      console.log(response.data);
    } catch (error) {
      console.error('Error Fetching Crypto Data', error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div className="App">
      <h1>My Crypto</h1>
      <input
        type='text'
        placeholder='Search..'
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />

      <Container>
        <Row className='my-5'>
          {crypto.filter((cryptoItem) => {
            return cryptoItem.name.toLowerCase().includes(search.toLowerCase())
          })
          .map((cryptoItem, index) => (
            <Col key={cryptoItem.id} xs={12} sm={6} md={4} lg={3}>              
              <Card className='mb-4'>
              <a href={cryptoItem.websiteUrl} target="_blank" rel="noopener noreferrer">
                <Card.Img
                  variant='top my-4'
                  src={cryptoItem.icon}
                  alt={cryptoItem.name}
                  style={{ width: '50px', height: '50px', marginLeft: '10px' }}
                />
              </a>
             <Card.Body>
                  <Card.Text>Rank: {cryptoItem.rank}</Card.Text>
                  <Card.Title>{cryptoItem.name}</Card.Title>
                  <Card.Text>Symbol: {cryptoItem.symbol}</Card.Text>
                  <Card.Text>Price: ${cryptoItem.price.toFixed(2)}</Card.Text>
                  <Card.Text>
                    Market Cap (USD): ${cryptoItem.marketCap.toLocaleString()}
                  </Card.Text>
              </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
