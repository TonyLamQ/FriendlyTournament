import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IAuth, ITournament, IUser } from "@friendly-tournament/data/models";
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public currentUser$ = new BehaviorSubject<IUser | undefined>(undefined);
    private readonly CURRENT_USER = 'currentuser';
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    
    constructor(private http: HttpClient) { 
        const currentUser = localStorage.getItem(this.CURRENT_USER);
        if (currentUser) {
          this.currentUser$.next(JSON.parse(currentUser));
        }
    }

    login(value:Partial<IAuth>):Observable<IUser | undefined>{
        console.log(value)
        return this.http.post<IUser>('/api/Auth/login', value, {headers: this.headers})
        .pipe(
            map((identity) => {
              localStorage.setItem(this.CURRENT_USER, JSON.stringify(identity));
              this.currentUser$.next(identity);
              return identity;
            }),
            catchError((err) => {
              throw err;
            })
          );
    }

    register(value:Partial<IAuth>):Observable<IUser>{
        return this.http.post<IUser>('/api/Auth/register',value, {headers: this.headers})
    }

    getUserFromLocalStorage(): Observable<IUser | undefined> {
        const userData = localStorage.getItem(this.CURRENT_USER);
        if (userData) {
          const localUser = JSON.parse(userData);
          return of(localUser);
        } else {
          return of(undefined);
        }
      }
}
