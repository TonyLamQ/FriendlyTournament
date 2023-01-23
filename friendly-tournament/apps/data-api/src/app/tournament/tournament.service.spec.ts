import { Test } from '@nestjs/testing';

// import { getModelToken, MongooseModule } from '@nestjs/mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import { disconnect, Model } from 'mongoose';
// import { MongoClient } from 'mongodb';

import { TournamentService } from './tournament.service';
// import { User, UserDocument, UserSchema } from './user.schema';
// import { Meetup, MeetupDocument, MeetupSchema } from '../meetup/meetup.schema';

describe('TournamentService', () => {
  let service: TournamentService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TournamentService],
    }).compile();

    service = app.get<TournamentService>(TournamentService);
  });

  // describe('getData', () => {
  //   it('should return "Welcome to data-api!"', () => {
  //     expect(service.getData()).toEqual({ message: 'Welcome to data-api!' });
  //   });
  // });

});
