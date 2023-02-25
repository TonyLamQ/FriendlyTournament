import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth.schema';
import { User } from '../user/user.schema';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { JWT_KEY } from '../../constants';
import { compare, hash } from 'bcrypt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('Auth') private authmodel: Model<Auth>,
    @InjectModel('User') private userModel: Model<User>
  ) {}

  //create
  async create(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel({UserName: user.UserName, Email: user.Email});
    await newUser.save();
    return newUser.toObject({versionKey: false});
  }

  async register(UserName: string, Password: string, Email: string){
    const SALT_ROUNDS = await bcrypt.genSalt();
    const generateHash = await hash(Password, SALT_ROUNDS);

    const identity = new this.authmodel({UserName, hash: generateHash, Email});
    await identity.save();
  }

  //login
  async generateToken(Email: string, Password: string) : Promise<string>{
    const identity = await this.authmodel.findOne({Email});
    if(!identity || !await compare(Password, identity.hash)){
      throw new NotFoundException('User not found');
    }

    const user = await this.userModel.findOne({Email});

    return new Promise((resolve, reject) => {
      sign({Email, id: user.id}, JWT_KEY, (err: Error, token: string) => {
        if(err) reject(err);
        else resolve(token);
      })
    });
  }

  //verify key
  async verifyToken(token: string): Promise<string | JwtPayload> {
    return new Promise((resolve, reject) => {
      verify(token, JWT_KEY, (err, payload) => {
        if(err){
          reject(err);
        } else resolve(payload);
      });
    });
  }


}