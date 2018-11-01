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
  
  constructor(private api : BasicAPI, private dialog: MatDialogRef<EditTeamComponent>, private fb: FormBuilder,  @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.createTeamForm(this.data);
    this.dialog.updateSize("400px", "450px");
  }

  createTeamForm(team:Team){
    this.teamForm = this.fb.group({
      name: new FormControl(team.name, [
        Validators.required]),
      motto: new FormControl(team.motto, [
        Validators.required]),
      memberone: new FormControl(team.memberone, [
        Validators.required]),
      membertwo: new FormControl(team.membertwo, [
        Validators.required])
  
    });
  }

  changeTeam(){
    console.log("das sollte die ID sein" + this.data.id);
    

    var body: Team = JSON.parse(JSON.stringify(this.teamForm.value));
    console.log(body);
    this.api.editTeam(this.data.id, body).subscribe(()=> {
      this.api.getTeams().subscribe(response => {
        this.onChange.emit(response);
      });
      this.close();
    }, error=>{
      console.log(error);
    });
  }

  close(){
    this.dialog.close();
  }

}
