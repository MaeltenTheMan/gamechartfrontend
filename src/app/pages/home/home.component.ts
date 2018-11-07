import { Tournament } from './../../models/Tournament';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/Team';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  team: Team;
  wettkampf: Tournament;

  constructor(private api: BasicAPI, private localStorage: AsyncLocalStorage) { }

  ngOnInit() {
    this.localStorage.getItem<any>('wettkampfID').subscribe(res => {

      this.getBiggestPoints(res);
      this.getWettkampf(res);
    });


  }


  getWettkampf(wettkampfID) {

    this.api.getTournamentByID(wettkampfID).subscribe(res => {

      this.wettkampf = res[0];
    });
  }

  getBiggestPoints(id) {

    this.api.getBiggestPoints(id).subscribe(res => {

      this.team = res[0];
    });
  }

}
