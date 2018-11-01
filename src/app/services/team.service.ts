import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Team } from './../models/Team';
import { BasicAPI } from './basicAPI.service';
import { Injectable } from '@angular/core';


/*
* TODO: RELOAD Klären
* Heisse und kalte Observables
*
*
*
*/

@Injectable()
export class TeamService {

    private teamsList: BehaviorSubject<Array<Team>>;

    private loaded: boolean;

    constructor(private api: BasicAPI) {
        this.loaded = false;
        this.teamsList = new BehaviorSubject([]);
    }

    public getAllTeams(): Observable<Array<Team>> {

        this.api.getTeams().take(1).subscribe(result => this.teamsList.next(result));

        return this.teamsList.asObservable();
    }
}