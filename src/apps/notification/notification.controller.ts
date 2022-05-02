import { AuthenticatedUser } from '@common/decorators/authenticated-user.decorator';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { CustomResponse } from '@common/interfaces/custom-response.interface';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';
import { AuthGuard } from '@common/guards/auth.guard';
import { EventEmitter2 } from 'eventemitter2';
import { NewSubscriberNotificationEvent } from '@common/events';
import { NewSubscriberDtoModel } from '@common/dto';

@Controller('notification')
export class NotificationController {
  public constructor(
    private notificationService: NotificationService,
    private eventEmitter: EventEmitter2,
  ) {}

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

  @Post('subscribe')
  @UseGuards(AuthGuard)
  subscribeToUser(
    @AuthenticatedUser() user: { id: string } | undefined,
    @Body() body: NewSubscriberDtoModel,
  ) {
    const newSubscriberEvent = new NewSubscriberNotificationEvent();
    newSubscriberEvent.userId = body.id;
    newSubscriberEvent.detail = {
      id: user.id,
      name: body.name,
    };
    this.eventEmitter.emit('new_subscriber_notification', newSubscriberEvent);

    return 'successfully added subscriber';
  }
}
