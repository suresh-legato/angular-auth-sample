import { RegisterRequest } from '../requestPayload/registerRequest';

export type RegisterResponse = {
  id: number;
} & RegisterRequest;
