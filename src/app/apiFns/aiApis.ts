import axios from "axios";
const aiApi = axios.create({
        baseURL: "http://localhost:8000/tracker/ai"
    });

export async function getUserRecommendation (user: string) {
    const response = await aiApi.get(`/user/${user}`);
    return response.data;
  }

export async function getHabitRecommendation (habit: string) {
    const response = await aiApi.get(`/${habit}`);
    return response.data;
}
