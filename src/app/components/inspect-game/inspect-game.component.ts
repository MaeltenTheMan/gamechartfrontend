import { Team } from './../../models/Team';
import { Game } from './../../models/Game';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-inspect-game',
  templateUrl: './inspect-game.component.html',
  styleUrls: ['./inspect-game.component.scss']
})
export class InspectGameComponent implements OnInit {

  protected game: Game;
  protected teams: Team[];

  constructor(  
    private dialog: MatDialogRef<InspectGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.dialog.updateSize("400px");

    this.game = this.data.game;
    this.teams = this.data.teams;
  }

  close(){
    this.dialog.close();
  }

}
