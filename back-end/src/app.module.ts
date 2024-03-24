import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthMiddlware } from './middlewares/auth.middleware';
import { CheckModule } from './check/check.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ergaibimhdi:9XVqS99WpwofPBOm@cluster0.rcbecml.mongodb.net/',
    ),
    UserModule,
    CheckModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddlware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
