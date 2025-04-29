
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Replace with your actual RapidAPI key
const RAPIDAPI_KEY = 'f2eafbba56mshdb9d47ec0491678p1fbd1ejsn7861984e8fc6';
const RAPIDAPI_HOST = 'hoteldiscoveryapi.p.rapidapi.com';

app.get('/search-hotels', async (req, res) => {
    const { 
        q, 
        check_in_date, 
        check_out_date, 
        adults, 
        children, 
        currency, 
        gl, 
        hl 
    } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Missing required parameter: q' });
    }

    const options = {
        method: 'GET',
        url: 'https://hoteldiscoveryapi.p.rapidapi.com/api/hotels/destination/search',
        params: {
            q,
            check_in_date,
            check_out_date,
            adults,
            children,
            currency,
            gl,
            hl
        },
        headers: {
            'x-rapidapi-host': RAPIDAPI_HOST,
            'x-rapidapi-key': RAPIDAPI_KEY
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error('Full error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch hotel data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
