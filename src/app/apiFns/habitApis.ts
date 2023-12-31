import axios from "axios";
import { HabitType } from "../types/TrackerTypes";


const habitsApi = axios.create({
    baseURL: "http://localhost:8000/tracker/habit"
    });

export async function getHabits (userId: string) {
    const response = await habitsApi.get('/user/'+ userId);
    return response.data;
  }

export async function getUserHabits ({userId,day}: {userId: string, day: string}) {
  const response = await habitsApi.get('/user/'+userId +'/daily/'+day);
  return response.data
}

export async function createHabit (habit: HabitType) {
    const response = await habitsApi.post('/', habit);
    return response.data;
  }

