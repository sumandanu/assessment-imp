import axios from 'axios';
import { getToken, removeToken } from './auth';
import {
    AuthResponse,
    LoginCredentials,
    Post,
    RegisterCredentials,
    User,
} from '@/types';
import { redirect } from 'next/navigation';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token?.value}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeToken();
            redirect('/signin');
            // window.location.href = '/signin';
        }
        return Promise.reject(error);
    },
);

export const authAPI = {
    login: (credentials: LoginCredentials) =>
        api.post<AuthResponse>('/login', credentials),
    register: (credentials: RegisterCredentials) =>
        api.post<AuthResponse>('/register', credentials),
    logout: () => api.post('/logout'),
    getUser: () => api.get<User>('/user'),
};

export const postsAPI = {
    getAll: (page: number) => api.get<Post[]>(`/posts?page=${page}`),
    getById: (id: number) => api.get<Post>(`/posts/${id}`),
    create: (data: { title: string; content: string }) =>
        api.post<Post>('/posts', data),
    update: (id: number, data: { title: string; content: string }) =>
        api.put<Post>(`/posts/${id}`, data),
    delete: (id: number) => api.delete(`/posts/${id}`),
};

export default api;
