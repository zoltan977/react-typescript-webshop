import { apiEndpoints } from '../constants/apiEndpoints';
import { AppError } from '../errors/appError';
import { Product } from '../models/product.model';
import httpClient from '../utils/httpClient';
import serviceErrorHandler from '../utils/serviceErrorHandler';

const path = apiEndpoints.product;

export const getAll = async (): Promise<Product[] | AppError> => {
    return httpClient.get<Product[]>(`${path}/getAll`).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler);
};

export const get = async (id: string): Promise<Product | AppError> => {
    return httpClient.get<Product>(`${path}/get/${id}`).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler);
};

export const deleting = async (id: string): Promise<boolean | AppError> => {
    return httpClient.delete<boolean>(`${path}/delete/${id}`).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler);
};

export const update = async (dataToAPI: Product): Promise<Product | AppError> => {
    return httpClient.put<Product>(`${path}/update`, dataToAPI).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler);
};

export const add = async (dataToAPI: Product): Promise<Product | AppError> => {
    return httpClient.post<Product>(`${path}/add`, dataToAPI).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler);
};
