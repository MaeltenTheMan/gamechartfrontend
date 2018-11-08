import { BasicAPI } from './../../services/basicAPI.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Tournament } from '../../models/Tournament';

@Component({
  selector: 'app-newtournament',
  templateUrl: './newtournament.component.html',
  styleUrls: ['./newtournament.component.scss']
})
export class NewtournamentComponent implements OnInit {


  tournamentForm: FormGroup;

  onAdd = new EventEmitter();

  constructor(private fb: FormBuilder, private dialog: MatDialogRef<NewtournamentComponent>, private api: BasicAPI, ) { }

  ngOnInit() {
    this.createTournamentForm();
    this.dialog.updateSize("400px");

  }

  createTournamentForm() {
    this.tournamentForm = this.fb.group({
      name: new FormControl("", [
        Validators.required]),
      typ: new FormControl("", [
        Validators.required])

    });
  }


  createNewTournament() {
    let body: Tournament = JSON.parse(JSON.stringify(this.tournamentForm.value));

    this.api.createTournament(body).subscribe(res => {

      this.onAdd.emit(res);

      this.close();
    },  error => {
      alert(error.status + " " + error.statusText);
    });

  }

  close() {
    this.dialog.close();
  }
}
