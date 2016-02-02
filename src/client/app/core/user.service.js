///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
var app;
(function (app) {
    var core;
    (function (core) {
        var UserService = (function () {
            function UserService(logger, firebaseData, Auth, Ref, $state, $timeout) {
                this.logger = logger;
                this.firebaseData = firebaseData;
                this.Auth = Auth;
                this.Ref = Ref;
                this.$state = $state;
                this.$timeout = $timeout;
                //console.log(this.Ref.child('users'))
            }
            UserService.prototype.getUser = function (gebruiker) {
                var _achterNaam;
                var _email;
                var _voorNaam;
                angular.forEach(gebruiker, function (value, key) {
                    //console.log(key, value);
                    if (key == 'voorNaam') {
                        _voorNaam = value;
                    }
                    ;
                    if (key == 'achterNaam') {
                        _achterNaam = value;
                    }
                    ;
                    if (key == 'email') {
                        _email = value;
                    }
                    ;
                });
                //app.core.UserService.prototype.user = new app.domain.User(_achterNaam, _email, _voorNaam,gebruiker.$id);
                //console.log(this.user);
                //return this.user;
                return new app.domain.User(_achterNaam, _email, _voorNaam, gebruiker.$id);
            };
            UserService.prototype.makeUser = function (data) {
                var _achterNaam;
                var _email;
                var _voorNaam;
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
            };
            /* @ngInject */
            UserService.$inject = ['logger',
                'firebaseData',
                'Auth',
                'Ref',
                '$state',
                '$timeout'
            ];
            return UserService;
        })();
        core.UserService = UserService;
        angular
            .module('app.core')
            .service('userService', UserService);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
