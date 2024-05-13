import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {IMovie} from '@app/src/@types/common';

console.log(process.env.API_URL);

interface IApiClient {
  get(url: string): Promise<any>;
  post(url: string, body: any): Promise<any>;
  delete(url: string): Promise<any>;
}

class ApiClient implements IApiClient {
  private axiosInstance: AxiosInstance;

  constructor(url: string | undefined) {
    this.axiosInstance = axios.create({
      baseURL: url + '/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get(path: string): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(path);
      return response.data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async post(path: string, body: any) {
    try {
      const response: AxiosResponse = await this.axiosInstance.post(path, body);
      return response.data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async delete(path: string): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.delete(path);
      return response.data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }
}

const api = new ApiClient(process.env.API_URL as string);

export const getAllMovies = () => api.get('/movies') as Promise<IMovie[]>;

export const getAllMovieComments = (movieId: number) =>
  api.get(`/movies/${movieId}/comments`);

export const addMovieComment = (movieId: number, comment: string) => {
  return api.post(`/movies/${movieId}/comments`, {comment});
};

export const deleteMovieComment = (movieId: number, commentId: number) =>
  api.delete(`/movies/${movieId}/comments/${commentId}`);
