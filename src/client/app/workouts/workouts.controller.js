///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
///<reference path="../core/firebase.data.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var Workouts = (function () {
            function Workouts(logger, $state, currentAuth, _, fireData) {
                this.logger = logger;
                this.$state = $state;
                this.currentAuth = currentAuth;
                this._ = _;
                this.fireData = fireData;
                this.stap1Title = 'Stap 1 : Selecteer een trainingsmethode';
                this.toonMethodes = true;
                this.toon1Rm = false;
                this.geselecteerdeOefening1rm = 0;
                this.init();
            }
            Workouts.prototype.init = function () {
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                this.trainingsMethodes = this.fireData.haalTrainingsMethodes();
                // if (!this.currentAuth) {
                //     return;
                // }
                this.gebruiker = this.fireData.getGebruiker(this.currentAuth);
                this.gebruiker.$loaded().then(function (response) {
                    Workouts.prototype.oneRepMaxenPerOefening = app.domain.OneRepMaxen.prototype.getActueleOneRepMaxen(response.oneRepMaxen);
                });
                this.activate();
            };
            Workouts.prototype.haalSchemaUitTrainingsMethode = function (tmethode) {
                var schemas = [];
                angular.forEach(tmethode.trainingsSchemas, function (value, key) {
                    schemas.push(value);
                });
                return schemas;
            };
            Workouts.prototype.bekijkSchema = function (tmethode) {
                var schemas = this.haalSchemaUitTrainingsMethode(tmethode);
                this.schemaGegroepeerdPerWorkout = _.chain(schemas)
                    .groupBy("workoutNummer")
                    .value();
            };
            Workouts.prototype.toonSchemaMetOefening1rm = function (oefening) {
                this.geselecteerdeOefening1rm = oefening.orm;
                this.bekijkSchema(this.geselecteerdeTrainingsMethode);
            };
            Workouts.prototype.selecteerTrainingsMethode = function (tmethode) {
                this.toonMethodes = false;
                this.toon1Rm = true;
                this.geselecteerdeTrainingsMethode = tmethode;
                //this.geselecteerdeTrainingsSchemas = this.haalSchemaUitTrainingsMethode(tmethode)
                this.stap1Title = "Geselecteerde methode = " + tmethode.omschrijving;
            };
            Workouts.prototype.activate = function () {
                this.logger.info('Workouts');
            };
            Workouts.controllerId = 'Workouts';
            /* @ngInject */
            Workouts.$inject = ['logger',
                '$state',
                'currentAuth',
                '_',
                'fireData',
                'userService'
            ];
            return Workouts;
        })();
        angular
            .module('app.workouts')
            .controller(Workouts.controllerId, Workouts);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
