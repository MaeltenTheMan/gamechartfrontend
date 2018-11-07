import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { Team } from '../../models/Team';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {

  onChange = new EventEmitter();

  teamForm: FormGroup;

  wettkampfid: number;

  constructor(
    private api: BasicAPI, private dialog: MatDialogRef<EditTeamComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.createTeamForm(this.data.team);
    this.dialog.updateSize("400px");
  }

  createTeamForm(team: Team) {
    this.teamForm = this.fb.group({
      name: new FormControl(team.name, [
        Validators.required]),
      motto: new FormControl(team.motto, [
        Validators.required])
    });
  }

  changeTeam() {
    var body: Team = JSON.parse(JSON.stringify(this.teamForm.value));
    this.api.editTeam(this.data.team.id, body).subscribe(() => {
      this.api.getTeams(this.data.wettkampfid).subscribe(response => {
        this.onChange.emit(response);
      });
      this.close();
    }, error => {
      console.log(error);
    });
  }

  close() {
    this.dialog.close();
  }

}
