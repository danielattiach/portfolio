import { GET_ACC } from './types';

export const getAcc = (user) => {
  return {
    type: GET_ACC,
    payload: user
  }
}
