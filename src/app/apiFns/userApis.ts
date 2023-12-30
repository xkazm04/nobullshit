import axios from "axios";
import { UserType } from "../types/TrackerTypes";


const usersApi = axios.create({
        baseURL: "http://localhost:8000/user"
    });

export async function getMe (email: string) {
    const response = await usersApi.get(`/${email}`);
    return response.data;
  }

export async function registerUser (user: UserType) {
    const response = await usersApi.post('/register', user);
    return response.data;
  }

