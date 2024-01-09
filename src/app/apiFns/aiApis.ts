import axios from "axios";
const aiApi = axios.create({
        baseURL: "http://localhost:8000/tracker"
    });

export async function getUserRecommendation (user: string) {
    const response = await aiApi.get(`/user/${user}`);
    return response.data;
  }

export async function getHabitTaskRecommendation (habit: string) {
    const response = await aiApi.get(`/ai/${habit}`);
    return response.data;
}

export async function getHabitRecommendation (habit: string) {
    const response = await aiApi.get(`/aihabit/${habit}`);
    return response.data;
}