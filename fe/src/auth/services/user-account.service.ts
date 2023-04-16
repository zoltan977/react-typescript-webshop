import { apiEndpoints } from "../../shared/constants/apiEndpoints";
import { AppError } from "../../shared/errors/appError";
import httpClient from "../../shared/utils/httpClient";
import serviceErrorHandler from "../../shared/utils/serviceErrorHandler";
import { UserAccountData } from "../models/user-account.model";

const path = apiEndpoints.userAccount;

export const add = async (dataToAPI: UserAccountData): Promise<AppError | UserAccountData> => {
    return httpClient.post<UserAccountData>(path + "/add", dataToAPI).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler);
}

export const getByUser = async (): Promise<UserAccountData | AppError> => {
    return httpClient.get<UserAccountData>(path + "/getByUser").then(response => Promise.resolve(response.data)).catch(serviceErrorHandler)
}

export const deleteCustomerName = async (customerNameId: string): Promise<UserAccountData | AppError> => {
    return httpClient.delete<UserAccountData>(path + "/customer-name/" + customerNameId).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler)
}

export const deleteDeliveryAddress = async (deliveryAddressId: string): Promise<UserAccountData | AppError> => {
    return httpClient.delete<UserAccountData>(path + "/delivery-address/" + deliveryAddressId).then(response => Promise.resolve(response.data)).catch(serviceErrorHandler)
}
