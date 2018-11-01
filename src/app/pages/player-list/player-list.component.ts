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

  player: Player[];

  constructor(private api: BasicAPI) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 2;
    this.getAllPlayer();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 2;
  }

  getAllPlayer() {
    this.api.getPlayer().subscribe(res => {
      this.player = res;

      console.log(this.player);
    })
  }

  createNewPlayer(){
    
  }
}
