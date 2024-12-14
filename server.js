
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');


const app = express();
const port = 5000; 


app.use(bodyParser.json());


app.get('/api/stock-data', (req, res) => {
    const symbol = req.query.symbol || 'AAPL'; 
    const apiKey = 'YOUR_ALPHAVANTAGE_API_KEY';  


    axios.get(`https://www.alphavantage.co/query`, {
        params: {
            function: 'TIME_SERIES_DAILY',  
            symbol: symbol,
            apikey: apiKey
        }
    })
    .then(response => {
        res.json(response.data);  
    })
    .catch(error => {
        res.status(500).json({ error: 'Error fetching stock data' });
    });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
const { RSI, MACD } = require('technicalindicators');

app.get('/api/stock-data', (req, res) => {
    const symbol = req.query.symbol || 'AAPL';
    const apiKey = 'YOUR_ALPHAVANTAGE_API_KEY';
    
    axios.get(`https://www.alphavantage.co/query`, {
        params: {
            function: 'TIME_SERIES_DAILY',
            symbol: symbol,
            apikey: apiKey
        }
    })
    .then(response => {
        const data = response.data['Time Series (Daily)'];
        const prices = Object.values(data).map(item => parseFloat(item['4. close']));

        // Calculate RSI
        const rsi = RSI.calculate({
            values: prices,
            period: 14
        });

        // Calculate MACD
        const macd = MACD.calculate({
            values: prices,
            fastPeriod: 12,
            slowPeriod: 26,
            signalPeriod: 9
        });

        res.json({ rsi, macd });
    })
    .catch(error => {
        res.status(500).json({ error: 'Error fetching stock data' });
    });
});

