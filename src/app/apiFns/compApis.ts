import axios from "axios";

import { CompType } from "../types/TrackerTypes";

const compApi = axios.create({
    baseURL: "http://localhost:8000/tracker/completion"
    });


export async function getCompletion (habitId: string) {
  const response = await compApi.get('/habit/'+habitId);
  return response.data
}

export async function createCompletion (completion: CompType) {
    const response = await compApi.post('/', completion);
    return response.data;
  }

