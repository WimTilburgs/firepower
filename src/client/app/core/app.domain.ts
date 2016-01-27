module app.domain {
    export interface IUser {
        achterNaam: string;
        email: string;
        //geboorteDatum: Date;
        //geslacht: string;
        voorNaam: string; 
    }  
    export class User implements IUser {
        naam: string;
        constructor(
        public achterNaam: string,
        public email: string,
        public voorNaam: string       
        ){
            this.naam = voorNaam + ' ' + achterNaam;
        }
        export = app.domain;
    }
    
}