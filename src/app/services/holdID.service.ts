import { Injectable } from '@angular/core';

@Injectable()
export class HoldIDService {
    wettkampfID: number;


    setWettkampf(id: number){
        this.wettkampfID = id;
    }

  
}