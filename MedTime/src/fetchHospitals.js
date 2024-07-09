import axios from 'axios';

const fetchHospitals = async (postcode) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/api/hospitals`, {
      params: {
        postcode,
      },
    });

    return data.map((place) => ({
      name: place.name,
      address: place.formatted_address,
      location: place.geometry.location,
      rating: place.rating,
      userRatingsTotal: place.user_ratings_total,
      waitingTime: place.waitingTime, // Include waiting time
    }));
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    throw error;
  }
};

export default fetchHospitals;