import { Test, TestingModule } from '@nestjs/testing';
import { Clients } from './clients';

describe('Clients', () => {
  let provider: Clients;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Clients],
    }).compile();

    provider = module.get<Clients>(Clients);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
