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
        gegUser: any;
        singleModel: number;
    }

    class Gebruiker implements IGebruiker {
        static controllerId = 'Gebruiker';
        title: string;
        user: app.domain.IUser;
        inlogGegevens: any;
        gegUser: any;
        singleModel: number;
        /* @ngInject */
        static $inject = ['logger',
            'firebaseData',
            'Auth',
            'Ref',
            '$state',
            'currentAuth',
            'userService'
        ];
        constructor(
            
            private logger: any,
            private firebaseData: any,
            private Auth: any,
            private Ref: any,
            private $state: any,
            private currentAuth: any,
            private userService: any) {
            this.init();
        }
        private init() {
            this.title = 'Gebruikersoverzicht';
            this.singleModel = 0;
            if (!this.currentAuth) {
                this.$state.go('login');
            }
            
            this.user = this.userService.getUserAsync();
            this.gegUser = this.firebaseData.getGebruiker;
            //this.getUser();
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

        private getUser(): void {
            if (!this.currentAuth) {
                return;
            }
            this.Ref.child('users').child(this.currentAuth.uid).once('value', function(snapshot) {
                  Gebruiker.prototype.makeUser(snapshot.val())             
            });
        }

        private makeUser(data) {
            var _achterNaam: string;
            var _email: string;
            var _voorNaam: string;
           
            /**
             * deze gebruik ik nu om geguser wat zichtbaar te maken voor ontwikkeling
             * hierna gewoon var x = data gebruiken
             */
            //Gebruiker.prototype.gegUser = data;
            this.gegUser = data;
            var x = this.gegUser;
            //alert(x.achterNaam)
            switch (x.provider) {
                case 'password':

                    if (!x.achterNaam) {
                        _achterNaam = '';
                    }
                    else {
                        _achterNaam = x.achterNaam;
                    }
                    if (!x.voorNaam) {
                        _voorNaam = '';
                    }
                    else {
                        _voorNaam = x.voorNaam;
                    }
                    if (!x.email) {
                        _email = x.password.email;
                    }
                    else {
                        _email = x.email;
                    }
                    break;

                case 'facebook':
                    if (!x.achterNaam) {
                        _achterNaam = x.facebook.cachedUserProfile.last_name;
                    }
                    else {
                        _achterNaam = x.achterNaam;
                    }
                    if (!x.voorNaam) {
                        _voorNaam = x.facebook.cachedUserProfile.first_name;
                    }
                    else {
                        _voorNaam = x.voorNaam;
                    }
                    if (!x.email) {
                        _email = x.facebook.cachedUserProfile.email;
                    }
                    else {
                        _email = x.email;
                    }

                    break;

                case 'google':
                    if (x.achterNaam === undefined) {
                        _achterNaam = x.google.cachedUserProfile.family_name;
                    }
                    else {
                        _achterNaam = x.achterNaam;
                    }
                    if (!x.voorNaam) {
                        _voorNaam = x.google.cachedUserProfile.given_name;
                    }
                    else {
                        _voorNaam = x.voorNaam;
                    }
                    if (!x.email) {
                        _email = '';
                    }
                    else {
                        _email = x.email;
                    }

                    break;

                //default:
                case undefined:
                if (!x.achterNaam) {
                        _achterNaam = '';
                    }
                    else {
                        _achterNaam = x.achterNaam;
                    }
                    if (!x.voorNaam) {
                        _voorNaam = '';
                    }
                    else {
                        _voorNaam = x.voorNaam;
                    }
                    if (!x.email) {
                        _email = '';
                    }
                    else {
                        _email = x.email;
                    }
                    break;
                    break;
            }

            this.user = new app.domain.User(_achterNaam, _email, _voorNaam);
        }

        activate(): void {
            this.logger.info('Gebruikersoverzicht');
        }
    }

    angular
        .module('app.gebruiker')
        .controller(Gebruiker.controllerId, Gebruiker);
}
