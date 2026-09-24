import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";



@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.log('🔥 EXCEPTION FILTER ACTIVADO');
        console.log(exception);
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()

        if(exception instanceof HttpException){
        const status = exception.getStatus()
        const exceptionResponse = exception.getResponse()
        response.status(status).json({
            statusCode: status,
            message: exceptionResponse,
            path: request.url
        })
        }
        
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server error, Checks Logs.',
            path: request.url
        })


    }
}