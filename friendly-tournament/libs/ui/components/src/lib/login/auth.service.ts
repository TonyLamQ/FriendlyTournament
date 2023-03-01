import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IAuth, ITournament, IUser } from "@friendly-tournament/data/models";
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    constructor(private http: HttpClient) { 
    }

    login(value:Partial<IAuth>):Observable<IUser | undefined>{
        return this.http.post<IUser>('/api/Auth/login', value)
    }

    register(value:Partial<IAuth>):Observable<IUser>{
        return this.http.post<IUser>('/api/Auth/register',value)
    }
}
