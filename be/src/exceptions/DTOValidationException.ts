import HttpException from './HttpException';
import { StatusCodes } from 'http-status-codes';
import { ErrorMessage } from '../constants/object/ErrorMessage';

export class DTOValidationException extends HttpException {
    constructor() {
        super(StatusCodes.BAD_REQUEST, ErrorMessage.DTO_VALIDATION_ERROR);
    }
}
