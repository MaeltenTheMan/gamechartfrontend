import { Player } from './../../models/Player';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Team } from './../../models/Team';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-inspect-team',
  templateUrl: './inspect-team.component.html',
  styleUrls: ['./inspect-team.component.scss']
})
export class InspectTeamComponent implements OnInit {
  
  protected team: Team;
  protected players: Player[];

  constructor(  
    private dialog: MatDialogRef<InspectTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.dialog.updateSize("400px");

    this.players = this.data.players;
  
    this.team = this.data.team;
  }

  close(){
    this.dialog.close();
  }


}
