import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ITournament } from "@friendly-tournament/data/models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TournamentService {

    constructor(private http: HttpClient) { }

    getTournaments():Observable<ITournament[]> {
        return this.http.get<ITournament[]>(`https://localhost:3333/api/Tournament/findAll`);
    }

    getTournament(id:string){
        return this.http.get(`https://localhost:3333/api/Tournament/find/${id}`);
    }

    createTournament(tournament: Partial<ITournament>){
        return this.http.post(`https://localhost:3333/api/Tournament/create`, tournament);
    }

    updateTournament(id: string, changes: Partial<ITournament>){
        return this.http.put(`https://localhost:3333/api/Tournament/edit/${id}`, changes);
    }

    deleteTournament(id: number){
        return this.http.delete(`https://localhost:3333/api/Tournament/delete/${id}`);
    }
}