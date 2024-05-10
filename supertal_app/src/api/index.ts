// import {IUser} from '@app/src/@types/common';

import {IMovie} from '@app/src/@types/common';
import {AxiosResponse} from 'axios';

interface IApiClient {
  get(url: string): Promise<any>;
  post(url: string, body: any): Promise<any>;
}

class ApiClient implements IApiClient {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async get(path: string): Promise<any> {
    try {
      const response = await fetch(this.url + path);
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  async post(path: string, body: any) {
    try {
      const response = await fetch(this.url + path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
}

const api = new ApiClient('http://localhost:3000/api');

export const getAllMovies = () => api.get('/movies') as Promise<IMovie[]>;