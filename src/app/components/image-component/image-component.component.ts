import { GalleryPic } from './../../models/GalleryPic';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-image-component',
  templateUrl: './image-component.component.html',
  styleUrls: ['./image-component.component.scss']
})
export class ImageComponentComponent implements OnInit {

  pictures: GalleryPic[];
  width: string;
  picture: GalleryPic;

  constructor(
    private dialog: MatDialogRef<ImageComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
        
    this.pictures = this.data.pictures;

    this.findPicture(this.data.pictureID);
   
    this.dialog.updateSize("900px");

  }

  close(){
    this.dialog.close();
  }

  findPicture(id: number){
    this.picture = this.pictures.slice(0).find(image => image.id == id);
  }

}
