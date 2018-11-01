import { BasicAPI } from './../../services/basicAPI.service';
import { Game } from './../../models/Game';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Team } from '../../models/Team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {
  game:Game;
  gameForm: FormGroup;

  teams: Team[];

  constructor(private fb: FormBuilder, private api: BasicAPI, private router: Router) { }

  ngOnInit() {
    console.log("ngOnInit()")
    this.newGame();
    this.api.getTeams().subscribe(res =>{
      this.teams = res;
      console.log(this.teams);
    }, error=>{ console.log(error)})
    
  }

  newGame(){

    this.gameForm = this.fb.group({
      name: new FormControl("", [
        Validators.required]),
     /*  points: new FormControl("", [
        Validators.required]), */
      winner: new FormControl("", [
        Validators.required]),
      second: new FormControl("", [
        Validators.required]),
      third: new FormControl("", [
        Validators.required]),
      fourth: new FormControl("", [
        Validators.required]),
      fifth: new FormControl("", [
        Validators.required])
  
    });
  }


  sendGame(){
    var game = JSON.stringify(this.gameForm.value);
    this.api.newGame(game).subscribe(res=> {
      this.router.navigate(['/chart'])
    }, error => {
      console.log(error);
    })
  }

  resetGameForm(){
    this.gameForm.reset();
  }  
}