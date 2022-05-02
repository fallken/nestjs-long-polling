import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from '@apps/app.controller';
import { AppService } from '@apps/app.service';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
