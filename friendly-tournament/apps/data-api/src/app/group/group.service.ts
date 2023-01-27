import { Injectable, NotFoundException } from '@nestjs/common';
import { IGroup } from '@friendly-tournament/data/models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GroupService {

  constructor(@InjectModel('Group') private groupModel: Model<IGroup>) {}
  //       id: 2,
  //       Name: 'Nerds',
  //       TotalPlayers: 0,
  //       CreatedDate: new Date(2021,4,21),
  //   },
  //   {
  //       id: 3,
  //       Name: 'Pooperds',
  //       TotalPlayers: 0,
  //       CreatedDate: new Date(2021,4,21),
  //   },
  //   {
  //       id: 4,
  //       Name: 'Flamingo',
  //       TotalPlayers: 0,
  //       CreatedDate: new Date(2021,4,21),
  //   },
  //   {
  //       id: 5,
  //       Name: 'Uno',
  //       TotalPlayers: 0,
  //       CreatedDate: new Date(2021,4,21),
  //   },
  // ];
  // groupId: number = this.groupList.length;
  // constructor() {}
  // getList(): Observable<IGroup[]> {
  //   console.log('ITournament getList aangeroepen');
  //   console.log(this.groupList);
  //   return of(this.groupList);
  // }
  // getById(id: number): Observable<IGroup> {
  //   console.log('ITournament getById aangeroepen');
  //   console.log(`ITournament met ID ${id} gezocht`);
  //   return of(this.groupList.filter((item) => item.id === id)[0]);
  // }
  // create(group: IGroup): Observable<any> {
  //   console.log('tournament create aangeroepen');
  //   this.group = { ...group };
  //   this.group.id = ++this.groupId;
  //   this.groupList.push(this.group);
  //   console.log(`Nieuwe tournament toegevoegd met ID ${this.groupId}`);
  //   return of({
  //     status: 201,
  //     message: 'success',
  //   });
  // }
  // update(group: IGroup): Observable<any> {
  //   console.log('tournament update aangeroepen');
  //   // TO DO: movieList updaten
  //   this.group = { ...group };
  //   this.groupList.splice(this.groupList.findIndex(t => t.id ===group.id),1, this.group)
  //       console.log(`tournament met ID ${this.group?.id} geüpdatet`);
  //       return of({
  //         status: 201,
  //         message: 'success',
  //       });
  //   } 
  //   delete(group: Number): Observable<any> {
  //     this.groupList.splice(this.groupList.findIndex(t => t.id ===group),1)
  //           console.log(`tournament met ID ${this.group?.id} deleted`);
  //           return of({
  //             status: 201,
  //             message: 'success',
  //           });
  //       } 

  // private group?: IGroup;
  // private groupList: IGroup[] = [
  //   {
  //     id: 1,
  //     Name: 'Geeks',
  //     TotalPlayers: 0,
  //     CreatedDate: new Date(2021,4,21),
  //   },
  //   {
  //       id: 2,
  //       Name: 'Nerds',
  //       TotalPlayers: 0,
  //       CreatedDate: new Date(2021,4,21),
  //   },
  //   {
  //       id: 3,
  //       Name: 'Pooperds',
  //       TotalPlayers: 0,
  //       CreatedDate: new Date(2021,4,21),
  //   },
  //   {
  //       id: 4,
  //       Name: 'Flamingo',
  //       TotalPlayers: 0,
  //       CreatedDate: new Date(2021,4,21),
  //   },
  //   {
  //       id: 5,
  //       Name: 'Uno',
  //       TotalPlayers: 0,
  //       CreatedDate: new Date(2021,4,21),
  //   },
  // ];

  // groupId: number = this.groupList.length;

  // constructor() {}

  // getList(): Observable<IGroup[]> {
  //   console.log('ITournament getList aangeroepen');
  //   console.log(this.groupList);
  //   return of(this.groupList);
  // }

  // getById(id: number): Observable<IGroup> {
  //   console.log('ITournament getById aangeroepen');
  //   console.log(`ITournament met ID ${id} gezocht`);
  //   return of(this.groupList.filter((item) => item.id === id)[0]);
  // }

  // create(group: IGroup): Observable<any> {
  //   console.log('tournament create aangeroepen');
  //   this.group = { ...group };
  //   this.group.id = ++this.groupId;
  //   this.groupList.push(this.group);
  //   console.log(`Nieuwe tournament toegevoegd met ID ${this.groupId}`);
  //   return of({
  //     status: 201,
  //     message: 'success',
  //   });
  // }

  // update(group: IGroup): Observable<any> {
  //   console.log('tournament update aangeroepen');
  //   // TO DO: movieList updaten
  //   this.group = { ...group };
  //   this.groupList.splice(this.groupList.findIndex(t => t.id ===group.id),1, this.group)
  //       console.log(`tournament met ID ${this.group?.id} geüpdatet`);
  //       return of({
  //         status: 201,
  //         message: 'success',
  //       });
  //   } 

  //   delete(group: Number): Observable<any> {
  //     this.groupList.splice(this.groupList.findIndex(t => t.id ===group),1)
  //           console.log(`tournament met ID ${this.group?.id} deleted`);
  //           return of({
  //             status: 201,
  //             message: 'success',
  //           });
  //       } 

  async findAll(): Promise<IGroup[]> {
    return await this.groupModel.find();
  }

  async findById(id: string): Promise<IGroup> {
    const Group = await this.groupModel.findById(id);
    return Group;
  }

  async create(group: Partial<IGroup>): Promise<IGroup> {
    const newGroup = new this.groupModel(group);
    await newGroup.save();
    return newGroup.toObject({versionKey: false});
  }

  async update(id: string, changes: Partial<IGroup>): Promise<IGroup> {
    const group = await this.groupModel.findById(id);
    if(group){
      group.set(changes);
      await group.save();
      return group.toObject({versionKey: false});
    }
    throw new NotFoundException(`Group with id ${id} not found`);
  }

  async delete(id: string): Promise<IGroup> {
    const group = await this.groupModel.findById(id);
    if(group){
      await group.delete();
      return group.toObject({versionKey: false});
    }
    throw new NotFoundException(`Group with id ${id} not found`);
  }
}