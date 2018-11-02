import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/Team';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  team:Team;
 
  constructor(private api: BasicAPI){ 
  }

  ngOnInit() {
    this.getBiggestPoints();
    
  } 

  getBiggestPoints(){
    this.api.getBiggestPoints().subscribe(res=>{

      this.team = res[0];
    });
  }

}
