import { Game } from './../models/Game';
import { Team } from './../models/Team';
import {Injectable, Optional} from "@angular/core";
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent }  from '@angular/common/http';
import {Observable} from "rxjs/Observable";


@Injectable()
export class BasicAPI {

    public defaultHeaders = new HttpHeaders();

    protected basePath = 'http://localhost:8080';

    constructor(private http: HttpClient){

    }
    //getting all Teams for Table and teamcontrols
    getTeams():Observable<Team[]>{
    
        return this.http.get<Team[]>(this.basePath + "/getAllTeams");  
    }

    //getting all Games for GameHistory and GameControls
    getGames():Observable<Game[]> {
    
        return this.http.get<Game[]>(this.basePath + "/getAllGames");  
    }

    createNewTeam(body):Observable<Team> {

        let httpHeaders = new HttpHeaders({
            "Content-Type": 'application/json',
        });

        let options = {
            headers: httpHeaders,   
       }; 

        return this.http.post<Team>(this.basePath  + "/createTeam", body , options);
    }


    newGame(body):Observable<Game>{
        let httpHeaders = new HttpHeaders({
            "Content-Type": 'application/json',
        });

        let options = {
            headers: httpHeaders,   
       }; 
        return this.http.post<Game>(this.basePath + "/newGame", body, options)
    }

    deleteTeamByID(teamId: number):Observable<Team>{
        let httpHeaders = new HttpHeaders({
            "Content-Type": 'application/json',
        });
        let options = {
            headers: httpHeaders,   
       }; 
        return this.http.delete<Team>(this.basePath + "/deleteTeamById/" + teamId, options);
    }

    deleteGameByID(gameId: number):Observable<Team>{
        let httpHeaders = new HttpHeaders({
            "Content-Type": 'application/json',
        });
        let options = {
            headers: httpHeaders,   
       }; 
        return this.http.delete<Team>(this.basePath + "/deleteGameById/" + gameId, options);
    }

    getBiggestPoints():Observable<Team>{
        return this.http.get<Team>(this.basePath + "/getFirstPlace");
    }

    getTeamByID(teamId):Observable<Team>{
        let httpHeaders = new HttpHeaders({
            "Content-Type": 'application/json',
        });
        let options = {
            headers: httpHeaders,   
       }; 

       return this.http.get<Team>(this.basePath + "/getTeamByID/" + teamId, options )
    }



   
}