
import { Router } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';

import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loading: boolean;

  wettkampfid: any;

  user: any;

  status: any;

  constructor(private spinnerService: SpinnerService, private localStorage: AsyncLocalStorage, private router: Router) {

    this.spinnerService.onLoadingChanged.subscribe(isLoading => {

      //while loading true mat-spinner is showing
      this.loading = isLoading;

      //updating localstorage on every httprequest
      this.getLocalStorageWKID();
      this.getLocalStorageAuthentication();
      this.getLocalStorageStatus();

    });
  }

  ngOnInit() {

    //on initialisation pulling localstorage to know witch tourney 
    this.getLocalStorageWKID();
    this.getLocalStorageAuthentication();

  }

  getLocalStorageWKID() {
    this.localStorage.getItem<any>('wettkampfID').subscribe(res => {
      if (res != null) {
        this.wettkampfid = res;

        //setting default value of 0
      } else {
        this.wettkampfid = 0;
      }
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


  getLocalStorageStatus() {

    this.localStorage.getItem<any>('Status').subscribe(res => {

      if (res != null) {
        this.status = res;

        //setting default value to undefined
      } else {
        this.status = undefined;
      }
    });
  }

  navigateStart() {
    this.wettkampfid = 0;
    this.localStorage.setItem('wettkampfID', this.wettkampfid).subscribe(() => {
      this.router.navigate(['/start']);
    });
  }


}
