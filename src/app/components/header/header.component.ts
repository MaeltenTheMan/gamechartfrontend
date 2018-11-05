import { HoldIDService } from './../../services/holdID.service';
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

  constructor(private spinnerService: SpinnerService, private holdService: HoldIDService) {

    this.spinnerService.onLoadingChanged.subscribe(isLoading => {
      
      this.loading = isLoading;
      this.wettkampfid = this.holdService.wettkampfID;
    
    });
  }

  ngOnInit() {

  }

}
