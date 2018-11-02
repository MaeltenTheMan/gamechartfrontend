import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'colorbackground'})
export class ColorBackground implements PipeTransform {

    transform(value: number, pipedObject: any){
     
        if(pipedObject.find(x=>x.id === value)!= undefined){

            return pipedObject.find(x=>x.id === value).code;

        } else {
            return "grey"
        }   
    }
}