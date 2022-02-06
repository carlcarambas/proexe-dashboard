import axios from 'axios';

const makeAPIRequest = async (method, endPoint, data) => {
  let result = null;
  try {
    switch (method) {
      case 'get':
        result = await axios.get(`${endPoint}`);
        break;
      case 'delete':
        result = await axios.delete(`${endPoint}`);
        break;
      case 'post':
        result = await axios.post(`${endPoint}`, data);
        break;
      case 'put':
        result = await axios.put(`${endPoint}`, data);
        break;
      default:
        result = { message: 'Unknow method.' };
    }

    return result.data;
  } catch (error) {
    const message = error.response?.data.message;
    return { error: true, message };
  }
};

export default makeAPIRequest;
