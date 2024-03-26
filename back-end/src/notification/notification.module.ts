import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CheckModule } from 'src/check/check.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports:[CheckModule, EmailModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
