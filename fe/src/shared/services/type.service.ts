import { apiEndpoints } from "../constants/apiEndpoints";
import { AppError } from "../errors/appError";
import httpClient from "../utils/httpClient";
import serviceErrorHandler from "../utils/serviceErrorHandler";

export interface ICategory {
    name: string;
    displayName: string;
  }

const path = apiEndpoints.type;

export const getCategoryList = async (): Promise<ICategory[] | AppError> => {
    return httpClient.get<ICategory[]>(`${path}/category`).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler);
};
