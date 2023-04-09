import HttpException from '../HttpException';
import { StatusCodes } from 'http-status-codes';
import { ErrorMessage } from '../../constants/object/ErrorMessage';

export class NoJWTsecretException extends HttpException {
    constructor() {
        super(StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessage.NO_JWT_SECRET);
    }
}
