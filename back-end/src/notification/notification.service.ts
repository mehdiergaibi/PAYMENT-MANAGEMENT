import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CheckService } from 'src/check/check.service';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class NotificationService {

    constructor(
        private readonly checkService: CheckService,
        private readonly emailService: EmailService,
      ) {}

      @Cron(CronExpression.EVERY_DAY_AT_6PM)
  async sendCheckDepositNotifications() {
    // Get checks due for deposit in the next 3 days
    const checksDueForDeposit = await this.checkService.findChecksForDeposit(3);

    // Send email notifications to users for each check due for deposit
    for (const check of checksDueForDeposit) {
      await this.emailService.sendCheckDepositNotification(check);
    }
  }

}
