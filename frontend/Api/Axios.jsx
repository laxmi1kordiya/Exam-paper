import axios from "axios";

const instance = axios.create({
  baseURL: "/apps/api/", // Replace with your actual Shopify app base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export function useAuthenticatedFetch() {
  try {
    return {
      get: async (url) => {
        // setAdminAuthHeader();
        const response = await instance.get(url);
        return response.data;
      },
      post: async (
        url,
        data,
        headers = { "Content-Type": "application/json" }
      ) => {
        instance.defaults.headers = {
          ...instance.defaults.headers,
          ...headers,
        };
        const response = await instance.post(url, data);
        return response.data;
      },
      put: async (url, data) => {
        setAdminAuthHeader();
        const response = await instance.put(url, data);
        return response.data;
      },
      delete: async (url) => {
        setAdminAuthHeader();
        const response = await instance.delete(url);
        return response.data;
      },
    };
  } catch (error) {
    console.log(error);
  }
}
