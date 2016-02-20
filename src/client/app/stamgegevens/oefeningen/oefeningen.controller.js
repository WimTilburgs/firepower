///<reference path="../../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../../core/app.domain.ts"/>
///<reference path="../../core/firebase.data.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var Oefeningen = (function () {
            function Oefeningen(logger, $state, fireData) {
                this.logger = logger;
                this.$state = $state;
                this.fireData = fireData;
                this.toonButtonNieuw = true;
                this.init();
            }
            Oefeningen.prototype.init = function () {
                this.title = 'Onderhoud oefeningen';
                this.oefeningen = this.fireData.haalOefeningen();
                this.activate();
            };
            Oefeningen.prototype.oefeningSelecteren = function (oefening) {
                this.geselecteerdeOefening = oefening;
                this.toonButtonNieuw = false;
            };
            Oefeningen.prototype.oefeningOpslaan = function () {
                var oefening = this.geselecteerdeOefening;
                var nieuweOefening = new app.domain.Oefeningen(oefening.omschrijving, oefening.afkorting, oefening.barbellGewicht, oefening.sqlId, 0);
                this.oefeningen.$add(oefening);
                this.geselecteerdeOefening = null;
            };
            Oefeningen.prototype.oefeningWijzigen = function () {
                this.geselecteerdeOefening.ophoogGewicht = 0;
                this.oefeningen.$save(this.geselecteerdeOefening);
                this.geselecteerdeOefening = null;
                this.toonButtonNieuw = true;
            };
            Oefeningen.prototype.oefeningVerwijderen = function () {
                this.oefeningen.$remove(this.geselecteerdeOefening);
                this.geselecteerdeOefening = null;
                this.toonButtonNieuw = true;
            };
            Oefeningen.prototype.oefeningOpslaanTonen = function () {
                this.geselecteerdeOefening = null;
                this.toonButtonNieuw = true;
            };
            Oefeningen.prototype.activate = function () {
                this.logger.info('oefeningenView wordt getoond');
            };
            Oefeningen.controllerId = 'Oefeningen';
            /* @ngInject */
            Oefeningen.$inject = ['logger',
                '$state',
                'fireData'
            ];
            return Oefeningen;
        })();
        angular
            .module('app.stamgegevens')
            .controller(Oefeningen.controllerId, Oefeningen);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
