export interface User {
  id ?: string;
  name ?: string;
  emailId: string;
  roleId ?: string;
  role ?: UserRole;
}

export interface LoginResponse {
  status: string;
  token: string;
  email: string;
  message: string;
  roleId: number;
  name: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
  userId: number;
}

export interface LoginRequest {
  emailId: string;
  password: string;

}
export interface ResultsResponse{
  candidateName: string;
  votes:number;
  role?: UserRole;
}
export interface RegisterRequest {
  name: string;
  emailId: string;
  password: string;
  roleId: number;
}

export interface Candidate {
  id: string;
  name: string;
  userId: string;
}

export interface StartElectionRequest{
   electionId:string;
}

export interface CandidateView{
   id: string;
   userId:string;
   name: string;
}

export interface VoteRequest {
  candidateId: number;
  electionId: number;
}

export interface CreateCandidateRequest {
  userId: string;
}

export interface RemoveCandidateRequest {
  candidateId: string;
}

export interface StopElectionRequest {
  electionId: string;
}

export type UserRole = 'VOTER' | 'CANDIDATE' | 'ADMIN' | 'COORDINATOR';

export const ROLE_IDS = {
  VOTER: 1,
  CANDIDATE: 2,
  ADMIN: 3,
  COORDINATOR: 4
};

export const ROLE_NAMES: Record<string, UserRole> = {
  '1': 'VOTER',
  '2': 'CANDIDATE',
  '3': 'ADMIN',
  '4': 'COORDINATOR'
};
