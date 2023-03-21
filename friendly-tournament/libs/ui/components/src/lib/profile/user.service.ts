import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IInvitation, IUser } from "@friendly-tournament/data/models";

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
    invite(invite: Partial<IInvitation>): Observable<IInvitation>{
        return this.http.post<IInvitation>(`/api/Invite`, invite);
    }
}