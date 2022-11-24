import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IGroup } from '../../../../../libs/data/models/src/lib/IGroup';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private group?: IGroup;
  private groupList: IGroup[] = [
    {
      id: 1,
      Name: 'Geeks',
      TotalPlayers: 0,
      CreatedDate: new Date(2021,4,21),
    },
    {
        id: 2,
        Name: 'Nerds',
        TotalPlayers: 0,
        CreatedDate: new Date(2021,4,21),
    },
    {
        id: 3,
        Name: 'Pooperds',
        TotalPlayers: 0,
        CreatedDate: new Date(2021,4,21),
    },
    {
        id: 4,
        Name: 'Flamingo',
        TotalPlayers: 0,
        CreatedDate: new Date(2021,4,21),
    },
    {
        id: 5,
        Name: 'Uno',
        TotalPlayers: 0,
        CreatedDate: new Date(2021,4,21),
    },
  ];

  groupId: number = this.groupList.length;

  constructor() {}

  getList(): Observable<IGroup[]> {
    console.log('ITournament getList aangeroepen');
    console.log(this.groupList);
    return of(this.groupList);
  }

  getById(id: number): Observable<IGroup> {
    console.log('ITournament getById aangeroepen');
    console.log(`ITournament met ID ${id} gezocht`);
    return of(this.groupList.filter((item) => item.id === id)[0]);
  }

  create(group: IGroup): Observable<any> {
    console.log('tournament create aangeroepen');
    this.group = { ...group };
    this.group.id = ++this.groupId;
    this.groupList.push(this.group);
    console.log(`Nieuwe tournament toegevoegd met ID ${this.groupId}`);
    return of({
      status: 201,
      message: 'success',
    });
  }

  update(group: IGroup): Observable<any> {
    console.log('tournament update aangeroepen');
    // TO DO: movieList updaten
    this.group = { ...group };
    this.groupList.splice(this.groupList.findIndex(t => t.id ===group.id),1, this.group)
        console.log(`tournament met ID ${this.group?.id} geüpdatet`);
        return of({
          status: 201,
          message: 'success',
        });
    } 

    delete(group: Number): Observable<any> {
      this.groupList.splice(this.groupList.findIndex(t => t.id ===group),1)
            console.log(`tournament met ID ${this.group?.id} deleted`);
            return of({
              status: 201,
              message: 'success',
            });
        } 
}