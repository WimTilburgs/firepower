module app.domain {
    export interface IUser {
        achterNaam: string;
        //email: string;
        //geboorteDatum: Date;
        //geslacht: string;
        voorNaam: string; 
    }  
    export class User implements IUser {
        name:string;
        constructor(
        public achterNaam: string,
        
        public voorNaam: string       
        ){
            this.name = voorNaam + ' ' + achterNaam;
        }
        export = app.domain;
    }
    
}