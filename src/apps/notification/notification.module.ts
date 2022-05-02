import { Module } from '@nestjs/common';
import { NotificationController } from '@apps/notification/notification.controller';
import { NotificationService } from '@apps/notification/notification.service';
import { LongPollingModule } from '@apps/shared/long-polling/long-polling.module';

@Module({
  imports: [LongPollingModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
