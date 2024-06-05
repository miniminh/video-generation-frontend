import axios from 'axios';

const API_BASE_URL = 'http://135.134.247.224:40072';

export const generateScripts = (prompt) => {
  return axios.post(`${API_BASE_URL}/generate-scripts/`, {
    prompt,
    timestamp: 'test'
  });
};

export const generateAudio = (prompt) => {
  return axios.post(`${API_BASE_URL}/generate-audio/`, {
    prompt,
    timestamp: 'test'
  });
};

export const generateImages = (prompt) => {
  return axios.post(`${API_BASE_URL}/generate-images/`, {
    prompt,
    timestamp: 'test'
  });
};

export const composeVideo = () => {
  return axios.post(`${API_BASE_URL}/compose-video/`, {
    timestamp: 'test'
  });
};

export const getAudioResult = (timestamp) => {
  return `${API_BASE_URL}/get-audio-result?timestamp=${timestamp}`;
};


export const getVideoResult = (timestamp) => {
  return `${API_BASE_URL}/get-video-result?timestamp=${timestamp}`;
};

export const getImageResult = (timestamp, image) => {
  return `${API_BASE_URL}/get-image-result?timestamp=${timestamp}&image=${image}`;
};