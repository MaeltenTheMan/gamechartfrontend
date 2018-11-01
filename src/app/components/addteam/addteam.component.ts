import { Router } from '@angular/router';
import { TeamService } from './../../services/team.service';
import { Team } from './../../models/Team';
import { BasicAPI } from './../../services/basicAPI.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.scss']
})
export class AddteamComponent implements OnInit {

  teamForm: FormGroup;

  onAdd = new EventEmitter();

  constructor(private fb: FormBuilder,private dialog: MatDialogRef<AddteamComponent>, private api: BasicAPI,private router: Router, private teamService:TeamService) { }

  ngOnInit() {
    this.createTeamForm();
    this.dialog.updateSize("400px", "450px")
  
  }

  createTeamForm(){
    this.teamForm = this.fb.group({
      name: new FormControl("", [
        Validators.required]),
      motto: new FormControl("", [
        Validators.required]),
      memberone: new FormControl("", [
        Validators.required]),
      membertwo: new FormControl("", [
        Validators.required])
  
    });
  }

  close(){
    this.dialog.close();
  }
  
  createNewTeam(){
    var body: Team = JSON.parse(JSON.stringify(this.teamForm.value));

    this.api.createNewTeam(body).subscribe(res=> {

      this.api.getTeams().subscribe(response => {
        this.onAdd.emit(response);
      })
         
      this.close();
    }, error=>{
      console.log(error);
    });

    
  }

}
