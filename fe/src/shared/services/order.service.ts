import { apiEndpoints } from '../constants/apiEndpoints';
import { AppError } from '../errors/appError';
import httpClient from '../utils/httpClient';
import serviceErrorHandler from '../utils/serviceErrorHandler';
import { OrderDataFromAPI, OrderFormModel } from '../models/order.model';

const path = apiEndpoints.order;

export const getAllByUser = async (): Promise<OrderDataFromAPI[] | AppError> => {
    return httpClient.get<OrderDataFromAPI[]>(`${path}/getAllByUser`).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler);
};

export const getAll = async (): Promise<OrderDataFromAPI[] | AppError> => {
    return httpClient.get<OrderDataFromAPI[]>(`${path}/getAll`).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler);
};

export const get = async (id: string): Promise<OrderDataFromAPI | AppError> => {
    return httpClient.get<OrderDataFromAPI>(`${path}/get/${id}`).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler);
};

export const remove = async (id: string): Promise<boolean | AppError> => {
    return httpClient.delete<boolean>(`${path}/delete/${id}`).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler);
};

export const add = async (dataToAPI: OrderFormModel): Promise<OrderDataFromAPI | AppError> => {
    return httpClient.post<OrderDataFromAPI>(`${path}/add`, dataToAPI).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler);
};

export const update = async (dataToAPI: {_id: string, newStatus: string}): Promise<OrderDataFromAPI | AppError> => {
    return httpClient.put<OrderDataFromAPI>(`${path}/update`, dataToAPI).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler);
};
