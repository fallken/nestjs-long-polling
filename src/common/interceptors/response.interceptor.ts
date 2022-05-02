import { CustomResponse } from '@common/interfaces/custom-response.interface';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ResponseObj: CustomResponse = context.switchToHttp().getResponse();
    ResponseObj.id = uuid(); //adding a unique id to response object
    ResponseObj.setHeader('Content-type', 'text/html; charset=utf-8');
    ResponseObj.setHeader('Transfer-Encoding', 'chunked');
    ResponseObj.removeHeader('Content-Length');

    return next.handle();
  }
}
