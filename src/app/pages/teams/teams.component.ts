import { EditTeamComponent } from './../../components/edit-team/edit-team.component';
import { TeamService } from './../../services/team.service';
import { Team } from './../../models/Team';
import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { AddteamComponent } from '../../components/addteam/addteam.component';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;


  displayedColumns: string[] = ['name', 'motto', 'memberone', 'membertwo', 'delete'];
  public dataSource = new MatTableDataSource<Team>();

  constructor(private dialog: MatDialog, private api: BasicAPI, private teamService: TeamService) { }

  ngOnInit() {
    this.getAllteams();
  }

  getAllteams() {
    this.api.getTeams().subscribe(res => {
      console.log(JSON.stringify(res));
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;

    }, error => {
      console.log("Error in call 'getTeams'!!! in Team Overview");
      alert(error);
    });
  }

  //Öffnen eines Erstellungsdialoges
  newTeam() {
    const ref = this.dialog.open(AddteamComponent, { disableClose: true });
    ref.componentInstance.onAdd.subscribe(res => {

      this.dataSource.data = res;
      this.dataSource.sort = this.sort;

    });
  }


  deleteTeam(teamID) {
    this.api.deleteTeamByID(teamID).subscribe(res => {
      this.api.getTeams().subscribe(response => {
        this.dataSource.data = response;
      })

    }, error => {
      throw error;
    });
  }

  changeTeam(teamID) {
    this.api.getTeamByID(teamID).subscribe(response => {
      const ref = this.dialog.open(EditTeamComponent, { disableClose: true, data: response[0] });
      ref.componentInstance.onChange.subscribe(res => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
      });
    });
  }
}
