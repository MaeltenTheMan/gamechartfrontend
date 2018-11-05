import { HoldIDService } from './../../services/holdID.service';
import { MatDialog, MatDialogRef } from '@angular/material';
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

  constructor( private newDialog: MatDialog, private api: BasicAPI, private holdService: HoldIDService) { 

  }

  ngOnInit() {
    this.getAllTournaments();
  }

  getAllTournaments(){
    this.api.getTournaments().subscribe(res=>{
      this.tournaments = res;
      console.log(this.tournaments)
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
    this.holdService.setWettkampf(id);
  }



}
