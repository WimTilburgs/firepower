///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
module app.controller {
   

    class Gebruiker{
        static controllerId = 'Gebruiker';
        title: string;
        user: app.domain.IUser;
       
       
        /* @ngInject */
        static $inject = ['logger',
            'firebaseData',
            'Auth',
            'Ref',
            '$state',
            'currentAuth',
            
        ];
        constructor(
            
            private logger: any,
            private firebaseData: any,
            private Auth: any,
            private Ref: any,
            private $state: any,
            private currentAuth: any
            ) {
            this.init();
        }
        private init() {
            this.title = 'Gebruikersoverzicht';
           
            if (!this.currentAuth) {
                this.$state.go('login');
            }
            
            
            this.activate();
        }

        userOpslaan(): void {
            this.Ref.child('users').child(this.currentAuth.uid).child("data").update(
                {
                    'voorNaam': this.user.voorNaam,
                    'achterNaam': this.user.achterNaam,
                    'email': this.user.email
                });
        }

       

        activate(): void {
            
        }
    }

    angular
        .module('app.gebruiker')
        .controller(Gebruiker.controllerId, Gebruiker);
}
