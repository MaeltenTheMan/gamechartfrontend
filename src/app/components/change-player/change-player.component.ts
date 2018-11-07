import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { Player } from '../../models/Player';
import { Color } from '../../models/Color';

@Component({
  selector: 'app-change-player',
  templateUrl: './change-player.component.html',
  styleUrls: ['./change-player.component.scss']
})
export class ChangePlayerComponent implements OnInit {

  onChange = new EventEmitter();

  playerForm: FormGroup;

  Mycolors: Color[];



  constructor(
    private api: BasicAPI,
    private dialog: MatDialogRef<ChangePlayerComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.Mycolors = this.data.colors;

    this.changePlayerForm(this.data.player);
    this.dialog.updateSize("400px");
  }

  changePlayerForm(player: Player) {
    this.playerForm = this.fb.group({
      firstname: new FormControl(player.firstname, [
        Validators.required]),
      lastname: new FormControl(player.lastname, [
        Validators.required]),
      description: new FormControl(player.description, [
        Validators.required]),
      color: new FormControl(player.color, [
        Validators.required]),
      birthday: new FormControl(player.birthday, [
        Validators.required])

    });
  }

  changePlayer() {
    var body: Player = JSON.parse(JSON.stringify(this.playerForm.value));
    this.api.editPlayer(this.data.player.id, body).subscribe(() => {
      this.api.getPlayer().subscribe(response => {
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
