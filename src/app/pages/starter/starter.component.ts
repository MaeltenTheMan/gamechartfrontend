import { Color } from './../../models/Color';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { MatDialog } from '@angular/material';
import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit } from '@angular/core';
import { NewtournamentComponent } from '../../components/newtournament/newtournament.component';
import { Tournament } from '../../models/Tournament';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {

  tournaments: Tournament[];
  finishedTournaments: Tournament[];

  selectedUser: string = "user";

  colors: Color[];


  constructor(private newDialog: MatDialog, private api: BasicAPI, private router: Router, private localStorage: AsyncLocalStorage, private fb: FormBuilder) { 
    this.tournaments = [];
    this.finishedTournaments = [];
  }

  ngOnInit() {

    this.localStorage.getItem<string>('wettkampfID').subscribe(res => {

      //route to 'start' if wettkampfid is undefined only 
      if (res == undefined || res == 0) {
        this.getAllTournaments();
        this.getAllFinishedTournaments();
        
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  getAllTournaments() {
    this.api.getTournaments().subscribe(res => {
      this.tournaments = res;
    });
  }

  getAllFinishedTournaments(){
    this.api.getFinishedTournaments().subscribe(res => {
      this.finishedTournaments = res;
    });
  }

  //Öffnen eines Erstellungsdialoges
  newTournament() {
    const ref = this.newDialog.open(NewtournamentComponent, { disableClose: true });
    ref.componentInstance.onAdd.subscribe(res => {
      this.tournaments.push(res);
    });
  }

 

  setTournament(id: number, status : string) {

    this.setAuthentication(this.selectedUser);
    this.setStatus(status);

    this.localStorage.setItem('wettkampfID', id.toString()).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  setAuthentication(user: string) {
    this.localStorage.setItem('Authentication', user).subscribe(() => {

    });
  }

  setStatus(status: string) {
    this.localStorage.setItem('Status', status.toString()).subscribe(() => {
    });
  }


}
