import { SpinnerService } from './../../services/spinner.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Team } from './../../models/Team';
import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  team: Team;

  wettkampfid;

  constructor(private api: BasicAPI, private localStorage: AsyncLocalStorage) { 
  }

  ngOnInit() {
    this.getLocalStorage();  
  }

  getBiggestPoints(id) {
    this.api.getBiggestPoints(id).subscribe(res => {
      this.team = res[0];
    });
  }

  getLocalStorage(){
    this.localStorage.getItem<any>('wettkampfID').subscribe(res=>{
      this.wettkampfid = res;
      this.getBiggestPoints(this.wettkampfid);
  });
  }
}
