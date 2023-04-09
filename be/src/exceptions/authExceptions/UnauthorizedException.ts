import HttpException from '../HttpException';
import { StatusCodes } from 'http-status-codes';
import { ErrorMessage } from '../../constants/object/ErrorMessage';

export class UnauthorizedException extends HttpException {
    constructor() {
        super(StatusCodes.UNAUTHORIZED, ErrorMessage.UNAUTHORIZED);
    }
}
