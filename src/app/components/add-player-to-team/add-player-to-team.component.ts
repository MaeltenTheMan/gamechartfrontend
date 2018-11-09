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

  players: Player[];

  existingPlayers: Player[];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<AddPlayerToTeamComponent>,
    private api: BasicAPI,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.players = this.deletePlayer(this.data.players, this.data.usedPlayers);

    this.existingPlayers = this.data.existingPlayers;
    this.addPlayerToTeamForm();
    this.dialog.updateSize("500px");

  }

  addPlayerToTeamForm() {
    this.playerForm = this.fb.group({
      player: new FormControl("", [
        Validators.required
      ]),

    });
  }

  deletePlayer(allPlayers: Player[], usedPlayers: Player[]): Player[] {

    if (usedPlayers.length != 0) {

      for (let j = 0; j < usedPlayers.length; j++) {

        let removeIndex = allPlayers.map(item => { return item.id; }).indexOf(usedPlayers[j].id);

        allPlayers.splice(removeIndex, 1);
      }

    }

    return allPlayers;


  }

  addPlayerToTeam() {

    let body = this.playerForm.value;

    this.api.addPlayerToTeam(this.data.teamID, body.player.id, this.data.wettkampfID).subscribe(() => {

      this.close();

    }, error => {
      alert(error.status + " " + error.statusText);
    });
  }

  close() {
    this.dialog.close();
  }

}
