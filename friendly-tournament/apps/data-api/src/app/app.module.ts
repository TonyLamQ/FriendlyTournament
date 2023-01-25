import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from '../constants';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './group/group.module';
import { WorkoutModule } from './tournament/tournament.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION),
    WorkoutModule,
    GroupModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
