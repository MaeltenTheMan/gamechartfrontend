import { NativeDateAdapter } from '@angular/material';

export class CustomDateAdapter extends NativeDateAdapter {


    private jahr:number =new Date().getFullYear();
    
     
    format(date: Date, displayFormat: Object): string {
        //date.setHours(date.getHours() + 4);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return this._to2digit(day) + "." + this._to2digit(month) + "." + year;
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }

    parse(value: any): Date | null {
        if (value instanceof Date) {
            return value;
        }


        if (typeof (value) === 'string') {

            const s: String = new String(value);
            const feld: Array<String> = s.split(".");



            if (feld.length == 3) {

                

                let d: Date = new Date(parseInt(feld[2].toString()), parseInt(feld[1].toString()) - 1, parseInt(feld[0].toString()));

                if( this.jahr - d.getFullYear() >=70){

                    d.setFullYear(d.getFullYear()+100);
                }

                return d;

            }





        }





        const datum: Date = super.parse(value);
        return datum;
    }
}