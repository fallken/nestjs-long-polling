import { LongPollingService } from '@apps/shared/long-polling/long-polling.service';
import { CustomResponse } from '@common/interfaces/custom-response.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  public constructor(private longPollingService: LongPollingService) {}

  public addConnection(id: string, res: CustomResponse) {
    this.longPollingService.addConnection(id, res);
    console.log('here is the list of connections');
    console.log(this.longPollingService.getConnection(id).length);
  }

  public removeConnection(id: string, responseId: string | undefined) {
    this.longPollingService.removeConnection(id, responseId);
    console.log('removed connections on the list');
    console.log(this.longPollingService.getConnection(id).length);
  }

  public sendMessage(key: string, payload: string) {
    return this.longPollingService.sendToConnections(key, payload);
  }
}
