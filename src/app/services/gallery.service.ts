import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GalleryPic } from '../models/GalleryPic';

@Injectable()
export class GalleryService {

    constructor(private http: HttpClient){

    }

    getAllImages(){
        
        return this.http.get<GalleryPic[]>("./assets/Json-Objects/galleryPictures.json");
    }


}
