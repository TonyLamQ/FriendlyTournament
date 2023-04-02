import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IGroup } from "@friendly-tournament/data/models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    constructor(private http: HttpClient) { }

    getGroups():Observable<IGroup[]> {
        return this.http.get<IGroup[]>(`/api/Group/findAll`);
    }

    getGroup(id:string) : Observable<IGroup>{
        return this.http.get<IGroup>(`/api/Group/find/${id}`);
    }

    createGroup(group: Partial<IGroup>){
        return this.http.post<IGroup>(`/api/Group/create`, group);
    }

    updateGroup(id: string, changes: Partial<IGroup>){
        return this.http.put<IGroup>(`/api/Group/edit/${id}`, changes);
    }

    leaveGroup(): Observable<IGroup>{
        return this.http.post<IGroup>(`/api/Group/leave`, {});
    }

    deleteGroup(id: string){
        return this.http.delete<IGroup>(`/api/Group/delete/${id}`);
    }
}