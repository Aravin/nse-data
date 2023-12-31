import axios from "axios";
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry';

// Exponential back-off retry delay between requests
axiosRetry(
  axios,
  {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => error.response?.status === 401 || isNetworkOrIdempotentRequestError(error),
  }
);

export const get = async (url: string) => {
  try {
    const response = await axios.get(url);

    return response?.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);

    throw new Error('Error generating response, please retry!')
  }
};
