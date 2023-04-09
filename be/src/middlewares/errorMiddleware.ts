import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../exceptions/HttpException';

const errorMiddleware = (
	error: HttpException,
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	const { statusCode = StatusCodes.INTERNAL_SERVER_ERROR, message = 'Something went wrong', data } = error;
	console.error('errorMiddleWare:', statusCode, message, data, error);
	response.status(statusCode).send({
		message,
		statusCode,
		data,
	});
};

export default errorMiddleware;
