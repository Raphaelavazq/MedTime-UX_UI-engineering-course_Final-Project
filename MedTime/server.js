import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());

const getRandomWaitTime = () => {
  // Generate a random wait time between 5 and 120 minutes
  return Math.floor(Math.random() * (120 - 5 + 1)) + 5;
};

app.get('/api/hospitals', async (req, res) => {
  try {
    const { postcode } = req.query;
    const API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!postcode) {
      return res.status(400).json({ error: 'Postcode is required' });
    }

    const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: `hospitals in Germany ${postcode}`,
        key: API_KEY,
      },
    });

    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: 'No hospitals found for the provided postcode' });
    }

    const hospitalsWithWaitingTimes = data.results.map((hospital) => ({
      ...hospital,
      waitingTime: getRandomWaitTime(), // Assign a random waiting time
    }));

    console.log(hospitalsWithWaitingTimes); // Add this line to check the response
    res.json(hospitalsWithWaitingTimes);
  } catch (error) {
    console.error('Error fetching hospitals:', error.message);
    res.status(500).json({ error: 'Failed to fetch hospitals. Please try again later.' });
  }
});

app.get('/api/maps-api-key', (req, res) => {
  const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is not available' });
  }

  res.json({ apiKey });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});