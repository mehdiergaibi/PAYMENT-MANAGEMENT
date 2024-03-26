import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthMiddlware } from './middlewares/auth.middleware';
import { CheckModule } from './check/check.module';
import { ClientsModule } from './clients/clients.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from './email/email.module';
import { NotificationModule } from './notification/notification.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URL,
    ),
    UserModule,
    CheckModule,
    ClientsModule,
    EmailModule,
    ScheduleModule.forRoot(),
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddlware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
