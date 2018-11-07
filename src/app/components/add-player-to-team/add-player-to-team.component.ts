import { BasicAPI } from './../../services/basicAPI.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { Player } from '../../models/Player';

@Component({
  selector: 'app-add-player-to-team',
  templateUrl: './add-player-to-team.component.html',
  styleUrls: ['./add-player-to-team.component.scss']
})
export class AddPlayerToTeamComponent implements OnInit {

  playerForm: FormGroup;

  onAdd = new EventEmitter();

  players : Player[];

  constructor(
    private fb: FormBuilder, 
    private dialog: MatDialogRef<AddPlayerToTeamComponent>, 
    private api: BasicAPI,  
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.players = this.data.players;
    this.addPlayerToTeamForm();
    this.dialog.updateSize("500px");

  }

  addPlayerToTeamForm() {
    this.playerForm = this.fb.group({
      player: new FormControl("", [
        Validators.required]),
    
    });
  }


  addPlayerToTeam() {

    let body = this.playerForm.value;
    


    this.api.addPlayerToTeam(this.data.teamID, body.player.id).subscribe(() => {

      this.close();
      
    }, error => {
      console.log(error);
    });


  }

  close() {
    this.dialog.close();
  }

}
