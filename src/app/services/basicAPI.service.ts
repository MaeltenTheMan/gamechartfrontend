import { Color } from './../models/Color';
import { Player } from './../models/Player';
import { Game } from './../models/Game';
import { Team } from './../models/Team';
import { Injectable, Optional } from "@angular/core";
import 'rxjs/add/operator/map';
import {
    HttpClient, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent
} from '@angular/common/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class BasicAPI {

    public defaultHeaders = new HttpHeaders();

    public httpHeaders = new HttpHeaders({
        "Content-Type": 'application/json',
    });

    public options = {

        headers: this.httpHeaders

    }



    protected basePath = 'http://localhost:8080';

    constructor(private http: HttpClient) {

    }
    //getting all Teams for Table and teamcontrols
    getTeams(): Observable<Team[]> {

        return this.http.get<Team[]>(this.basePath + "/getAllTeams");
    }

    //getting all Games for GameHistory and GameControls
    getGames(): Observable<Game[]> {

        return this.http.get<Game[]>(this.basePath + "/getAllGames");
    }

    getPlayer(): Observable<Player[]> {
        return this.http.get<Player[]>(this.basePath + "/getAllPlayer");
    }

    getColors(): Observable<Color[]> {

        return this.http.get<Color[]>(this.basePath + "/getAllColors");
    }

    createNewTeam(body): Observable<Team> {

        return this.http.post<Team>(this.basePath + "/createTeam", body, this.options);
    }

    createPlayer(body): Observable<Player> {

        return this.http.post<Player>(this.basePath + "/createPlayer", body, this.options);
    }


    newGame(body): Observable<Game> {

        return this.http.post<Game>(this.basePath + "/newGame", body, this.options)
    }


    deleteTeamByID(teamId: number): Observable<Team> {

        return this.http.delete<Team>(this.basePath + "/deleteTeamById/" + teamId, this.options);
    }

    deletePlayerByID(playerID: number): Observable<Player>{

        return this.http.delete<Player>(this.basePath + "/deletePlayerById/" + playerID, this.options);
    }


    deleteGameByID(gameId: number): Observable<Team> {

        return this.http.delete<Team>(this.basePath + "/deleteGameById/" + gameId, this.options);
    }


    getBiggestPoints(): Observable<Team> {
        return this.http.get<Team>(this.basePath + "/getFirstPlace");
    }


    getTeamByID(teamId): Observable<Team> {

        return this.http.get<Team>(this.basePath + "/getTeamByID/" + teamId, this.options)
    }

    getPlayerByID(playerId): Observable<Player> {

        return this.http.get<Player>(this.basePath + "/getPlayerByID/" + playerId, this.options)
    }

    editPlayer(id, body): Observable<Player> {

        return this.http.post<Player>(this.basePath + "/editPlayer/" + id, body, this.options)
    }


    editTeam(id, body): Observable<Team> {

        return this.http.post<Team>(this.basePath + "/editTeam/" + id, body, this.options)
    }

}