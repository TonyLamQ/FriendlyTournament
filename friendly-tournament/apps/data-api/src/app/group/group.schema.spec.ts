import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { validate, version } from 'uuid';
import { GroupDocument, GroupSchema } from './group.schema';


describe('Group Schema', () => {
    let mongod: MongoMemoryServer;
    let groupModel: Model<GroupDocument>;

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        mongod = await MongoMemoryServer.create();
                        const uri = mongod.getUri();
                        return { uri };
                    },
                }),
                MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }])
            ],
        }).compile();

        groupModel = app.get<Model<GroupDocument>>(getModelToken('Group'));

        // not entirely sure why we need to wait for this...
        // https://github.com/nodkz/mongodb-memory-server/issues/102
        await groupModel.ensureIndexes();
    });

    afterAll(async () => {
        await disconnect();
        await mongod.stop();
    });

    it('has a required name', () => {
        const model = new groupModel();

        const err = model.validateSync();
        expect(err.errors.Name.message).toEqual('Path `Name` is required.');
    });

    it('has a required Description', () => {
        const model = new groupModel();

        const err = model.validateSync();
        expect(err.errors.Description.message).toEqual('Path `Description` is required.');
    });

    it('has a required CreatedDate', () => {
        const model = new groupModel();

        const err = model.validateSync();
        expect(err.errors.CreatedDate.message).toEqual('Path `CreatedDate` is required.');
    });

    it('has a empty list of Entries', () => {
        const model = new groupModel({ Name: 'henk', Description: 'test desc', CreatedDate: new Date() });
        expect(model.Entries).toEqual([]);
    });

    it('has a empty list of Invites', () => {
        const model = new groupModel({ Name: 'henk', Description: 'test desc', CreatedDate: new Date() });
        expect(model.Invites).toEqual([]);
    });

});