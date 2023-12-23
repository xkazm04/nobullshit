import axios from "axios";
import { TaskInput, TaskUpdate } from "../types/TrackerTypes";

const taskApi = axios.create({
    baseURL: "http://localhost:8000/tracker/task"
    });

export async function getAllTasks () {
    const response = await taskApi.get('/user/123e4567-e89b-12d3-a456-426614174000');
    return response.data;
  }

export async function getHabitTasks (habitId: string) {
    const response = await taskApi.get('/habit/' + habitId);
    return response.data;
}

export async function createTask (task: TaskInput) {
    const response = await taskApi.post('/', task);
    return response.data;
  }

export async function updateTaskState (update: TaskUpdate, id: string) {
    const response = await taskApi.put('/' + id, update);
    return response.data;
  }

