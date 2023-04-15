import { UseFormSetError } from "react-hook-form";
import { FormError } from "../errors/formError";
import globalErrorHandler from "./globalErrorHandler";
import setFormErrors from "./setFormErrors";

export const handleFormErrors = (error: any, setError: UseFormSetError<any>) => {
    if (error instanceof FormError) {
      setFormErrors(error, setError)
    } else {
      globalErrorHandler(error);
    }
  }
