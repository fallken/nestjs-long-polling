import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requestObj = context.switchToHttp().getRequest();
    if (requestObj.headers.user_id) {
      requestObj.user = {
        id: requestObj.headers.user_id,
      };
    }
    return true;
  }
}
