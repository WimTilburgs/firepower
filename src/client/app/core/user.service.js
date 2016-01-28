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
            UserService.prototype.getTest = function () {
                var _achterNaam = 'achternaam';
                var _email = 'email';
                var _voorNaam = 'voornaam';
                return this.user = new app.domain.User(_achterNaam, _email, _voorNaam);
            };
            UserService.prototype.serviceMethod = function () {
                return this.$timeout(function () {
                    return {
                        property: app.core.UserService.prototype.user
                    };
                }, 1000);
            };
            UserService.prototype.getUserAsync = function () {
                var _achterNaam = '';
                var _email = '';
                var _voorNaam = '';
                //var user = app.core.UserService.prototype.user;
                var authData = this.Auth.$getAuth();
                if (!authData) {
                    app.core.UserService.prototype.user = new app.domain.User(_achterNaam, _email, _voorNaam);
                    return app.core.UserService.prototype.user;
                }
                var loadedUser = this.firebaseData.getGebruiker;
                loadedUser.$loaded().then(function (response) {
                    return response;
                });
                angular.forEach(loadedUser, function (value, key) {
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
                //alert(_achterNaam)
                app.core.UserService.prototype.user = new app.domain.User(_achterNaam, _email, _voorNaam);
                //console.log(app.core.UserService.prototype.user);
                //return app.core.UserService.prototype.user;
                console.log('hier is de loaded user');
                console.log(loadedUser);
                console.log('de user');
                console.log(app.core.UserService.prototype.user);
                //return loadedUser;
                return app.core.UserService.prototype.user;
            };
            UserService.prototype.getUser = function () {
                //var promise =
                var _achterNaam = 'achternaam';
                var _email = 'email';
                var _voorNaam = 'voornaam';
                //return this.user = new app.domain.User(_achterNaam, _email, _voorNaam);
                var authData = this.Auth.$getAuth();
                if (authData) {
                    var loadedUser = this.firebaseData.getGebruiker;
                    loadedUser.$loaded().then(function () {
                        angular.forEach(loadedUser, function (value, key) {
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
                        app.core.UserService.prototype.user = new app.domain.User(_achterNaam, _email, _voorNaam);
                        //console.log(this.user);
                        return this.user;
                    });
                }
                else {
                    //alert('else');
                    //return null;
                    return this.user = new app.domain.User(_achterNaam, _email, _voorNaam);
                }
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
