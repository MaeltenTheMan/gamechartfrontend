import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'idToNameConverter'})
export class IDToNameConverter implements PipeTransform {

    transform(value: number, pipedObject: any){
     
        if(pipedObject.find(x=>x.id === value)!= undefined){

            return pipedObject.find(x=>x.id === value).name;

        } else {
            return "Team gelöscht"
        }   
    }
}