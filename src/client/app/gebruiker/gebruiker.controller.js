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
                this.title = 'Gebruikersoverzicht',
                    this.gegUser = this.firebaseData.getGebruiker;
                console.log(this.gegUser.provider);
                this.user = new app.domain.User('jassan', 'hassan');
                this.activate();
            };
            Gebruiker.prototype.getUser = function () {
                var authData = this.Auth.$getAuth();
                if (authData) {
                    this.Ref.child('users').child(authData.uid).once('value', function (snapshot) {
                        if (snapshot.val() === null) {
                            return snapshot.val();
                        }
                        else {
                            console.log(snapshot.val());
                            return new app.domain.User('Tilburgs', 'Wim');
                        }
                        //return snapshot.val();
                    });
                }
            };
            Gebruiker.prototype.activate = function () {
                this.logger.info('Gebruikersoverzicht');
                this.gegUser.$loaded(function () {
                    this.user = new app.domain.User('jassan', 'hassan');
                });
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
