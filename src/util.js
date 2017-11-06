import axios from 'axios';

const API_URL = 'https://lb-file-upload-server.herokuapp.com/api';

async function get (name, data) {
  try {
    const result = await axios.get(`${API_URL}/${name}`);
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function post (name, body) {
  try {
    const result = await axios.post(`${API_URL}/${name}`, body);
    return result;
  } catch (e) {
    console.log(e.response);
    throw e.response;
  }
}

export {
  get,
  post
};
