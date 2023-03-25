import { IUser } from '@friendly-tournament/data/models';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { Auth } from './auth.schema';
import { AuthService } from './auth.service';

describe('AuthController', () => {
    let app: TestingModule;
    let authController: AuthController;
    let authService: AuthService;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ // mock the auth service, to avoid providing its dependencies
                provide: AuthService,
                useValue: {
                    create: jest.fn(),
                    register: jest.fn(),
                    generateToken: jest.fn(),
                },
            }],
        }).compile();

        authController = app.get<AuthController>(AuthController);
        authService = app.get<AuthService>(AuthService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        let exampleId, register, create;
        // let exampleUser: IUser;
        let exampleAuthUser: Auth;

        beforeEach(() => {
            // exampleUser = {
            //     UserName: 'henk',
            //     Email: 'henk@henk.nl',
            //     BirthDate: new Date(),
            //     HasAGroup: false,
            //     GroupInvites: [],
            //     CurrentGroup: null,
            // }

            exampleAuthUser = {
                UserName: 'henk',
                hash: 'supersecret123',
                Email: 'henk@henk.nl',
            };

            exampleId = 'id123';

            create = jest.spyOn(authService, 'create')
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .mockImplementation(async (_u: IUser) => { return exampleId; });
        });

        it('should call the register and create method of the auth service on success', async () => {
            register = jest.spyOn(authService, 'register')
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .mockImplementation(async (_u: string, _p: string, _e: string) => { return exampleAuthUser; });

            const id = await authController.register(exampleAuthUser);

            expect(register).toHaveBeenCalledWith(exampleAuthUser.UserName, exampleAuthUser.hash, exampleAuthUser.Email);
            expect(create).toHaveBeenCalledWith(exampleAuthUser);
            expect(id).toHaveProperty('id', exampleId);
        });

        it('should not call create on failed register (duplicate username)', async () => {
            register = jest.spyOn(authService, 'register')
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .mockImplementation(async (_u: string, _p: string) => { throw new Error('duplicate user'); });

            await expect(authController.register(exampleAuthUser)).rejects.toThrow();
            expect(create).not.toHaveBeenCalled();
        });
    });

    describe('login', () => {
        it('should call the generateToken method of the auth service', async () => {
            const exampleAuthUser = {
                UserName: 'henk',
                hash: 'supersecret123',
                Email: 'henk@henk.nl',
            };
            
            const mockedToken: any = {token: 'mockedToken'};

            const register = jest.spyOn(authService, 'generateToken')
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .mockImplementation(async (_u: string, _p: string) => { return mockedToken.token; });

            expect(await authController.login(exampleAuthUser)).toStrictEqual(mockedToken);

            expect(register).toHaveBeenCalledWith(exampleAuthUser.Email, exampleAuthUser.hash);
        });
    });
});