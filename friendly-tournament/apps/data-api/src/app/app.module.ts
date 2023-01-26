import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from '../constants';
import { environment } from '../environments/environment'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './group/group.module';
import { TournamentModule } from './tournament/tournament.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION),
    TournamentModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
