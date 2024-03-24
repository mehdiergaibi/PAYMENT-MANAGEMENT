import { Test, TestingModule } from '@nestjs/testing';
import { Check } from './check';

describe('Check', () => {
  let provider: Check;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Check],
    }).compile();

    provider = module.get<Check>(Check);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
