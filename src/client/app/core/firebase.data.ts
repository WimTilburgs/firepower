///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>

module app.core {
    interface IFireData {
        
        fbUrl: string;
        user: app.domain.IUser;
    }

    export class FireData
        implements IFireData {

        user: app.domain.IUser;
        fbUrl: string = 'https://firepower.firebaseio.com';
        ref: any;

        /* @ngInject */
        static $inject = ['logger',
            '$window',
            '$firebaseArray',
            '$firebaseObject',
            

        ];

        constructor(
            private logger: any,
            private $window: any,
            private $firebaseArray: any,
            private $firebaseObject: any
        ) {

            this.init();
        }

        private init(): void {
            this.ref = new this.$window.Firebase(this.fbUrl);
        }
        
        getRoot(): any {
            return this.$firebaseArray(this.ref);
        }

        getGebruiker(authData): any {
            return this.$firebaseObject(this.ref.child('users').child(authData.uid));
        }
        
        getOefeningen(): any {
            return this.$firebaseArray(this.ref.child('oefeningen'));
        }
        
        getOneRepMaxen(): any {
            return this.$firebaseArray(this.ref.child('oneRepMaxen'));
        }
        
        // getOneRepMaxenPerGebruiker(userUid): any{
        //     return this.$firebaseArray(this.ref.child('oneRepMaxen')
        //     .orderByChild('gebruikerUid').equalTo(userUid));
        // }
        
        getOneRepMaxenPerGebruiker(userUid): any{
            return this.$firebaseArray(this.ref.child('users').child(userUid).child('oneRepMaxen'));
            //.orderByChild('gebruikerUid').equalTo(userUid));
        }
        
        // getTrainingsMethodes(): any {
        //     return this.$firebaseArray(this.ref.child('trainingsMethodes'));
        // }
        
        /**
         * Haal alle oefeningen
         */
        haalOefeningen(): any {
            return this.$firebaseArray(this.ref.child('stamGegevens').child('oefeningen'));
        }
        
        /**
         * Haal alle TrainingsMethodes
         */
        haalTrainingsMethodes(): any {
            return this.$firebaseArray(this.ref.child('stamGegevens').child('trainingsMethodes'));
        }
        
        /**
         * Haal alle TrainingsSchemas behorende bij een trainingsMethodes
         * parameter is de trainingsMethodeUid
         */
        haalTrainingsSchemas(methodeUid: string): any {
            return this.$firebaseArray(this.ref.child('stamGegevens').child('trainingsMethodes').child(methodeUid).child('trainingsSchemas'));
        }
        
        getTrainingsSchemas(): any {
            return this.$firebaseArray(this.ref.child('trainingsSchemas'));
        }


    }
    angular
        .module('app.core')
        .service('fireData', FireData);
}