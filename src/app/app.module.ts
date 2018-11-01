import { PlayerListComponent } from './pages/player-list/player-list.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { TeamService } from './services/team.service';
import { IDToNameConverter } from './pipes/idtoname.pipe';
import { GameHistoryComponent } from './pages/game-history/game-history.component';
import { SpinnerService } from './services/spinner.service';
import { HttpSpinnerInterceptor } from './services/httpinterceptor.service';
import { NewGameComponent } from './pages/new-game/new-game.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FulllayoutComponent } from './components/fulllayout/fulllayout.component';
import { AppRoutingModule } from './modules/routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ChartComponent } from './pages/chart/chart.component';
import { MaterialComponentsModule } from './modules/materialModule.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BasicAPI } from './services/basicAPI.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddteamComponent } from './components/addteam/addteam.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChartComponent,
    FulllayoutComponent,
    HeaderComponent,
    FooterComponent,
    TeamsComponent,
    AddteamComponent,
    NewGameComponent,
    GameHistoryComponent,
    IDToNameConverter,
    EditTeamComponent,
    PlayerListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    BrowserAnimationsModule,
    AppRoutingModule

  ],
  entryComponents: [
    AddteamComponent,
    EditTeamComponent
  ],
  providers: [
    BasicAPI,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpSpinnerInterceptor,
      multi: true
    },
    SpinnerService,
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
