import api from './api';
import { LoginRequest, RegisterRequest, LoginResponse , RegisterResponse} from '../types';

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};