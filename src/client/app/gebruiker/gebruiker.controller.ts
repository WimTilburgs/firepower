///<reference path="../../../../typings/angularjs/angular.d.ts"/>
module app.controller {
    interface IGebruiker {
        title: string;
        user: app.domain.IUser
        activate: () => void;
    }

    class Gebruiker implements IGebruiker {
        static controllerId = 'Gebruiker';
        title: string;
        user: app.domain.IUser;
        /* @ngInject */
        static $inject = ['logger','firebaseData'];
        constructor(private logger: any , private firebaseData: any) {
            this.init();
        }
        private init() {
            this.title = 'Gebruikersoverzicht',
            this.user = this.firebaseData.getGebruiker;
            
            
             this.logger.info(this.user)
                this.activate();
        }
        activate(): void {
            this.logger.info('Gebruikersoverzicht')
            
        }
    }

    angular
        .module('app.gebruiker')
        .controller(Gebruiker.controllerId, Gebruiker);
}
module app.domain {
    export interface IUser {
        achterNaam: string;
        email: string;
        geboorteDatum: Date;
        geslacht: string;
        voorNaam: string; 
    }  
    export class User implements IUser {
        naam:string;
        constructor(
        public achterNaam: string,
        public email: string,
        public geboorteDatum: Date,
        public geslacht: string,
        public voorNaam: string       
        ){
            this.naam = voorNaam + ' ' + achterNaam;
        }
        export = app.domain;
    }
    
}