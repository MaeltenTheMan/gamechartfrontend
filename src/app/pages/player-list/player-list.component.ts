import { AsyncLocalStorage } from 'angular-async-local-storage';
import { ChangePlayerComponent } from './../../components/change-player/change-player.component';
import { Color } from './../../models/Color';
import { DatePipe } from '@angular/common';
import { CreatePlayerComponent } from './../../components/create-player/create-player.component';
import { MatDialog } from '@angular/material';
import { Player } from './../../models/Player';
import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})

export class PlayerListComponent implements OnInit {

  breakpoint: number;

  colors: Color[];

  players: Player[];

  user: string;

  constructor(private api: BasicAPI, private dialog: MatDialog, private dialog2: MatDialog, private localStorage: AsyncLocalStorage) { }

  ngOnInit() {

    this.breakpoint = (window.innerWidth <= 830) ? 1 : 2;
    this.getAllColors();
    this.getAllPlayer();
    this.getLocalStorageAuthentication()
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 830) ? 1 : 2;
  }

  getAllPlayer() {
    this.api.getPlayer().subscribe(res => {
      this.players = res;

    },  error => {
      alert(error.status + " " + error.statusText);
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

  createNewPlayer() {
    const ref = this.dialog.open(CreatePlayerComponent, { disableClose: true, data: this.colors });
    ref.componentInstance.onAdd.subscribe(res => {

      this.players = res;

    },  error => {
      alert(error.status + " " + error.statusText);
    });
  }

  deletePlayer(playerId) {
    this.api.deletePlayerByID(playerId).subscribe(() => {

      this.api.getPlayer().subscribe(res=>{
        this.players = res;
      })
      
    }, error => {
      alert(error.error);
    });
  } 

  getAllColors() {
    this.api.getColors().subscribe(res => {
      this.colors = res;
     
    },  error => {
      alert(error.status + " " + error.statusText);
    });
  }

  editPlayer(playerID) {
    this.api.getPlayerByID(playerID).subscribe(response => {

      let obj = {
        player: response[0], colors: this.colors
      }


      const ref2 = this.dialog2.open(ChangePlayerComponent, { disableClose: true, data: obj });
      ref2.componentInstance.onChange.subscribe(res => {
        this.players = res;
      });
    } , error => {
      alert(error.error);
    });
  }
}
