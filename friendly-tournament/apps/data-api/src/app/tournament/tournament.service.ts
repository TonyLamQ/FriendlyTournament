import { Observable, of } from 'rxjs';
import { IGroup, ITournament, IUser } from '@friendly-tournament/data/models';
import { Tournament, TournamentDocument } from './tournament.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Headers } from '@nestjs/common/decorators';
import { JwtPayload } from 'jsonwebtoken';
import { BadRequestException, ConflictException } from '@nestjs/common/exceptions';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class TournamentService {
  constructor(
    @InjectModel('Tournament') private tournamentModel: Model<Tournament>,
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('Group') private groupModel: Model<IGroup>,
    private neoService: Neo4jService,) {
  }

  getIdFromHeader(@Headers() header): any {
    const base64Payload = header.authorization.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const updatedJwtPayload: JwtPayload = JSON.parse(payloadBuffer.toString()) as JwtPayload;

    return (updatedJwtPayload.id)
  }

  async findAll(): Promise<ITournament[]> {
    return this.tournamentModel.find();
  }

  async findById(id: string): Promise<ITournament> {
    const tournament = await this.tournamentModel.findById(id);
    return tournament.toObject({ versionKey: false });
  }

  async create(tournamentModel: Partial<ITournament>, userId: string): Promise<ITournament> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException(`User with ${userId} not found`);

    const tournament = { ...tournamentModel, Creator: user };
    const newTournament = new this.tournamentModel(tournament);
    await newTournament.save();

    await this.neoService.write(
      'CREATE (t:Tournament {tournamentId: $id, name: $name})',
      { id: newTournament.id, name: newTournament.Name }
    )

    return newTournament.toObject({ versionKey: false });
  }

  async join(tournamentId: string, userId: string): Promise<ITournament> {
    const tournament = await this.tournamentModel.findById(tournamentId);
    if (!tournament) throw new NotFoundException(`Tournament with ${tournamentId} not found`);

    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException(`User with ${userId} not found`);

    const group = await this.groupModel.findById(user.CurrentGroup);
    if (!group) throw new NotFoundException(`Group with ${user.CurrentGroup} not found`);

    let includesGroup = false;
    for (let i = 0; i < tournament.Groups.length; i++) {
      if (tournament.Groups[i].toString() == group._id.toString()) {
        includesGroup = true;
      }
    }
    if (includesGroup) throw new ConflictException(`Group with ${group._id} is already in the tournament`);
    if (group.Users[0]._id.toString() == userId.toString()) {
      tournament.Groups.push(group);
      await tournament.save();

      for (let groupMember of group.Users) {
        console.log(groupMember._id)
        console.log(tournament.id)
        console.log(tournamentId)
        await this.neoService.write(
          `MATCH (u:User {userId: $userId}), (t:Tournament {tournamentId: $tournamentId})
           CREATE (u)-[:JOINED]->(t)`,
          { userId: groupMember._id.toString(), tournamentId: tournament.id.toString() }
        );
      }

      return tournament.toObject({ versionKey: false });
    } else {
      throw new BadRequestException(`User with ${userId} is not the creator of the group`);
    }
  }

  async update(id: string, changes: Partial<ITournament>): Promise<ITournament> {
    const tournament = await this.tournamentModel.findById(id);
    if (tournament) {
      tournament.set(changes);
      await tournament.save();
      return tournament.toObject({ versionKey: false });
    }
    throw new NotFoundException(`Tournament with ${id} not found`);
  }

  async delete(id: string, userId: string): Promise<ITournament> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException(`User with ${userId} not found`);

    await this.neoService.write(
      'MATCH (t:Tournament {tournamentId: $id}) DETACH DELETE t',
      { id: id})
    const tournament = await this.tournamentModel.findById(id);

    if (user._id.toString() != tournament.Creator['_id'].toString()) throw new NotFoundException(`User with ${userId} is not the creator of the tournament`);

    if (tournament) {
      await tournament.remove();
      return tournament.toObject({ versionKey: false });
    }
    throw new NotFoundException(`Tournament with ${id} not found`);
  }
}