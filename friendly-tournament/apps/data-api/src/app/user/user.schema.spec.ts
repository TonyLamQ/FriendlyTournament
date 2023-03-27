import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { validate, version } from 'uuid';

import { User, UserDocument, UserSchema } from "./user.schema";

describe('User Schema', () => {
  let mongod: MongoMemoryServer;
  let userModel: Model<UserDocument>;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            return {uri};
          },
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
      ],
    }).compile();

    userModel = app.get<Model<UserDocument>>(getModelToken('User'));

    // not entirely sure why we need to wait for this...
    // https://github.com/nodkz/mongodb-memory-server/issues/102
    await userModel.ensureIndexes();
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  it('has a required username', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.UserName.message).toEqual('Path `UserName` is required.');
  });

  it('has a unique username', async () => {
    const original = new userModel({UserName: 'henk', Email: 'henk@henk.nl', BirthDate: new Date() });
    const duplicate = new userModel({UserName: 'henk', Email: 'henk@henk.nl', BirthDate: new Date() });

    await original.save();

    await expect(duplicate.save()).rejects.toThrow();
  });

  it('has a required email address', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.Email).toBeInstanceOf(Error);
  });

  it('does not accept an invalid email address', () => {
    const model = new userModel({emailAddress: 'ditisgeenemail'});

    const err = model.validateSync();

    expect(err.errors.Email).toBeInstanceOf(Error);
  });

  it('has a required BirthDate', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.BirthDate).toBeInstanceOf(Error);
  });

  it('has a default value false for HasAGroup', () => {
    const model = new userModel({UserName: 'henk', Email: 'henk@henk.nl', BirthDate: new Date() });

    expect(model.HasAGroup).toBe(false);
  });

});