///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>

module app.core {
    interface IUserService {
        user: app.domain.IUser;
    }

    export class UserService
        implements IUserService {

        user: app.domain.IUser;

        /* @ngInject */
        static $inject = ['logger',
            'firebaseData',
            'Auth',
            'Ref',
            '$state',
            '$timeout'

        ];

        constructor(
            private logger: any,
            private firebaseData: any,
            private Auth: any,
            private Ref: any,
            private $state: any,
            private $timeout: any
        ) {
            
            //console.log(this.Ref.child('users'))
        }

        getUser(gebruiker): app.domain.IUser {

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
            //app.core.UserService.prototype.user = new app.domain.User(_achterNaam, _email, _voorNaam,gebruiker.$id);
            //console.log(this.user);
            //return this.user;
            return new app.domain.User(_achterNaam, _email, _voorNaam,gebruiker.$id);
        }

        private makeUser(data) {
            var _achterNaam: string;
            var _email: string;
            var _voorNaam: string;

            var x = data;
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

                default:
                    break;
            }

            return this.user = new app.domain.User(_achterNaam, _email, _voorNaam);
        }
    }
    angular
        .module('app.core')
        .service('userService', UserService);
}