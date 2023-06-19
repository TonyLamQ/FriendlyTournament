import { Test } from '@nestjs/testing';

import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model, disconnect } from 'mongoose';
import { MongoClient } from 'mongodb';

import { GroupService } from './group.service';
import { User, UserSchema, UserDocument } from '../user/user.schema';
import { Group, GroupDocument, GroupSchema } from './group.schema';
import { IGroup, IUser } from '@friendly-tournament/data/models';
import { BadRequestException, HttpException } from '@nestjs/common';
import { InviteDocument, InviteSchema } from '../invite/invite.schema';
import { TournamentDocument, TournamentSchema } from '../tournament/tournament.schema';

describe('GroupService', () => {
    let service: GroupService;
    let mongod: MongoMemoryServer;
    let mongoc: MongoClient;

    let groupModel: Model<GroupDocument>;
    let userModel: Model<UserDocument>;
    let inviteModel: Model<InviteDocument>;
    let tournamentModel: Model<TournamentDocument>;

    beforeAll(async () => {
        let uri: string;

        const app = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        mongod = await MongoMemoryServer.create();
                        uri = mongod.getUri();
                        return { uri };
                    },
                }),
                MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
                MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
                MongooseModule.forFeature([{ name: 'Invite', schema: InviteSchema }]),
                MongooseModule.forFeature([{ name: 'Tournament', schema: TournamentSchema }]),
            ],
            providers: [GroupService],
        }).compile();

        service = app.get<GroupService>(GroupService);

        groupModel = app.get<Model<GroupDocument>>(getModelToken('Group'));
        userModel = app.get<Model<UserDocument>>(getModelToken('User'));
        inviteModel = app.get<Model<InviteDocument>>(getModelToken('Invite'));
        tournamentModel = app.get<Model<TournamentDocument>>(getModelToken('Tournament'));

        // not entirely sure why we need to wait for this...
        // https://github.com/nodkz/mongodb-memory-server/issues/102
        await groupModel.ensureIndexes();
        await userModel.ensureIndexes();
        await inviteModel.ensureIndexes();
        await tournamentModel.ensureIndexes();

        mongoc = new MongoClient(uri);
        await mongoc.connect();
    });

    beforeEach(async () => {
        await mongoc.db('test').collection('groups').deleteMany({});
        await mongoc.db('test').collection('users').deleteMany({});
        await mongoc.db('test').collection('invites').deleteMany({});
        await mongoc.db('test').collection('tournaments').deleteMany({});
    })

    afterAll(async () => {
        await mongoc.close();
        await disconnect();
        await mongod.stop();
    });

    describe('Get Group', () => {

        it('should be able to get a group by id', async () => {
            const group = {
                Name: 'Test Group',
                Users: [],
                CreatedDate: new Date(),
                Description: 'Test Description',
            };
            const createdGroup = await groupModel.create(group);
            createdGroup.save();
            const foundGroup = await service.findById(createdGroup._id.toString());
            expect(foundGroup).toHaveProperty('_id');
        });

        it('should be able to get groups', async () => {
            const foundGroup = await service.findAll();
            expect(foundGroup).toBeInstanceOf(Array);
        });
    });

    describe('Create Group', () => {

        it('should not be able to create a group when not logged in.', async () => {
            const group = {
                Name: 'Test Group',
                Users: [],
                CreatedDate: new Date(),
                Description: 'Test Description',
            };
            await expect(service.create(group, null)).rejects.toThrow();
            await expect(service.create(group, undefined)).rejects.toBeInstanceOf(BadRequestException);
        });

        it('should be able to create a group when logged in.', async () => {
            const user = {
                UserName: 'Test User',
                Email: 'TestUser@email.nl',
                BirthDate: new Date(),
            };
            const createdUser = await userModel.create(user);
            createdUser.save();
            const group = {
                Name: 'Test Group',
                Description: 'Test Description',
                CreatedDate: new Date(),
            };
            const createdGroup = await service.create(group, createdUser._id.toString());
            expect(createdGroup).toHaveProperty('_id');
        });

        it('should set the created user as a group member', async () => {
            const user = {
                UserName: 'Test User',
                Email: 'TestUser@email.nl',
                BirthDate: new Date(),
            };
            const createdUser = await userModel.create(user);
            createdUser.save();

            const group = {
                Name: 'Test Group',
                Description: 'Test Description',
                CreatedDate: new Date(),
            };
            const createdGroup = await service.create(group, createdUser._id.toString());
            expect(createdGroup.Users[0]._id).toEqual(createdUser._id);
        });

        it('should not create group when user is already in group', async () => {
            const user = {
                UserName: 'Test User',
                Email: 'TestUser@email.nl',
                BirthDate: new Date(),
            };
            const createdUser = await userModel.create(user);
            createdUser.save();

            const group = {
                Name: 'Test Group',
                Description: 'Test Description',
                CreatedDate: new Date(),
            };
            await service.create(group, createdUser._id.toString());

            try {
                await service.create(group, createdUser._id.toString());
            } catch(e) {
                expect(e).toBeInstanceOf(BadRequestException);
            }
        });

    });

    describe('Update Group', () => {
        let createdUser: UserDocument;
        let testUser: IUser;
        let createdUser2: UserDocument;
        let testUser2: IUser;
        let user2, group;

        beforeAll(async () => {
            user2 = {
                UserName: 'Test User2',
                Email: 'TestUse2@email.nl',
                BirthDate: new Date(),
            };
            createdUser2 = await userModel.create(user2);
            createdUser2.save();

            const user = {
                UserName: 'Test User1',
                Email: 'TestUser1@email.nl',
                BirthDate: new Date(),
            };
            createdUser = await userModel.create(user);
            createdUser.save();

            testUser2 = {
                _id: createdUser2._id.toString(),
                UserName: createdUser2.UserName,
                Email: createdUser2.Email,
                BirthDate: createdUser2.BirthDate,
                HasAGroup: <boolean>createdUser2.HasAGroup,
                CurrentGroup: null,
                GroupInvites: null,
                Friends:null,
            }
            testUser = {
                _id: createdUser._id.toString(),
                UserName: createdUser.UserName,
                Email: createdUser.Email,
                BirthDate: createdUser.BirthDate,
                HasAGroup: <boolean>createdUser.HasAGroup,
                CurrentGroup: null,
                GroupInvites: null,
                Friends:null,
            }
            group = {
                Name: 'Test Group',
                Description: 'Test Description',
                CreatedDate: new Date(),
                Users: [
                    testUser,
                    testUser2,
                ],
            };
        });

        it('should not update if user is not the owner', async () => {
            const createdGroup = await groupModel.create(group);

            try {
                await service.update(createdGroup._id.toString(), testUser2._id.toString(), { Description: 'Test Description Changed' });
            } catch (e) {
                expect(e).toEqual(new BadRequestException('User with id ' + testUser2._id.toString() + ' is not the owner of this group'));
            }
        });

        it('should not update if the group name has changed', async () => {
            const createdGroup = await groupModel.create(group);

            try {
                await service.update(createdGroup._id.toString(), testUser._id.toString(), { Name: 'Test Group changed' });
            } catch (e) {
                expect(e).toEqual(new BadRequestException('Group names cannot be changed.'));
            }
        });
    });

    describe('Delete Group', () => {
        let createdUser: UserDocument;
        let testUser: IUser;
        let createdUser2: UserDocument;
        let testUser2: IUser;
        let user2, group;
        beforeAll(async () => {

        });

        it('should not delete if user is not the owner', async () => {
            user2 = {
                UserName: 'Test User2',
                Email: 'TestUse2@email.nl',
                BirthDate: new Date(),
            };
            createdUser2 = await userModel.create(user2);
            createdUser2.save();

            const user = {
                UserName: 'Test User3',
                Email: 'TestUser3@email.nl',
                BirthDate: new Date(),
            };
            createdUser = await userModel.create(user);
            createdUser.save();

            testUser2 = {
                _id: createdUser2._id.toString(),
                UserName: createdUser2.UserName,
                Email: createdUser2.Email,
                BirthDate: createdUser2.BirthDate,
                HasAGroup: <boolean>createdUser2.HasAGroup,
                CurrentGroup: null,
                GroupInvites: null,
                Friends: null,
            }
            testUser = {
                _id: createdUser._id.toString(),
                UserName: createdUser.UserName,
                Email: createdUser.Email,
                BirthDate: createdUser.BirthDate,
                HasAGroup: <boolean>createdUser.HasAGroup,
                CurrentGroup: null,
                GroupInvites: null,
                Friends: null,
            }
            group = {
                Name: 'Test Group',
                Description: 'Test Description',
                CreatedDate: new Date(),
                Users: [
                    testUser,
                    testUser2,
                ],
            };

            const createdGroup = await groupModel.create(group);
            createdGroup.save();
            try {
                await service.delete(createdGroup._id.toString(), testUser2._id.toString());
            } catch (e) {
                expect(e).toEqual(new BadRequestException('User with id ' + testUser2._id.toString() + ' is not the owner of this group'));
            }
        });

    });

});