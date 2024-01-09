import axios from "axios";


const commonApi = axios.create({
    baseURL: "http://localhost:8000"
    });

export async function getCategories () {
    const response = await commonApi.get('/categories');
    return response.data;
  }

export async function getStats (habitId: string) {
    const response = await commonApi.get('/tracker/stats/'+habitId);
    return response.data;
  }