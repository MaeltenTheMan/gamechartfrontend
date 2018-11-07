import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from './../../services/team.service';
import { Team } from './../../models/Team';
import { BasicAPI } from './../../services/basicAPI.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.scss']
})
export class AddteamComponent implements OnInit {

  teamForm: FormGroup;

  onAdd = new EventEmitter();

  wettkampfid: number;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<AddteamComponent>, 
    private api: BasicAPI,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    
    this.wettkampfid = this.data.wettkampfid;
    this.createTeamForm();
    this.dialog.updateSize("400px");
  
  }

  createTeamForm(){
    this.teamForm = this.fb.group({
      name: new FormControl("", [
        Validators.required]),
      motto: new FormControl("", [
        Validators.required]),  
    });
  }

  close(){
    this.dialog.close();
  }
  
  createNewTeam(){
    var body: Team = JSON.parse(JSON.stringify(this.teamForm.value));

    this.api.createNewTeam(body, this.wettkampfid).subscribe(()=> {

      this.api.getTeams(this.wettkampfid).subscribe(response => {
        this.onAdd.emit(response);
      })
         
      this.close();
    }, error=>{
      console.log(error);
    });

    
  }

}
