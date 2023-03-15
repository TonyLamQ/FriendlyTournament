import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "@friendly-tournament/data/models";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getProfile():Observable<IUser> {
        return this.http.get<IUser>(`/api/User/profile`);
    }
}