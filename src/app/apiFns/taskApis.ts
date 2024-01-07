import axios from "axios";
import { TaskInput, TaskUpdate } from "../types/TrackerTypes";

const taskApi = axios.create({
    baseURL: "http://localhost:8000/tracker/task"
    });

export async function getAllTasks (userId: string) {
    const response = await taskApi.get('/user/' + userId);
    return response.data;
  }

export async function getHabitTasks (habitId: string) {
    const response = await taskApi.get('/habit/' + habitId);
    return response.data;
}

export async function createTask (task: TaskInput) {
    const response = await taskApi.post('', task);
    return response.data;
  }

export async function updateTaskState (update: TaskUpdate, id: string) {
    const response = await taskApi.put('/' + id, update);
    return response.data;
  }

