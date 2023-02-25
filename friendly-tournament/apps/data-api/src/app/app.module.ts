import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from '../constants';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TokenMiddleware } from './auth/token.middleware';
import { GroupController } from './group/group.controller';
import { GroupModule } from './group/group.module';
import { TournamentController } from './tournament/tournament.controller';
import { TournamentModule } from './tournament/tournament.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION),
    TournamentModule,
    GroupModule,
    AuthModule,
    AuthModule,
    UserModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) : void {
      consumer.apply(TokenMiddleware)
      .forRoutes(
        GroupController,
        TournamentController
      );
  }
}
