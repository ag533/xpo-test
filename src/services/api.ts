import axios from "axios";

const BASE_URL = "https://admin.thetoyfair.eu/api";

export const fetchBrands = async () => {
  const response = await axios.get(`${BASE_URL}/brands`);
  console.log(response.data['data'])
  return response.data['data'];
};

export const addBrand = async (brandData: any) => {
  return await axios.post(`${BASE_URL}/brands/add`, brandData);
};

export const editBrand = async (brandId: string, brandData: any) => {
  return await axios.post(`${BASE_URL}/brands/edit/${brandId}`, brandData);
};

export const searchBrands = async (queryParams: any) => {
  const queryString = new URLSearchParams(queryParams).toString();
  console.log(queryString)
  const response = await axios.get(`${BASE_URL}/brands/search?${queryString}`);
  return response.data['brands'];
};

export const addExhibitor = async (exhibitorData: any) => {
  return await axios.post(`${BASE_URL}/brands/exhibitor/add`, exhibitorData);
};

export const fetchExhibitors = async () => {
  const response = await axios.get(`${BASE_URL}/brands/exhibitor/display`);
  return response.data['data'];
};

export const editExhibitor = async (exhibitorId: string, exhibitorData: any) => {
  return await axios.post(`${BASE_URL}/brands/exhibitor/edit/${exhibitorId}`, exhibitorData);
};