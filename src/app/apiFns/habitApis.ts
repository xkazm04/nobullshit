import axios from "axios";
import { HabitType } from "../types/TrackerTypes";


const habitsApi = axios.create({
    baseURL: "http://localhost:8000/tracker/habit"
    });

export async function getHabits () {
    const response = await habitsApi.get('/user/123e4567-e89b-12d3-a456-426614174000');
    return response.data;
  }

export async function getUserHabits (userId: string) {
  const response = await habitsApi.get('/user/'+userId);
  return response.data
}

export async function createHabit (habit: HabitType) {
    const response = await habitsApi.post('/', habit);
    return response.data;
  }

