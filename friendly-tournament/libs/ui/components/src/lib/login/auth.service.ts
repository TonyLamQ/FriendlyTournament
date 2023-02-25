import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ITournament, IUser } from "@friendly-tournament/data/models";
import { catchError, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(Email:string, Password:string):Observable<IUser>{
        return this.http.post<IUser>('/api/Auth/login', {Email, Password});
    }

    register(Email:string, Username:string, Password:string):Observable<IUser>{
        return this.http.post<IUser>('/api/Auth/register',{Email, Username, Password})
    }
}