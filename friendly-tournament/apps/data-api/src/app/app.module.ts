import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from '../constants';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TokenMiddleware } from './auth/token.middleware';
import { GroupController } from './group/group.controller';
import { GroupModule } from './group/group.module';
import { InviteModule } from './invite/invite.module';
import { TournamentController } from './tournament/tournament.controller';
import { TournamentModule } from './tournament/tournament.module';
import { UserModule } from './user/user.module';
import { Neo4jModule } from 'nest-neo4j';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    TournamentModule,
    GroupModule,
    AuthModule,
    AuthModule,
    UserModule,
    InviteModule,
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: process.env.NEO4J_HOST,
      port: 7687,
      username: 'neo4j',
      password: process.env.NEO4J_PASSWORD,

    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware)
      .forRoutes(
        GroupController,
        TournamentController
      );
  }
}
// export class AppModule{}
