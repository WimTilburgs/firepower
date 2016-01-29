module app.domain {
    export interface IUser {
        
        achterNaam: string;
        email: string;
        //geboorteDatum: Date;
        //geslacht: string;
        voorNaam: string; 
        uid?: string;
    }  
    export class User implements IUser {
        naam: string;
        constructor(
            
        public achterNaam: string,
        public email: string,
        public voorNaam: string,
        public uid?: string       
        ){
            this.naam = voorNaam + ' ' + achterNaam;
        }
        export = app.domain;
    }
    
    export interface IOneRepMax {
        oefeningUid: string;
        oefeningOmschrijving: string;
        gebruikerUid: string;
        gebruikerNaam: string;
        datum: any;
        orm: number;
        uid?: string;
    }
    
    export class OneRepMax implements IOneRepMax {
        constructor (
            public oefeningUid: string,
            public oefeningOmschrijving: string,
            public gebruikerUid: string,
            public gebruikerNaam: string,
            public datum: any,
            public orm: number,
            public uid?: string
        ) {}
    }
    
}