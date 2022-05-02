import { Test, TestingModule } from '@nestjs/testing';
import { LongPollingService } from './long-polling.service';

describe('LongPollingService', () => {
  let service: LongPollingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LongPollingService],
    }).compile();

    service = module.get<LongPollingService>(LongPollingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
