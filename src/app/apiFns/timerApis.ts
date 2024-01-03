import axios from "axios";


type CountdownInput = {
    user_id: string;
    countdown: number;
}

type CountdownPauseInput = {
    countdown: number;
    paused_at: number;
} 

const taskApi = axios.create({
    baseURL: "http://localhost:8000/tracker/countdown"
});

export async function getUserCountdown (userId: string) {
    const response = await taskApi.get('/user/' + userId);
    return response.data;
}

export async function createCountdown (countdown: CountdownInput) {
    const response = await taskApi.post('/', countdown);
    return response.data;
}

export async function updateCountdown (update: number, id: string) {
    const response = await taskApi.put('/' + id, update);
    return response.data;
}

export async function finishCountdown (id: string) {
    const response = await taskApi.put('/' + id + '/finish');
    return response.data;
}

export async function pauseCountdown (id: string, data: CountdownPauseInput) {
    const response = await taskApi.put('/' + id + '/pause', data);
    return response.data;
}


