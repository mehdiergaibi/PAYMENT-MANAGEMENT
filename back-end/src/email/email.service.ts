import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Check } from 'src/schemas/Check.schema';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize nodemailer transporter
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail'
      auth: {
        user: 'checkwise12@gmail.com',
        pass: 'bpfh erhx hbku wjcz',
      },
    });
  }
  async sendCheckDepositNotification(check: Check): Promise<void> {
    try {
        const htmlContent = `
        <h4>Hello,</h4>
        <h3>You have to depose your check with details:</h3>
        <h3>Number: ${check.CheckNumber}</h3>
        <h3>Amount: ${check.CheckAmount}</h3>
        <h3>Date: ${check.DepositDate}</h3>
        <h3>Client: ${check.ClientName}</h3>
        <h3>Status: ${check.DepositStatus}</h3>
        <h3>Bank: ${check.BankName}</h3>
        <h3>Regards,<br/>CheckWise</h3>
      `;
      // Define email content
      const mailOptions: nodemailer.SendMailOptions = {
        from: 'checkwise603@gmail.com',
        to: 'ergaibi.mhdi@gmail.com',
        subject: 'Check Deposit Reminder',
        text: htmlContent,
      };

      // Send email
      await this.transporter.sendMail(mailOptions);
      console.log(
        `Email sent to ergaibi.mhdi@gmail.com for check with number ${check.CheckNumber}`,
      );
    } catch (error) {
      console.error(
        `Failed to send email to ergaibi.mhdi@gmail.com for check with number ${check.CheckNumber}`,
        error,
      );
      throw new Error(
        `Failed to send email to ergaibi.mhdi@gmail.com for check with number ${check.CheckNumber}`,
      );
    }
  }
}
