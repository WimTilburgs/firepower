///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var Gebruiker = (function () {
            function Gebruiker(logger, firebaseData, Auth, Ref, $state) {
                this.logger = logger;
                this.firebaseData = firebaseData;
                this.Auth = Auth;
                this.Ref = Ref;
                this.$state = $state;
                this.init();
            }
            Gebruiker.prototype.init = function () {
                //this.getUser();
                //this.user = new app.domain.User('Tilburgs' , 'Wim');
                //this.inlogGegevens = this.firebaseData.getAuthGegevens;
                //console.log(this.inlogGegevens)
                this.title = 'Gebruikersoverzicht';
                this.getUser();
                this.activate();
            };
            Gebruiker.prototype.userOpslaan = function () {
                var authData = this.firebaseData.getAuthGegevens;
                this.Ref.child('users').child(authData.uid).update({
                    'voorNaam': this.user.voorNaam,
                    'achterNaam': this.user.achterNaam,
                    'email': this.user.email
                });
                //alert(this.user.voorNaam) 
            };
            Gebruiker.prototype.getUser = function () {
                var authData = this.firebaseData.getAuthGegevens;
                if (!authData) {
                    this.$state.go('login');
                }
                else {
                    this.Ref.child('users').child(authData.uid).once('value', function (snapshot) {
                        Gebruiker.prototype.makeUser(snapshot.val());
                    });
                }
            };
            Gebruiker.prototype.makeUser = function (data) {
                var _achterNaam;
                var _email;
                var _voorNaam;
                /**
                 * deze gebruik ik nu om geguser wat zichtbaar te maken voor ontwikkeling
                 * hierna gewoon var x = data gebruiken
                 */
                Gebruiker.prototype.gegUser = data;
                var x = Gebruiker.prototype.gegUser;
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
                    //break;
                    default:
                }
                Gebruiker.prototype.user = new app.domain.User(_achterNaam, _email, _voorNaam);
            };
            Gebruiker.prototype.activate = function () {
                this.logger.info('Gebruikersoverzicht');
                //     this.gegUser.$loaded(function () {
                //     console.log(this.gegUser);
                //     var test = 'Tilburgs'
                //     Gebruiker.prototype.user = new app.domain.User(test,'wim');
                // })
            };
            Gebruiker.controllerId = 'Gebruiker';
            /* @ngInject */
            Gebruiker.$inject = ['logger', 'firebaseData', 'Auth', 'Ref', '$state'];
            return Gebruiker;
        })();
        angular
            .module('app.gebruiker')
            .controller(Gebruiker.controllerId, Gebruiker);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
