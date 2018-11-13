import { AsyncLocalStorage } from 'angular-async-local-storage';
import { AddPlayerToTeamComponent } from './../../components/add-player-to-team/add-player-to-team.component';
import { CreatePlayerComponent } from './../../components/create-player/create-player.component';
import { EditTeamComponent } from './../../components/edit-team/edit-team.component';
import { TeamService } from './../../services/team.service';
import { Team } from './../../models/Team';
import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { AddteamComponent } from '../../components/addteam/addteam.component';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  wettkampfid: number;

  user: any;

  displayedColumns: string[] = ['name', 'motto', 'delete'];

  public dataSource = new MatTableDataSource<Team>();

  constructor(private dialog: MatDialog, private api: BasicAPI, private route: ActivatedRoute, private localStorage: AsyncLocalStorage){} 

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.wettkampfid = +params['wettkampfid'];

    });
    this.getLocalStorageAuthentication();
    this.getAllteams();
  }

  getAllteams() {
    this.api.getTeams(this.wettkampfid).subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;

    }, error => {
      alert(error.status + " " + error.statusText);

    });
  }

  //Öffnen eines Erstellungsdialoges
  newTeam() {

    let data = { wettkampfid: this.wettkampfid };

    const ref = this.dialog.open(AddteamComponent, { disableClose: true, data: data });
    ref.componentInstance.onAdd.subscribe(res => {

      this.dataSource.data.push(res);
      this.dataSource.sort = this.sort;

    });
  }



  getLocalStorageAuthentication() {

    this.localStorage.getItem<any>('Authentication').subscribe(res => {

      if (res != null) {
        this.user = res;

        //setting default value to undefined
      } else {
        this.user = undefined;
      }
    });
  }


  //TODO: in ein BEHAVIOR SUBJECT umwandeln damit die DataSource nicht komplett neu geladen werden muss
  deleteTeam(teamID) {
    this.api.deleteTeamByID(teamID).subscribe(() => {
      this.api.getTeams(this.wettkampfid).subscribe(response => {
        this.dataSource.data = response;
      })

    }, error => {
      alert(error.error);
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
    }, error => {
      alert(error.error);
    });
  }

  addPlayerToTeam(teamID) {
    this.api.getPlayer().subscribe(response => {

      let data = { teamID: teamID, players: response, existingPlayers: undefined, wettkampfID: this.wettkampfid, usedPlayers: undefined }

      this.api.getPlayerOfTeam(teamID).subscribe(res => {
        data.existingPlayers = res;
        this.api.getUsedPlayers(this.wettkampfid).subscribe(res2 => {
    
          data.usedPlayers = res2;
          const ref2 = this.dialog.open(AddPlayerToTeamComponent, { disableClose: true, data: data });
          ref2.componentInstance.onAdd.subscribe(() => {
          });
        })
      })
    }, error => {
      alert(error.status + " " + error.statusText);
    })


  }
}
