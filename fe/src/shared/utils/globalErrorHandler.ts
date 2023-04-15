import { toast } from "react-toastify";
import { logout } from "../../auth/services/auth.service";
import { routes } from "../constants/routes";
import { CredentialsError } from "../errors/credentialsError";
import history from './history';

const globalErrorHandler = (error: any, errorInfo?: any) => {
    if (error instanceof CredentialsError) {
        toast.error(`Global errorhandler: ${error.originalError.message}`);
        history.push(routes.login);
        logout();
    } else {
        toast.error(`Global errorhandler: ${error.response?.data?.message}`)
        console.log(`Global errorhandler errorInfo: `, errorInfo)
        console.log(`Global errorhandler error: `, error)
    }
}

export default globalErrorHandler;