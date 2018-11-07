import { ActivatedRoute } from '@angular/router';
import { Team } from './../../models/Team';
import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  dataSource = new MatTableDataSource<Team>();

  teamsPosition;

  wettkampfid : number;

  displayedColumns: string[] = ['platz', 'name', 'points'];

  constructor(private api: BasicAPI, private route: ActivatedRoute ) { }

 
    


  ngOnInit() {

    this.route.params.subscribe(params=>{
      this.wettkampfid = +params['wettkampfid'];
    })

    this.getAllteams();
  }


  getAllteams() {
    this.api.getTeams(this.wettkampfid).subscribe(res => {
      const sorted = res.sort((a, b) => a.name.localeCompare(b.name));
      const secondSort = sorted.sort((a, b) => b.points - a.points);
      this.dataSource.data = secondSort;

    }, error => {
      console.log("Error in call 'getTeams'!!! in Chart")
    });
  }


}
