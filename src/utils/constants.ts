export const API_BASE_URL = "https://admin.thetoyfair.eu/api";

export const API_ENDPOINTS = {
  GET_BRANDS: `${API_BASE_URL}/brands`,
  ADD_BRAND: `${API_BASE_URL}/brands/add`,
  EDIT_BRAND: (brandId: string) => `${API_BASE_URL}/brands/edit/${brandId}`,
  SEARCH_BRANDS: `${API_BASE_URL}/brands/search`,
  GET_EXHIBITORS: `${API_BASE_URL}/brands/exhibitor/display`,
  ADD_EXHIBITOR: `${API_BASE_URL}/brands/exhibitor/add`,
};

export const DEFAULT_IMAGE_URL = "https://via.placeholder.com/150";

export const APP_ROUTES = {
  HOME: "/",
  ADMIN: "/admin",
};

export const MESSAGES = {
  FETCH_ERROR: "Failed to fetch data. Please try again later.",
  NO_RESULTS: "No matching brands found.",
  LOADING: "Loading, please wait...",
};
