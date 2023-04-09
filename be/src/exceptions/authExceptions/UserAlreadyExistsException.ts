import HttpException from '../HttpException';
import { StatusCodes } from 'http-status-codes';
import { ErrorMessage } from '../../constants/object/ErrorMessage';

export class UserAlreadyExistsException extends HttpException {
    constructor() {
        super(StatusCodes.BAD_REQUEST, ErrorMessage.USER_EMAIL_ALREADY_EXISTS);
    }
}
