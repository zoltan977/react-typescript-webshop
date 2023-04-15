import { UseFormSetError } from "react-hook-form";
import { FormError } from "../errors/formError";

const setFormErrors = (error: FormError, setError: UseFormSetError<any>) => {
    error.originalError.forEach((e: any) => {
        const constraints = Object.entries(e.constraints);
        for (const constraint of constraints) {
          setError(`${e.property}`, { type: `${constraint[0]}`, message: `${constraint[1]}`})
        }
    });
}

export default setFormErrors;