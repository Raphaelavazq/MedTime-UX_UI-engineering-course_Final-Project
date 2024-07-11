import axios from 'axios';

const fetchDoctors = async (specialty, postcode) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/api/doctors`, {
      params: {
        specialty,
        postcode,
      },
    });

    return data.map((place) => ({
      name: place.name,
      address: place.formatted_address,
      location: place.geometry.location,
      phoneNumber: place.formatted_phone_number,
      website: place.website,
      openingHours: place.opening_hours ? place.opening_hours.weekday_text : 'No opening hours available',
    }));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export default fetchDoctors;