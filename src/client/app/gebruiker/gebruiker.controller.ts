///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
module app.controller {
    interface IGebruiker {
        title: string;
        user: app.domain.IUser;
        inlogGegevens: any;
        activate: () => void;
        userOpslaan: () => void;
        gebruiker: any;
        singleModel: number;
    }

    class Gebruiker implements IGebruiker {
        static controllerId = 'Gebruiker';
        title: string;
        user: app.domain.IUser;
        inlogGegevens: any;
        gebruiker: any;
        singleModel: number;
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
            this.singleModel = 0;
            if (!this.currentAuth) {
                this.$state.go('login');
            }
            
            this.gebruiker = this.firebaseData.getGebruiker;
            this.activate();
        }

        userOpslaan(): void {
            this.Ref.child('users').child(this.currentAuth.uid).update(
                {
                    'voorNaam': this.user.voorNaam,
                    'achterNaam': this.user.achterNaam,
                    'email': this.user.email
                });
        }

        test():void {
           
            this.$state.go('gebruiker.trainen');
        }

        activate(): void {
            this.logger.info('Gebruikersoverzicht');
            this.gebruiker.$loaded().then(function(response) {
                var _achterNaam: string = '';
                var _email: string = '';
                var _voorNaam: string = '';
                var _uid: string = ''

                angular.forEach(response, function(value, key) {
                
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
                Gebruiker.prototype.user = new app.domain.User(_achterNaam, _email, _voorNaam,response.$id);
            })
        }
    }

    angular
        .module('app.gebruiker')
        .controller(Gebruiker.controllerId, Gebruiker);
}
