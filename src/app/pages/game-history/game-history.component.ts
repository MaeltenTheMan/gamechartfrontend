import { InspectTeamComponent } from './../../components/inspect-team/inspect-team.component';
import { InspectGameComponent } from './../../components/inspect-game/inspect-game.component';
import { ActivatedRoute } from '@angular/router';
import { Team } from './../../models/Team';
import { FormBuilder } from '@angular/forms';
import { Game } from './../../models/Game';
import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  datasource = new MatTableDataSource<Game>();

  wettkampfid: number;

  displayedColumns: string[] = ['number', 'name', 'winner', 'points', 'edit'];

  teams: Team[];
  games: Game[];

  constructor(private api: BasicAPI, private fb: FormBuilder, private route: ActivatedRoute, private dialog: MatDialog) { }


  ngOnInit() {

    this.route.params.subscribe(params => {
      this.wettkampfid = +params['wettkampfid'];

    })

    this.getAllTeams();
    this.getAllGames();
  }


  getAllGames() {
    this.api.getGames(this.wettkampfid).subscribe(res => {
      this.games = res;
      this.datasource.data = this.games;
      this.datasource.sort = this.sort;
    },  error => {
      alert(error.status + " " + error.statusText);
    });
  }

  getAllTeams() {
    this.api.getTeams(this.wettkampfid).subscribe(res => {
      this.teams = res;
    },  error => {
      alert(error.status + " " + error.statusText);
    });
  }

  deleteGame(gameId) {
    this.api.deleteGameByID(gameId).subscribe(() => {
      this.api.getGames(this.wettkampfid).subscribe(response => {
        this.datasource.data = response;;
        this.datasource.sort = this.sort;
      });
    },  error => {
      alert(error.error);
    });
  }

  inspectGame(gameID) {

    let data = { game: this.games.find(x => x.id === gameID), teams: this.teams }
    this.dialog.open(InspectGameComponent, { disableClose: true, data: data });
  }

  inspectTeam(teamID) {
    this.api.getPlayerOfTeam(teamID).subscribe(res => {
      let data = { team: this.teams.find(x => x.id === teamID), players: res }
      this.dialog.open(InspectTeamComponent, { disableClose: true, data: data })
    },  error => {
      alert(error.status + " " + error.statusText);
    })

  }

  changeGame(id) {
    alert("Diese Funktion muss noch eingefügt werden!");
  }

  endTourney() {
    alert("Diese Funktion muss noch eingefügt werden!");
  }

}
