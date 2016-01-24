///<reference path="../../../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var Gebruiker = (function () {
            function Gebruiker(logger, firebaseData) {
                this.logger = logger;
                this.firebaseData = firebaseData;
                this.init();
            }
            Gebruiker.prototype.init = function () {
                this.title = 'Gebruikersoverzicht',
                    this.user = this.firebaseData.getGebruiker;
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
        controllers.Gebruiker = Gebruiker;
        angular
            .module('app.gebruiker')
            .controller(Gebruiker.controllerId, Gebruiker);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
