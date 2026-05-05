import api from './api';
import { StopElectionRequest , ResultsResponse,StartElectionRequest} from '../types';

const ELECTION_ID = '1';  
export const adminService = {
  startElection: async (data: StartElectionRequest): Promise<any> => {
    const response = await api.post('/start-election', data);
    return response.data;
  },

  stopElection: async (data: StopElectionRequest): Promise<any> => {
    const response = await api.post('/stop-election', data);
    return response.data;
  },

  getResults: async (): Promise<ResultsResponse[]> => {
     const response = await api.get(`/results/${ELECTION_ID}`);
     console.log("Elections Result response",response);
     return response.data;
  },

  getElectionStatus: async (id: string) => {
  const res = await api.get(`/election/status/${id}`);
  return res.data; 
  }
};