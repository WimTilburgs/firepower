///<reference path="../../../../typings/lodash/lodash.d.ts"/>

module app.domain {
    export interface IUser {
        
        achterNaam: string;
        email: string;
        //geboorteDatum: Date;
        //geslacht: string;
        voorNaam: string; 
        uid?: string;
        
        getUser(gebruiker:any): IUser; 
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
       getUser(gebruiker): IUser {
           var _achterNaam: string;
            var _email: string;
            var _voorNaam: string;

            angular.forEach(gebruiker, function(value, key) {
                //console.log(key, value);
                if (key == 'voorNaam') {
                    _voorNaam = value
                };
                if (key == 'achterNaam') {
                    _achterNaam = value
                };
                if (key == 'email') {
                    _email = value
                };
            });
            return new User(_achterNaam, _email, _voorNaam,gebruiker.$id);
       }
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