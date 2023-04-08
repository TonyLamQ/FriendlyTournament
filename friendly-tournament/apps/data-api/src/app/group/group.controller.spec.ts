import { IGroup, IUser } from '@friendly-tournament/data/models';
import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Auth } from '../auth/auth.schema';
import { Group } from './group.schema';

describe('GroupController', () => {
    let app: TestingModule;
    let groupController: GroupController;
    let groupService: GroupService;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [GroupController],
            providers: [{ // mock the auth service, to avoid providing its dependencies
                provide: GroupService,
                useValue: {
                    create: jest.fn(),
                    register: jest.fn(),
                    generateToken: jest.fn(),
                    getIdFromHeader: jest.fn(),
                },
            }],
        }).compile();

        groupController = app.get<GroupController>(GroupController);
        groupService = app.get<GroupService>(GroupService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        let exampleId, register, create, getIdFromHeader;
        // let exampleUser: IUser;
        let exampleAuthUser: Auth;
        let exampleGroup: IGroup;
        beforeEach(() => {

            exampleAuthUser = {
                UserName: 'henk',
                hash: 'supersecret123',
                Email: 'henk@henk.nl',
            };

            exampleGroup = {
                Name: 'Geekos',
                Description: 'Geekos is een groep van 5 vrienden',
                Invites: [],
                CreatedDate: new Date(),
                Entries: [],
                Users: []
            }

            exampleId = 'id123';

            create = jest.spyOn(groupService, 'create')
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .mockImplementation(async (_g: Partial<IGroup>, _u: string) => { return exampleGroup; });

            getIdFromHeader = jest.spyOn(groupService, 'getIdFromHeader')
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .mockImplementation(async () => { return exampleId; });

        });

        it('should call the create in service when create is called from groupController ', async () => {

            const group = await groupController.create(exampleGroup, exampleId);

            expect(group).toEqual(exampleGroup);
            expect(create).toHaveBeenCalled();
        });

        it('should reject when name is missing from group', async () => {
            exampleGroup.Name = null;
            create = jest.spyOn(groupService, 'create')
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .mockImplementation(async (_g: Partial<IGroup>, _u: string) => { throw new Error('duplicate group name'); });
            await expect(groupController.create(exampleGroup, exampleId)).rejects.toThrow();
        });

        
        // it('should not call create on failed register (duplicate username)', async () => {
        //     register = jest.spyOn(authService, 'register')
        //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //         .mockImplementation(async (_u: string, _p: string) => { throw new Error('duplicate user'); });
        //     await expect(authController.register(exampleAuthUser)).rejects.toThrow();
        //     expect(create).not.toHaveBeenCalled();
        // });
    });

    // describe('login', () => {
    //     it('should call the generateToken method of the auth service', async () => {
    //         const exampleAuthUser = {
    //             UserName: 'henk',
    //             hash: 'supersecret123',
    //             Email: 'henk@henk.nl',
    //         };
    //         const mockedToken: any = {token: 'mockedToken'};

    //         const register = jest.spyOn(authService, 'generateToken')
    //             // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //             .mockImplementation(async (_u: string, _p: string) => { return mockedToken.token; });

    //         expect(await authController.login(exampleAuthUser)).toStrictEqual(mockedToken);

    //         expect(register).toHaveBeenCalledWith(exampleAuthUser.Email, exampleAuthUser.hash);
    //     });
    // });
});