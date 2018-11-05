import { FulllayoutComponent } from './../components/fulllayout/fulllayout.component';
import { StarterComponent } from './../pages/starter/starter.component';
import { PlayerListComponent } from './../pages/player-list/player-list.component';
import { GameHistoryComponent } from './../pages/game-history/game-history.component';
import { NewGameComponent } from './../pages/new-game/new-game.component';
import { ChartComponent } from './../pages/chart/chart.component';
import { HomeComponent } from './../pages/home/home.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from '../pages/teams/teams.component';


const appRoutes: Routes = [

 
    { path: 'home/:wettkampfid', component:HomeComponent, pathMatch: 'full'},
    { path: 'chart/:wettkampfid', component:ChartComponent, pathMatch: 'full'},
    { path: 'teams/:wettkampfid', component:TeamsComponent, pathMatch: 'full'},
    { path: 'game/:wettkampfid', component:NewGameComponent, pathMatch: 'full'},
    { path: 'player/:wettkampfid', component:PlayerListComponent, pathMatch: 'full'},
    { path: 'history/:wettkampfid', component:GameHistoryComponent, pathMatch: 'full'},
  /*   { path: 'fullLayout/:wettkampfid', component: FulllayoutComponent, pathMatch: 'full'},*/
    { path: 'starterComponent', component: StarterComponent, pathMatch: 'full'}, 
    { path: '',   redirectTo: 'starterComponent', pathMatch: 'full' }

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
