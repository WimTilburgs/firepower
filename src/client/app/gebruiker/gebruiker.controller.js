///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
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
                this.inlogGegevens = this.firebaseData.getAuthGegevens;
                this.logger.info(this.user.achterNaam);
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
