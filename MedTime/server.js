import express from 'express'; // Import the Express framework for building web applications
import axios from 'axios'; // Import axios for making HTTP requests
import cors from 'cors'; // Import cors for handling Cross-Origin Resource Sharing
import dotenv from 'dotenv'; // Import dotenv for loading environment variables

dotenv.config(); // Load environment variables from a .env file into process.env

const app = express(); // Create an Express application
const port = 3001; // Define the port number on which the server will run

app.use(cors()); // Enable CORS for all routes

// Function to generate a random wait time between 5 and 120 minutes
const getRandomWaitTime = () => {
  // Math.random() generates a random decimal number between 0 (inclusive) and 1 (exclusive).
  // Multiplying this by 116 gives a range from 0 to just under 116.
  // Adding 5 shifts the range to between 5 and just under 121.
  // Math.floor() rounds down to the nearest whole number, resulting in a final range of 5 to 120.
  return Math.floor(Math.random() * (120 - 5 + 1)) + 5;
};

// Function to fetch detailed information about a place using its place ID
const getPlaceDetails = async (placeId, apiKey) => {
  try {
    const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: placeId,
        key: apiKey,
        fields: 'formatted_phone_number,website', // Fetch only the required fields: phone number and website
      },
    });
    return data.result; // Return the result part of the API response
  } catch (error) {
    console.error('Error fetching place details:', error.message); // Log the error message if the request fails
    return {}; // Return an empty object in case of an error
  }
};

// Endpoint to fetch hospitals based on postcode
app.get('/api/hospitals', async (req, res) => {
  try {
    const { postcode } = req.query; // Extract the postcode from the query parameters
    const API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY; // Get the Google Maps API key from environment variables

    if (!postcode) { // If postcode is not provided, send a 400 Bad Request response
      return res.status(400).json({ error: 'Postcode is required' });
    }

    // Make a request to the Google Places Text Search API to find hospitals in the specified postcode area
    const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: `hospitals in Germany ${postcode}`,
        key: API_KEY,
      },
    });

    if (!data.results || data.results.length === 0) { // If no results are found, send a 404 Not Found response
      return res.status(404).json({ error: 'No hospitals found for the provided postcode' });
    }

    // For each hospital, fetch additional details (phone number and website) and add a random waiting time
    const hospitalsWithDetails = await Promise.all(data.results.map(async (hospital) => {
      const details = await getPlaceDetails(hospital.place_id, API_KEY); // Fetch detailed information for the hospital
      return {
        ...hospital,
        waitingTime: getRandomWaitTime(), // Add a random waiting time to the hospital data
        phoneNumber: details.formatted_phone_number || 'N/A', // Add the phone number or 'N/A' if not available
        website: details.website || 'N/A', // Add the website or 'N/A' if not available
      };
    }));

    res.json(hospitalsWithDetails); // Send the detailed hospital data as the response
  } catch (error) {
    console.error('Error fetching hospitals:', error.message); // Log the error message if the request fails
    res.status(500).json({ error: 'Failed to fetch hospitals. Please try again later.' }); // Send a 500 Internal Server Error response
  }
});

// Endpoint to get the Google Maps API key
app.get('/api/maps-api-key', (req, res) => {
  const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY; // Get the Google Maps API key from environment variables
  
  if (!apiKey) { // If the API key is not available, send a 500 Internal Server Error response
    return res.status(500).json({ error: 'API key is not available' });
  }

  res.json({ apiKey }); // Send the API key as the response
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});