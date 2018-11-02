import { Team } from './../../models/Team';
import { FormBuilder } from '@angular/forms';
import { Game } from './../../models/Game';
import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  datasource = new MatTableDataSource<Game>();

  displayedColumns: string[] = ['number', 'name', 'winner', 'points', 'edit'];

  teams: Team[];

  constructor(private api: BasicAPI, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.getAllTeams();
    this.getAllGames();
  }


  getAllGames(){
    this.api.getGames().subscribe(res => {
    this.datasource.data =res;
    this.datasource.sort = this.sort;   
    });
  }

  getAllTeams(){
    this.api.getTeams().subscribe(res => {
      this.teams = res;
    });
  }

  deleteGame(gameId){
    this.api.deleteGameByID(gameId).subscribe(res =>{
      this.api.getGames().subscribe(response=> {
        this.datasource.data =response;;
        this.datasource.sort = this.sort;   
      })
    })
  }

  inspectGame(gameId){
    console.log(gameId);
  }
 
}
