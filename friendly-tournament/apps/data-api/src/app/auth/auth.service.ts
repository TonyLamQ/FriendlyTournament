import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth.schema';
import { User } from '../user/user.schema';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { Neo4jService } from 'nest-neo4j/dist';
import { IUser } from '@friendly-tournament/data/models';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('Auth') private authmodel: Model<Auth>,
    @InjectModel('User') private userModel: Model<User>,
    private neoService: Neo4jService,
  ) { }

  //create
  async create(user: Partial<User>): Promise<ObjectId> {
    const newUser = new this.userModel({ UserName: user.UserName, Email: user.Email, BirthDate: user.BirthDate });
    await newUser.save();
    await this.neoService.write(
      `CREATE (u:User {userId: $id, name: $UserName, email: $Email})`,
      {id: newUser.id.toString(), UserName: newUser.UserName, Email: newUser.Email});
    return newUser._id;
  }

  async register(UserName: string, Password: string, Email: string): Promise<Auth> {
    const SALT_ROUNDS = await bcrypt.genSalt();
    const generateHash = await hash(Password, SALT_ROUNDS);

    const identity = new this.authmodel({ UserName, hash: generateHash, Email });
    await identity.save();
    return identity.toObject({ versionKey: false });
  }

  //login
  async generateToken(Email: string, Password: string): Promise<string> {
    const identity = await this.authmodel.findOne({ Email });
    if (!identity || !await compare(Password, identity.hash)) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userModel.findOne({ Email });

    return new Promise((resolve, reject) => {
      sign({ Email, id: user.id }, process.env.JWT_SECRET, (err: Error, token: string) => {
        if (err) reject(err);
        else resolve(token);
      })
    });
  }

  //verify key
  async verifyToken(token: string): Promise<string | JwtPayload> {
    return new Promise((resolve, reject) => {
      verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
          reject(err);
        } else resolve(payload);
      });
    });
  }


}