import api from './api';

const ELECTION_ID = '1';  

export const dashboardService = {

  getCandidateCount: async (): Promise<number> => {
    const response = await api.get<number>('/candidates/count');
    return response.data;
  },

  getTotalVotes: async (): Promise<number> => {
    const response = await api.get<number>(`/totalvotes`);
    return response.data;
  },

  getElectionStatus: async (): Promise<boolean> => {
    const response = await api.get<boolean>(`/election/status/${ELECTION_ID}`);
    return response.data; // true = ongoing, false = stopped
  },

};