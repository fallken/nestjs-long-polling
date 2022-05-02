import { Module } from '@nestjs/common';
import { LongPollingService } from '@apps/shared/long-polling/long-polling.service';

@Module({
  providers: [LongPollingService],
  exports: [LongPollingService],
})
export class LongPollingModule {}
