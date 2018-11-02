import { Color } from './../../models/Color';
import { BasicAPI } from './../../services/basicAPI.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { Player } from '../../models/Player';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss']
})
export class CreatePlayerComponent implements OnInit {
  playerForm: FormGroup;

  onAdd = new EventEmitter();

  Mycolors: Color[];

  constructor(private fb: FormBuilder, private dialog: MatDialogRef<CreatePlayerComponent>, private api: BasicAPI,  @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.Mycolors = data;
  }

  ngOnInit() {
    this.createPlayerForm();
    this.dialog.updateSize("400px", "520px");

  }

  createPlayerForm() {
    this.playerForm = this.fb.group({
      firstname: new FormControl("", [
        Validators.required]),
      lastname: new FormControl("", [
        Validators.required]),
      description: new FormControl("", [
        Validators.required]),
      color: new FormControl("", [
        Validators.required]),
      birthday: new FormControl("", [
        Validators.required])

    });
  }

  close() {
    this.dialog.close();
  }

  createNewPlayer() {
    var body: Player = JSON.parse(JSON.stringify(this.playerForm.value));

      this.api.createPlayer(body).subscribe(() => {

        this.api.getPlayer().subscribe(response => {
          this.onAdd.emit(response);
        })

        this.close();
      }, error => {
        console.log(error);
      }); 


  }

}
