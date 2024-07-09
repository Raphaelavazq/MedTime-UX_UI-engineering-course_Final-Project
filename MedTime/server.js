import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const getPlaceDetails = async (placeId, apiKey) => {
  try {
    const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: placeId,
        key: apiKey,
        fields: 'formatted_phone_number,website,opening_hours',
      },
    });
    return data.result;
  } catch (error) {
    console.error('Error fetching place details:', error.message);
    return {};
  }
};

app.get('/api/pharmacies', async (req, res) => {
  try {
    const { postcode } = req.query;
    const API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!postcode) {
      return res.status(400).json({ error: 'Postcode is required' });
    }

    const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: `pharmacies in Germany ${postcode}`,
        key: API_KEY,
      },
    });

    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: 'No pharmacies found for the provided postcode' });
    }

    const pharmaciesWithDetails = await Promise.all(data.results.map(async (pharmacy) => {
      const details = await getPlaceDetails(pharmacy.place_id, API_KEY);
      return {
        ...pharmacy,
        phoneNumber: details.formatted_phone_number || 'N/A',
        website: details.website || 'N/A',
        openingHours: details.opening_hours || { weekday_text: [] },
      };
    }));

    res.json(pharmaciesWithDetails);
  } catch (error) {
    console.error('Error fetching pharmacies:', error.message);
    res.status(500).json({ error: 'Failed to fetch pharmacies. Please try again later.' });
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