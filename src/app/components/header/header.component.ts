import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loading: boolean;

  constructor(private spinnerService: SpinnerService) { 
    
    this.spinnerService.onLoadingChanged.subscribe(isLoading => this.loading = isLoading);
  }

  ngOnInit() {
  }

}
