const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cron = require('node-cron');
const cors = require('cors');
const Price = require('./models/price');
const dbConfig = require('./config/db');

const app = express();
app.use(cors());

mongoose.connect(dbConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

const fetchData = async () => {
    try {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        const prices = [
            { symbol: 'BTC', price: data.bitcoin.usd },
            { symbol: 'ETH', price: data.ethereum.usd },
        ];
        await Price.insertMany(prices);
        console.log('Data inserted:', prices);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

cron.schedule('*/10 * * * * *', fetchData);

app.get('/api/prices/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const prices = await Price.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.json(prices);
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

fetchData(); // Initial fetch to populate data
