import api from './api';
import { VoteRequest , CandidateView} from '../types';

export const voteService = {
  addVote: async (data: VoteRequest): Promise<any> => {
    const response = await api.post('/addvote', data);
    return response.data;
  },

  getCandidates: async (): Promise<CandidateView[]> => {
    const response = await api.get('/get/candidates');
    return response.data;
  },
};