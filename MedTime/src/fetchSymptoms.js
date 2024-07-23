import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; 

export const fetchChatbotResponse = async (message) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/chatbot`, { message });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching chatbot response:', error.message);
    throw new Error('Failed to fetch chatbot response. Please try again later.');
  }
};