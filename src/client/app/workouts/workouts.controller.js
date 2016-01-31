///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var Workouts = (function () {
            function Workouts(logger, firebaseData, Ref, $state, currentAuth, _) {
                this.logger = logger;
                this.firebaseData = firebaseData;
                this.Ref = Ref;
                this.$state = $state;
                this.currentAuth = currentAuth;
                this._ = _;
                this.toonTrainingenGenereren = false;
                this.toonStap1 = false;
                this.toonStap2 = false;
                this.init();
            }
            Workouts.prototype.init = function () {
                this.stap1Title = 'Stap 1: selecteer een methode.';
                this.stap2Title = 'Stap 2: bepaal je 1 rep max.';
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                this.trainingsMethodes = this.firebaseData.getTrainingsMethodes;
                this.trainingsSchemas = this.firebaseData.getTrainingsSchemas;
                this.gebruiker = this.firebaseData.getGebruiker;
                this.activate();
            };
            Workouts.prototype.bekijkSchema = function (m) {
                this.geselecteerdeTrainingsMethode = m;
                this.gefilterdTrainingsSchema = _.filter(this.trainingsSchemas, { 'trainingsMethodeId': this.geselecteerdeTrainingsMethode.$id });
            };
            Workouts.prototype.selecteerTrainingsMethode = function () {
                this.toonStap1 = false;
                this.toonStap2 = true;
                this.stap1Title = "Methode = " + this.geselecteerdeTrainingsMethode.omschrijving;
            };
            Workouts.prototype.anuleerTrainingsMethode = function () {
                this.gefilterdTrainingsSchema = {};
            };
            Workouts.prototype.activate = function () {
                this.logger.info('Gebruikersoverzicht');
                this.gebruiker.$loaded().then(function (response) {
                    var _achterNaam = '';
                    var _email = '';
                    var _voorNaam = '';
                    var _uid = '';
                    angular.forEach(response, function (value, key) {
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
                    Workouts.prototype.user = new app.domain.User(_achterNaam, _email, _voorNaam, response.$id);
                });
            };
            Workouts.controllerId = 'Workouts';
            /* @ngInject */
            Workouts.$inject = ['logger',
                'firebaseData',
                'Ref',
                '$state',
                'currentAuth',
                '_'
            ];
            return Workouts;
        })();
        angular
            .module('app.workouts')
            .controller(Workouts.controllerId, Workouts);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
