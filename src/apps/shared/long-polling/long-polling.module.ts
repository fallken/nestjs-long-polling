import { Module } from '@nestjs/common';
import { LongPollingService } from '@apps/shared/long-polling/long-polling.service';

@Module({
  providers: [LongPollingService],
})
export class LongPollingModule {}
