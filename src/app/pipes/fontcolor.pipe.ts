import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'fontcolorpipe'})
export class FontColorPipe implements PipeTransform {

    transform(value: number, pipedObject: any){
     
        if(pipedObject.find(x=>x.id === value)!= undefined){

            return pipedObject.find(x=>x.id === value).charcode;

        } else {
            return "black"
        }   
    }
}