class HttpException extends Error {
    constructor(public statusCode: number, public message: string, public data?: any) {
        super(message);
    }
}

export default HttpException;
