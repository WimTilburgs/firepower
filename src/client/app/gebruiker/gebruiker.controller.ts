///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
module app.controller {
    interface IGebruiker {
        title: string;
        user: app.domain.IUser;
        inlogGegevens: any;
        activate: () => void;
    }

    class Gebruiker implements IGebruiker {
        static controllerId = 'Gebruiker';
        title: string;
        user: app.domain.IUser;
        inlogGegevens: any;
        /* @ngInject */
        static $inject = ['logger','firebaseData'];
        constructor(private logger: any , private firebaseData: any) {
            this.init();
        }
        private init() {
            this.title = 'Gebruikersoverzicht',
            this.user = this.firebaseData.getGebruiker;
            this.inlogGegevens = this.firebaseData.getAuthGegevens;
            
             this.logger.info(this.user.achterNaam)
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
