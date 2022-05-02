import { AuthenticatedUser } from '@common/decorators/authenticated-user.decorator';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { CustomResponse } from '@common/interfaces/custom-response.interface';
import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';
import { AuthGuard } from '@common/guards/auth.guard';

@Controller('notification')
export class NotificationController {
  public constructor(private notificationService: NotificationService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(ResponseInterceptor)
  getNotifications(
    @Req() req: Request,
    @Res() res: CustomResponse,
    @AuthenticatedUser() user: { id: string } | undefined,
  ) {
    const connectionId: string = user.id ?? uuid();

    this.notificationService.addConnection(connectionId, res);

    req.socket.on('close', () => {
      this.notificationService.removeConnection(connectionId, res.id);
    });
  }
}
