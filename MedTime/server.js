import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3001;

app.use(cors());

// Endpoint to fetch hospitals based on postcode
app.get('/api/hospitals', async (req, res) => {
  try {
    const { postcode } = req.query;
    const API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
      params: {
        query: `hospitals in Germany ${postcode}`,
        key: API_KEY,
      },
    });

    if (!data.results || data.results.length === 0) {
      throw new Error('No results found');
    }

    res.json(data.results);
  } catch (error) {
    console.error('Error fetching hospitals:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get the Google Maps API key
app.get('/api/maps-api-key', (req, res) => {
  res.json({ apiKey: process.env.VITE_GOOGLE_MAPS_API_KEY });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});