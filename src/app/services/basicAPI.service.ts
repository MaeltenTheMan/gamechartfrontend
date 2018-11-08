import { AsyncLocalStorage } from 'angular-async-local-storage';
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
import { Tournament } from '../models/Tournament';


@Injectable()
export class BasicAPI {



    public httpHeaders = new HttpHeaders({
        "Content-Type": 'application/json',
        

    });


    public options = {

        headers: this.httpHeaders

    }


    protected basePath = 'http://localhost:8080';

    constructor(private http: HttpClient, private localStorage: AsyncLocalStorage) {



    }
    //getting all Teams for Table and teamcontrols
    getTeams(wettkampfID: number): Observable<Team[]> {
     
        


        return this.http.get<Team[]>(this.basePath + "/getAllTeams/" + wettkampfID, this.options);
       
    }

    //getting all Games for GameHistory and GameControls
    getGames(wettkampfID: number): Observable<Game[]> {

        return this.http.get<Game[]>(this.basePath + "/getAllGames/" + wettkampfID);
    }

    getPlayer(): Observable<Player[]> {
        return this.http.get<Player[]>(this.basePath + "/getAllPlayer");
    }

    getColors():  Observable<Color[]>  {

        return this.http.get<Color[]>("./assets/Json-Objects/colors.json");
    }

    getTournaments(): Observable<Tournament[]> {

        return this.http.get<Tournament[]>(this.basePath + "/getTournaments");
    }

    createNewTeam(body, wettkampfID: number): Observable<Team> {

        return this.http.post<Team>(this.basePath + "/createTeam/" + wettkampfID, body, this.options);
    }

    createPlayer(body: Player): Observable<Player> {

        return this.http.post<Player>(this.basePath + "/createPlayer", body, this.options);
    }

    newGame(body, wettkampfID: number): Observable<Game> {

        return this.http.post<Game>(this.basePath + "/newGame/" + wettkampfID, body, this.options)
    }

    createTournament(body: Tournament): Observable<Tournament> {

        return this.http.post<Tournament>(this.basePath + "/createTournament", body, this.options);
    }


    deleteTeamByID(teamId: number): Observable<Team> {

        return this.http.delete<Team>(this.basePath + "/deleteTeamById/" + teamId, this.options);
    }

    deletePlayerByID(playerID: number): Observable<Player> {

        return this.http.delete<Player>(this.basePath + "/deletePlayerById/" + playerID, this.options);
    }


    deleteGameByID(gameId: number): Observable<Team> {

        return this.http.delete<Team>(this.basePath + "/deleteGameById/" + gameId, this.options);
    }


    getBiggestPoints(wettkampfID): Observable<Team> {
        return this.http.get<Team>(this.basePath + "/getFirstPlace/" + wettkampfID);
    }


    getTeamByID(teamId): Observable<Team> {

        return this.http.get<Team>(this.basePath + "/getTeamByID/" + teamId, this.options);
    }

    getPlayerByID(playerId): Observable<Player> {

        return this.http.get<Player>(this.basePath + "/getPlayerByID/" + playerId, this.options);
    }

    editPlayer(id, body): Observable<Player> {

        return this.http.post<Player>(this.basePath + "/editPlayer/" + id, body, this.options);
    }


    editTeam(id, body): Observable<Team> {

        return this.http.post<Team>(this.basePath + "/editTeam/" + id, body, this.options);
    }

    addPlayerToTeam(teamID, playerID): Observable<any> {

        return this.http.post<any>(this.basePath + "/addPlayerToTeam/" + teamID + "/" + playerID, this.options);
    }

    getPlayerOfTeam(teamID): Observable<Player[]> {

        return this.http.get<Player[]>(this.basePath + "/getPlayerOfTeam/" + teamID, this.options);
    }


    getTournamentByID(wettkampfID): Observable<Tournament> {
        return this.http.get<Tournament>(this.basePath + "/getTournamentByID/" + wettkampfID, this.options);
    }

}