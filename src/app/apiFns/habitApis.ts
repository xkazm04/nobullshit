import axios from "axios";
import { HabitType } from "../types/TrackerTypes";
import { openDB } from 'idb';


const habitsApi = axios.create({
    baseURL: "http://localhost:8000/tracker/habit"
    });

export async function getHabits (userId: string) {
    const response = await habitsApi.get('/user/'+ userId);
    return response.data;
  }

  export async function fetchHabits(userId: string) {
    try {
        const response = await habitsApi.get('/user/' + userId);
        // Store data in IndexedDB for offline use
        const db = await openDB('offDb', 1, {
            upgrade(db) {
                db.createObjectStore('habits');
            },
        });
        await db.put('habits', response.data, userId);
        return response.data;
    } catch (error) {
        // If network request fails, try to get the data from IndexedDB
        const db = await openDB('offDb', 1);
        const cachedData = await db.get('habits', userId);
        if (cachedData) {
            return cachedData;
        } else {
            throw error;
        }
    }
}

export async function getUserHabits ({userId,day}: {userId: string, day: string}) {
  const response = await habitsApi.get('/user/'+userId +'/daily/'+day);
  return response.data
}

export async function createHabit (habit: HabitType) {
    const response = await habitsApi.post('/', habit);
    return response.data;
  }

