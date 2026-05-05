import api from './api';
import { CreateCandidateRequest, RemoveCandidateRequest } from '../types';

export const candidateService = {
  createCandidate: async (data: CreateCandidateRequest): Promise<any> => {
    const response = await api.post('/create-candidate', data);
    return response.data;
  },

  removeCandidate: async (data: RemoveCandidateRequest): Promise<any> => {
    const response = await api.post('/remove-candidate', data);
    return response.data;
  },
};