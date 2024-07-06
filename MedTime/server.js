import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/hospitals', async (req, res) => {
  try {
    const { postcode } = req.query;
    const API_KEY = 'AIzaSyAIlt680yFdvfn7owLo0ewwQ1mQoGKxbvQ';
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
      params: {
        query: `hospitals in Germany ${postcode}`,
        key: API_KEY,
      },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});