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

// Hospitals endpoint
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

    const hospitalsWithDetails = await Promise.all(data.results.map(async (hospital) => {
      const details = await getPlaceDetails(hospital.place_id, API_KEY);
      return {
        ...hospital,
        waitingTime: Math.floor(Math.random() * (120 - 5 + 1)) + 5, // Random wait time
        phoneNumber: details.formatted_phone_number || 'N/A',
        website: details.website || 'N/A',
        openingHours: details.opening_hours ? details.opening_hours.weekday_text : 'No opening hours available'
      };
    }));

    res.json(hospitalsWithDetails);
  } catch (error) {
    console.error('Error fetching hospitals:', error.message);
    res.status(500).json({ error: 'Failed to fetch hospitals. Please try again later.' });
  }
});

// Pharmacies endpoint
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
        openingHours: details.opening_hours ? details.opening_hours.weekday_text : 'No opening hours available'
      };
    }));

    res.json(pharmaciesWithDetails);
  } catch (error) {
    console.error('Error fetching pharmacies:', error.message);
    res.status(500).json({ error: 'Failed to fetch pharmacies. Please try again later.' });
  }
});

// Doctors endpoint
app.get('/api/doctors', async (req, res) => {
  try {
    const { specialty, postcode } = req.query;
    const API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!specialty || !postcode) {
      return res.status(400).json({ error: 'Specialty and postcode are required' });
    }

    const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: `${specialty} doctors in Germany ${postcode}`,
        key: API_KEY,
      },
    });

    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: 'No doctors found for the provided specialty and postcode' });
    }

    const doctorsWithDetails = await Promise.all(data.results.map(async (doctor) => {
      const details = await getPlaceDetails(doctor.place_id, API_KEY);
      return {
        ...doctor,
        phoneNumber: details.formatted_phone_number || 'N/A',
        website: details.website || 'N/A',
        openingHours: details.opening_hours ? details.opening_hours.weekday_text : 'No opening hours available'
      };
    }));

    res.json(doctorsWithDetails);
  } catch (error) {
    console.error('Error fetching doctors:', error.message);
    res.status(500).json({ error: 'Failed to fetch doctors. Please try again later.' });
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