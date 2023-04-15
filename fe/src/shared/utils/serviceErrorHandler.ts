import { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/appError";
import { CredentialsError } from "../errors/credentialsError";
import { FormError } from "../errors/formError";

const serviceErrorHandler = (error: AxiosError<any>): Promise<AppError | FormError | CredentialsError> => {
    console.log("serviceErrorHandler: ", error)
    let FEerror;
    if (error.response?.data?.data?.errorsInPostedData && error.response.data.statusCode === StatusCodes.BAD_REQUEST) {
      FEerror = new FormError(error.response.data.data.errorsInPostedData);
    } else if (error.response?.data.statusCode === StatusCodes.UNAUTHORIZED) {
      FEerror = new CredentialsError(error.response?.data)
    } else {
      FEerror = new AppError(error.response?.data);
    }

    return Promise.reject(FEerror);
}

export default serviceErrorHandler;