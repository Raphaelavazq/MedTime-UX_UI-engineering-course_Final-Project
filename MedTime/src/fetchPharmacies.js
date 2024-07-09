import axios from 'axios';

const fetchPharmacies = async (postcode) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/api/pharmacies`, {
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
      phoneNumber: place.phoneNumber,
      website: place.website,
      openingHours: place.openingHours.weekday_text, // Include opening hours
    }));
  } catch (error) {
    console.error('Error fetching pharmacies:', error);
    throw error;
  }
};

export default fetchPharmacies;