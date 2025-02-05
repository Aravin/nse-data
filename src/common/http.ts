import { config } from "../common/config";

const handleError = (error: any) => {
  const message = error.response 
    ? `Response error: ${error.response.status} - ${error.response.data}`
    : error.request 
    ? `Request error: ${error.request}`
    : `Error: ${error.message}`;

  console.error(message);
  console.error("Config:", error.config);
  console.error("Full error details:", JSON.stringify(error, null, 2)); // Log full error details
  throw new Error('Error generating response, please retry!');
};

export const get = async (url: string): Promise<any> => {
  try {
    const response = await fetch(`${config.baseURL || "https://www.nseindia.com/api"}${url}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); // Assuming the response is JSON
  } catch (error) {
    handleError(error);
  }
};