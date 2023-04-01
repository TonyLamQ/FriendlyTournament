import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ITournament } from "@friendly-tournament/data/models";
import { catchError, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TournamentService {

    constructor(private http: HttpClient) { }

    getTournaments():Observable<ITournament[]> {
        return this.http.get<ITournament[]>(`/api/Tournament/findAll`);
    }

    getTournament(id:string) : Observable<ITournament>{
        return this.http.get<ITournament>(`/api/Tournament/${id}`)
    }

    getRecommendedTournaments():Observable<ITournament[]> {
        return this.http.get<ITournament[]>(`/api/Tournament/recommended`);
    }

    createTournament(tournament:Partial<ITournament>): Observable<ITournament>{
        return this.http.post<ITournament>(`/api/Tournament/create`, tournament);
    }

    updateTournament(id: string, changes: Partial<ITournament>): Observable<ITournament>{
        return this.http.put<ITournament>(`/api/Tournament/edit/${id}`, changes);
    }

    deleteTournament(id: string): Observable<void>{
        return this.http.delete<void>(`/api/Tournament/delete/${id}`);
    }

    joinTournament(id: string): Observable<void>{
        return this.http.post<void>(`/api/Tournament/join/${id}`, {});
    }
}