import request = require('supertest');

import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, MiddlewareConsumer, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from "mongodb-memory-server";
import { disconnect } from "mongoose";

import { AuthModule } from './app/auth/auth.module';
import { TokenMiddleware } from './app/auth/token.middleware';
// import { ApiResponseInterceptor } from './app/api-response.interceptor';
import { AppModule } from './app/app.module';
import { Auth } from './app/auth/auth.schema';
import { GroupModule } from './app/group/group.module';
import { TournamentModule } from './app/tournament/tournament.module';
import { UserModule } from './app/user/user.module';
import { InviteModule } from './app/invite/invite.module';
import { Neo4jModule, Neo4jService } from 'nest-neo4j/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GroupController } from './app/group/group.controller';
import { TournamentController } from './app/tournament/tournament.controller';
import { IGroup, ITournament } from '@friendly-tournament/data/models';

let mongod: MongoMemoryServer;
let uri: string;

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath:"./apps/data-api/.env",
        }),
          Neo4jModule.forRoot({
            scheme: "neo4j",
            host: "localhost",
            port: 7687,
            username: "neo4j",
            password: "neo4jsecret"
        }),
        MongooseModule.forRootAsync({
            useFactory: async () => {
                mongod = await MongoMemoryServer.create();
                uri = mongod.getUri();
                return { uri };
            },
        }),
        TournamentModule,
        GroupModule,
        AuthModule,
        UserModule,
        InviteModule,
    ],
    controllers: [],
    providers: [],
})
export class TestAppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TokenMiddleware)
            .forRoutes(
                GroupController,
                TournamentController
            )
    }
}

describe('end-to-end tests of data API', () => {
    let app: INestApplication;
    let server;
    let module: TestingModule;
    let mongoc: MongoClient;
    let neoService: Neo4jService;

    beforeAll(async () => {
        // sadly I have not found a way to override the Mongoose connection of the AppModule,
        // so here we duplicate the config of the AppModule...
        // contact me if you know how to do this better!
        // https://github.com/nestjs/nest/issues/4905
        module = await Test.createTestingModule({
            imports: [TestAppModule],
        })
            .compile();

        app = module.createNestApplication();
        // app.useGlobalInterceptors(new ApiResponseInterceptor());
        await app.init();

        mongoc = new MongoClient(uri);
        await mongoc.connect();

        neoService = module.get<Neo4jService>(Neo4jService);

        server = app.getHttpServer();
    });

    beforeEach(async () => {
        await mongoc.db('test').collection('auths').deleteMany({});
        await mongoc.db('test').collection('users').deleteMany({});
        await mongoc.db('test').collection('tournaments').deleteMany({});
        await mongoc.db('test').collection('groups').deleteMany({});
        await mongoc.db('test').collection('invites').deleteMany({});
        await neoService.write('MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r')
    });

    afterAll(async () => {
        await mongoc.close();
        await disconnect();
        await mongod.stop();
    });

    describe('single user', () => {
        let credentials;
        let credentials2;

        beforeEach(() => {
            credentials = {
                UserName: 'dion',
                hash: 'supergeheim123',
                Email: 'dion@dion.nl',
                BirthDate: new Date(),
            };
            credentials2 = {
                UserName: 'dion2',
                hash: 'supergeheim123',
                Email: 'dion2@dion.nl',
                BirthDate: new Date(),
            };
        });

        it('a user registers, logs in', async () => {
            const register = await request(server)
                .post('/auth/register')
                .send(credentials);
            expect(register.status).toBe(201);
            expect(register.body).toHaveProperty('id');

            const login = await request(server)
                .post('/auth/login')
                .send(credentials);
            console.log(login.body)
            expect(login.status).toBe(201);
            expect(login.body).toHaveProperty('token');
            const token = login.body.token;
        });

        it('should create a group', async () => {
            const register = await request(server)
                .post('/auth/register')
                .send(credentials);
            expect(register.status).toBe(201);
            expect(register.body).toHaveProperty('id');

            const login = await request(server)
                .post('/auth/login')
                .send(credentials);
            expect(login.status).toBe(201);
            expect(login.body).toHaveProperty('token');
            const token = login.body.token;

            const group : IGroup = {
                Name: 'testgroup',
                Description: 'testgroup',
                CreatedDate: new Date(),
                Users: [],
                Entries: [],
                Invites: [],
            };

            const createGroup = await request(server)
                .post('/group/create')
                .set('Authorization', token)

                .send(group);
            expect(createGroup.status).toBe(201);
            expect(createGroup.body).toHaveProperty('_id');
        });

        it('should create a tournament', async () => {
            const register = await request(server)
                .post('/auth/register')
                .send(credentials);
            expect(register.status).toBe(201);
            expect(register.body).toHaveProperty('id');

            const login = await request(server)
                .post('/auth/login')
                .send(credentials);
            expect(login.status).toBe(201);
            expect(login.body).toHaveProperty('token');
            const token = login.body.token;

            const tournament: Partial<ITournament> = {
                Name: 'testtournament',
                Game: 'testgame',
                RewardPrize: 10,
                Date: new Date(),
            };

            const createTournament = await request(server)
                .post('/tournament/create')
                .set('Authorization', token)
                .send(tournament);
            expect(createTournament.status).toBe(201);
            expect(createTournament.body).toHaveProperty('_id');
        });

        it('should befriend a user', async () => {
            const register = await request(server)
                .post('/auth/register')
                .send(credentials);
            expect(register.status).toBe(201);
            expect(register.body).toHaveProperty('id');

            expect(register.body.Friends).toBe(undefined);

            const register2 = await request(server)
            .post('/auth/register')
            .send(credentials2);
        expect(register2.status).toBe(201);
        expect(register2.body).toHaveProperty('id');
        
            const login = await request(server)
                .post('/auth/login')
                .send(credentials);
            expect(login.status).toBe(201);
            expect(login.body).toHaveProperty('token');
            const token = login.body.token;

            const user2Id = register2.body.id;

            const befriend = await request(server)
                .post('/user/Friends/Add/'+user2Id)
                .set('Authorization', token)
                .send();
            expect(befriend.status).toBe(201);
            expect(befriend.body).toHaveProperty('_id');
            expect(befriend.body.Friends).toHaveLength(1);
        });

    });
});