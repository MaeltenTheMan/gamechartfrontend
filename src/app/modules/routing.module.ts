import { PlayerListComponent } from './../pages/player-list/player-list.component';
import { GameHistoryComponent } from './../pages/game-history/game-history.component';
import { NewGameComponent } from './../pages/new-game/new-game.component';
import { ChartComponent } from './../pages/chart/chart.component';
import { HomeComponent } from './../pages/home/home.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from '../pages/teams/teams.component';


const appRoutes: Routes = [

 
    { path: 'home', component:HomeComponent, pathMatch: 'full'},
    { path: 'chart', component:ChartComponent, pathMatch: 'full'},
    { path: 'teams', component:TeamsComponent, pathMatch: 'full'},
    { path: 'game', component:NewGameComponent, pathMatch: 'full'},
    { path: 'player', component:PlayerListComponent, pathMatch: 'full'},
    { path: 'history', component:GameHistoryComponent, pathMatch: 'full'},
    { path: '',   redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { onSameUrlNavigation: 'reload', useHash: false
      }
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
