import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IInvitation, IInviteResponse, IUser } from "@friendly-tournament/data/models";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getList(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`/api/User/findAll`);
    }
    getProfile():Observable<IUser> {
        return this.http.get<IUser>(`/api/User/profile`);
    }

    getInvites(): Observable<IInvitation[]>{
        return this.http.get<IInvitation[]>(`/api/Invite/Invites`);
    }
    invite(invite: Partial<IInvitation>): Observable<IInvitation>{
        return this.http.post<IInvitation>(`/api/Invite`, invite);
    }
    inviteResponse(value: Partial<IInviteResponse>): Observable<IInvitation>{
        return this.http.post<IInvitation>(`/api/Invite/inviteResponse`, value);
    }

    getFriends(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`/api/User/Friends`);
    }
    befriend(user: Partial<IUser>): Observable<IUser>{
        return this.http.post<IUser>(`/api/User/Friends/add`, user);
    }
    unfriend(user: Partial<IUser>): Observable<IUser>{
        return this.http.post<IUser>(`/api/User/Friend/Remove`, user);
    }
}