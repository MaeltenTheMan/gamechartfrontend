import { ActivatedRoute } from '@angular/router';
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
  wettkampfid: number;
 
  constructor(private api: BasicAPI,  private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params=>{
      this.wettkampfid = +params['wettkampfid'];
      console.log("meine id" + this.wettkampfid);
      this.getBiggestPoints(this.wettkampfid);
    })
   
    
  } 

  getBiggestPoints(id){
    this.api.getBiggestPoints(id).subscribe(res=>{

      this.team = res[0];
    });
  }

}
