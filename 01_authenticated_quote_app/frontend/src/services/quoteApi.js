import { interceptedApi } from "./api";

export const getQuote = async () => {
  try {
    const response = await interceptedApi.get("/quote");
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
