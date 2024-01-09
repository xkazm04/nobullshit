import axios from "axios";


const commonApi = axios.create({
    baseURL: "http://localhost:8000/categories"
    });

export async function getCategories () {
    const response = await commonApi.get('');
    return response.data;
  }

