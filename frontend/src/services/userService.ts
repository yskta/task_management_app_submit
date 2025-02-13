import axios from 'axios';
import { User } from '../types/user';

const API_URL = process.env.REACT_APP_API_URL;

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
};