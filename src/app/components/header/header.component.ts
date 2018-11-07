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

  wettkampfid: number;

  constructor(private spinnerService: SpinnerService, private localStorage: AsyncLocalStorage) {

    

    this.spinnerService.onLoadingChanged.subscribe(isLoading => {
      
      //while loading true mat-spinner is showing
      this.loading = isLoading;

      //updating localstorage on every httprequest
      this.getLocalStorage();
    
    });
  }

  ngOnInit() {
    //on initialisation pulling localstorage to know witch tourney 
    this.getLocalStorage();
   
  }

  getLocalStorage(){
    this.localStorage.getItem<any>('wettkampfID').subscribe(res=>{
      if(res!=null){
        this.wettkampfid = res;
        
        //setting default value of 0
      } else{
        this.wettkampfid = 0;
      }
  });
  }

}
