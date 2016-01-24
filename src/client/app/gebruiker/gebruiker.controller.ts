///<reference path="../../../../typings/angularjs/angular.d.ts"/>
module app.controllers {
    export interface IGebruiker {
        title: string;
        user: any;
        activate: () => void;
    }

    export class Gebruiker implements IGebruiker {
        static controllerId = 'Gebruiker';
        title: string;
        user: any;
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