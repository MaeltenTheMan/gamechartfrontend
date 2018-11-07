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

  constructor( private newDialog: MatDialog, private api: BasicAPI, private router: Router, private localStorage: AsyncLocalStorage ) { 

  }


  ngOnInit() {
    this.localStorage.getItem<any>('wettkampfID').subscribe(res=>{

      //route to 'start' if wettkampfid is undefined only 
      if(res==undefined){
        this.getAllTournaments();
      } else{
        this.router.navigate(['/home']);
      }
    })
    
  }

  getAllTournaments(){
    this.api.getTournaments().subscribe(res=>{
      this.tournaments = res;
    })
  }

  //Öffnen eines Erstellungsdialoges
  newTournament() {
    const ref = this.newDialog.open(NewtournamentComponent, { disableClose: true });
    ref.componentInstance.onAdd.subscribe(res => {

      this.tournaments = res;

    });
  }

  setTournament(id: number){
    this.localStorage.setItem('wettkampfID', id.toString()).subscribe(()=>{
      this.router.navigate(['/home']);
    }); 
  
  }
}
