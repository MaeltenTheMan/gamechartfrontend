//modules
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './modules/routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ColorPickerModule } from 'ngx-color-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { MaterialComponentsModule } from './modules/materialModule.module';

//components
import { GameHistoryComponent } from './pages/game-history/game-history.component';
import { NewGameComponent } from './pages/new-game/new-game.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AddteamComponent } from './components/addteam/addteam.component';
import { FulllayoutComponent } from './components/fulllayout/fulllayout.component';
import { HomeComponent } from './pages/home/home.component';
import { ChartComponent } from './pages/chart/chart.component';
import { AppComponent } from './app.component';
import { AddPlayerToTeamComponent } from './components/add-player-to-team/add-player-to-team.component';
import { NewtournamentComponent } from './components/newtournament/newtournament.component';
import { StarterComponent } from './pages/starter/starter.component';
import { ChangePlayerComponent } from './components/change-player/change-player.component';
import { CreatePlayerComponent } from './components/create-player/create-player.component';
import { PlayerListComponent } from './pages/player-list/player-list.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { InspectGameComponent } from './components/inspect-game/inspect-game.component';
import { PasswordComponentComponent } from './components/password-component/password-component.component';
import { InspectTeamComponent } from './components/inspect-team/inspect-team.component';

//services
import { BasicAPI } from './services/basicAPI.service';
import { SpinnerService } from './services/spinner.service';
import { HttpSpinnerInterceptor } from './services/httpinterceptor.service';
import { TeamService } from './services/team.service';

//pipes
import { DatePipe } from '@angular/common';
import { ColorBackground } from './pipes/colorbackground.pipe';
import { FontColorPipe } from './pipes/fontcolor.pipe';
import { IDToNameConverter } from './pipes/idtoname.pipe';



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
    PlayerListComponent,
    CreatePlayerComponent,
    FontColorPipe,
    ColorBackground,
    ChangePlayerComponent,
    StarterComponent,
    NewtournamentComponent,
    AddPlayerToTeamComponent,
    InspectGameComponent,
    PasswordComponentComponent,
    InspectTeamComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ColorPickerModule,
    AsyncLocalStorageModule

  ],
  entryComponents: [
    AddteamComponent,
    EditTeamComponent,
    CreatePlayerComponent,
    ChangePlayerComponent,
    NewtournamentComponent,
    AddPlayerToTeamComponent,
    InspectGameComponent,
    InspectTeamComponent
  ],
  providers: [
    BasicAPI,
    DatePipe,
    
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
