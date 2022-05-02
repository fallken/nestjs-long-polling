import { NotificationModule } from '@apps/notification/notification.module';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
