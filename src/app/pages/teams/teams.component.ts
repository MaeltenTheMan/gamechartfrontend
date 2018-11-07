import { AddPlayerToTeamComponent } from './../../components/add-player-to-team/add-player-to-team.component';
import { CreatePlayerComponent } from './../../components/create-player/create-player.component';
import { EditTeamComponent } from './../../components/edit-team/edit-team.component';
import { TeamService } from './../../services/team.service';
import { Team } from './../../models/Team';
import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { AddteamComponent } from '../../components/addteam/addteam.component';
import { Tournament } from '../../models/Tournament';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  wettkampfid: number;

  displayedColumns: string[] = ['name', 'motto', 'delete'];

  public dataSource = new MatTableDataSource<Team>();

  constructor(private dialog: MatDialog, private api: BasicAPI, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.wettkampfid = +params['wettkampfid'];

    })
    this.getAllteams();
  }

  getAllteams() {
    this.api.getTeams(this.wettkampfid).subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;

    }, error => {

    });
  }

  //Öffnen eines Erstellungsdialoges
  newTeam() {

    let data = { wettkampfid: this.wettkampfid };

    const ref = this.dialog.open(AddteamComponent, { disableClose: true, data: data });
    ref.componentInstance.onAdd.subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;

    });
  }


  deleteTeam(teamID) {
    this.api.deleteTeamByID(teamID).subscribe(res => {
      this.api.getTeams(this.wettkampfid).subscribe(response => {
        this.dataSource.data = response;
      })

    }, error => {
      throw error;
    });
  }

  changeTeam(teamID) {
    this.api.getTeamByID(teamID).subscribe(response => {

      let data = { wettkampfid: this.wettkampfid, team: response[0] }

      const ref = this.dialog.open(EditTeamComponent, { disableClose: true, data: data });
      ref.componentInstance.onChange.subscribe(res => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
      });
    });
  }

  addPlayerToTeam(teamID) {
    this.api.getPlayer().subscribe(response => {

      let data = { teamID: teamID, players: response }

      const ref2 = this.dialog.open(AddPlayerToTeamComponent, { disableClose: true, data: data });
      ref2.componentInstance.onAdd.subscribe(() => {

      })
    })


  }
}
