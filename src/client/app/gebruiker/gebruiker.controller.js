///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var Gebruiker = (function () {
            function Gebruiker(logger, firebaseData, Auth, Ref) {
                this.logger = logger;
                this.firebaseData = firebaseData;
                this.Auth = Auth;
                this.Ref = Ref;
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
                this.Ref.child('users').child(authData.uid).once('value', function (snapshot) {
                    Gebruiker.prototype.makeUser(snapshot.val());
                });
            };
            Gebruiker.prototype.makeUser = function (data) {
                var _achterNaam;
                var _email;
                var _voorNaam;
                Gebruiker.prototype.gegUser = data;
                var x = Gebruiker.prototype.gegUser;
                if (x.provider == 'password') {
                    if (!x.email) {
                        _email = x.password.email;
                    }
                    else {
                        _email = x.email;
                    }
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
            Gebruiker.$inject = ['logger', 'firebaseData', 'Auth', 'Ref'];
            return Gebruiker;
        })();
        angular
            .module('app.gebruiker')
            .controller(Gebruiker.controllerId, Gebruiker);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
