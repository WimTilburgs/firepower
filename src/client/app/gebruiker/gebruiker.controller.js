///<reference path="../../../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var Gebruiker = (function () {
            function Gebruiker(logger, firebaseData) {
                this.logger = logger;
                this.firebaseData = firebaseData;
                this.init();
            }
            Gebruiker.prototype.init = function () {
                this.title = 'Gebruikersoverzicht',
                    this.user = this.firebaseData.getGebruiker;
                this.logger.info(this.user);
                this.activate();
            };
            Gebruiker.prototype.activate = function () {
                this.logger.info('Gebruikersoverzicht');
            };
            Gebruiker.controllerId = 'Gebruiker';
            /* @ngInject */
            Gebruiker.$inject = ['logger', 'firebaseData'];
            return Gebruiker;
        })();
        angular
            .module('app.gebruiker')
            .controller(Gebruiker.controllerId, Gebruiker);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
var app;
(function (app) {
    var domain;
    (function (domain) {
        var User = (function () {
            function User(achterNaam, email, geboorteDatum, geslacht, voorNaam) {
                this.achterNaam = achterNaam;
                this.email = email;
                this.geboorteDatum = geboorteDatum;
                this.geslacht = geslacht;
                this.voorNaam = voorNaam;
                this.export = app.domain;
                this.naam = voorNaam + ' ' + achterNaam;
            }
            return User;
        })();
        domain.User = User;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
