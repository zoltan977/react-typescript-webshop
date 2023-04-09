import HttpException from '../HttpException';
import { StatusCodes } from 'http-status-codes';
import { ErrorMessage } from '../../constants/object/ErrorMessage';

export class InvalidCredentialsException extends HttpException {
    constructor() {
        super(StatusCodes.UNAUTHORIZED, ErrorMessage.INVALID_CREDENTIALS);
    }
}
