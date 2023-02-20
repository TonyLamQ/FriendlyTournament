import { Observable, of } from 'rxjs';
import { ITournament } from '@friendly-tournament/data/models';
// import { Tournament, TournamentDocument } from './tournament.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user.toObject({versionKey: false});
  }
}