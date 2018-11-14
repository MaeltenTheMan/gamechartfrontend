import { ImageComponentComponent } from './../../components/image-component/image-component.component';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { GalleryPic } from './../../models/GalleryPic';
import { GalleryService } from './../../services/gallery.service';
import { Tournament } from './../../models/Tournament';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { BasicAPI } from './../../services/basicAPI.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/Team';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  breakpoint: number;
  team: Team;
  wettkampf: Tournament;
  galleryPics: GalleryPic[];
  rowHeight: string;
  status: string;
  openAble: boolean;

  public dataSource = new MatTableDataSource<GalleryPic>();

  constructor(private api: BasicAPI, private localStorage: AsyncLocalStorage, private gallery: GalleryService, private dialog: MatDialog) { }


  ngOnInit() {

    if (window.innerWidth < 1100) {
      this.breakpoint = 1;
      this.rowHeight = "300px";
      this.openAble = false;
    }
    else if (window.innerWidth > 1650) {

      this.breakpoint = 5;
      this.rowHeight = "200px";
      this.openAble = true;
    }
    else {
      this.breakpoint = 3;
      this.rowHeight = "200px";
      this.openAble = true;
    }

    this.localStorage.getItem<any>('wettkampfID').subscribe(res => {
      this.getBiggestPoints(res);
      this.getWettkampf(res);

      this.getGalleryPics();

    });
  }

  onResize(event) {

    if (event.target.innerWidth <= 1650 && event.target.innerWidth > 1100) {
      this.breakpoint = 3;
      this.openAble = true;
      this.rowHeight = "200px";
    }
    else if (event.target.innerWidth > 1650) {
      this.breakpoint = 5;
      this.openAble = true;
      this.rowHeight = "200px";
    }
    else {
      this.breakpoint = 1;
      this.rowHeight = "300px";
      this.openAble = false;
    }
  }


  getWettkampf(wettkampfID) {

    this.api.getTournamentByID(wettkampfID).subscribe(res => {

      this.wettkampf = res[0];

      if (this.wettkampf.status == 0) {
        this.status = "abgeschlossen"
      }
      else if (this.wettkampf.status == 1) {
        this.status = "aktiv"
      }
    }, error => {
      alert(error.status + " " + error.statusText);
    });
  }

  getBiggestPoints(id) {

    this.api.getBiggestPoints(id).subscribe(res => {

      this.team = res[0];
    }, error => {
      alert(error.status + " " + error.statusText);
    });
  }

  getGalleryPics() {
    this.gallery.getAllImages().subscribe(res => this.galleryPics = res);
  }

  imageDescription(id: number) {

    if (this.openAble) {

      let data = { pictures: this.galleryPics, pictureID: id }

      this.dialog.open(ImageComponentComponent, { disableClose: true, data: data });
    }
  }

}
