import { LongPollingService } from '@apps/shared/long-polling/long-polling.service';
import { NewSubscriberNotificationEvent } from '@common/events';
import { CustomResponse } from '@common/interfaces/custom-response.interface';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationService {
  public constructor(private longPollingService: LongPollingService) {}

  public addConnection(id: string, res: CustomResponse) {
    this.longPollingService.addConnection(id, res);
  }

  public removeConnection(id: string, responseId: string | undefined) {
    this.longPollingService.removeConnection(id, responseId);
  }

  public sendMessage(key: string, payload: any) {
    return this.longPollingService.sendToConnections(
      key,
      JSON.stringify(payload),
    );
  }

  @OnEvent('new_subscriber_notification')
  private notifyConnections(payload: NewSubscriberNotificationEvent) {
    this.sendMessage(payload.userId, payload.detail);
  }
}
