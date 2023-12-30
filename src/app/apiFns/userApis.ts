import axios from "axios";
import { UserType } from "../types/TrackerTypes";


const usersApi = axios.create({
        baseURL: "http://localhost:8000/user"
    });

export async function getMe () {
    const response = await usersApi.get('/user/123e4567-e89b-12d3-a456-426614174000');
    return response.data;
  }

export async function registerUser (user: UserType) {
    const response = await usersApi.post('/register', user);
    return response.data;
  }

