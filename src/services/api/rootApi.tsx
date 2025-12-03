import axios from "axios";

const rootApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOCK_API,
});

export default rootApi;
