module app.domain {
    export interface IUser {
        achterNaam: string;
        email: string;
        geboorteDatum: Date;
        geslacht: string;
        voorNaam: string; 
    }  
    export class User implements IUser {
        nam:string;
        constructor(
        public achterNaam: string,
        public email: string,
        public geboorteDatum: Date,
        public geslacht: string,
        public voorNaam: string       
        ){
            this.nam = voorNaam + ' ' + achterNaam;
        }
        export = app.domain;
    }
    
}