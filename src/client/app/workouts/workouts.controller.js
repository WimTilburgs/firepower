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
                //this.oefeningen = this.fireData.getOefeningen();
                //this.oefeningen = this.fbRoot
                this.trainingsMethodes = this.fireData.getTrainingsMethodes();
                this.trainingsSchemas = this.fireData.getTrainingsSchemas();
                this.fbRoot = this.fireData.getRoot();
                this.fbRoot.$loaded().then(function (response) {
                    var repmax = {};
                    var repmaxen = {};
                    var oefeningen = {};
                    var temp = [];
                    //console.log(response);
                    angular.forEach(response, function (value, key) {
                        if (value.$id === 'oefeningen') {
                            Workouts.prototype.oefeningen = value;
                            oefeningen = value;
                        }
                        if (value.$id === 'oneRepMaxen') {
                            Workouts.prototype.oneRepMaxen = value;
                            repmaxen = value;
                        }
                        //console.log(key, value.$id);
                        //Workouts.prototype.oefeningen = response[2];
                        //var temp = response[2];
                        //console.log(temp);
                    });
                    angular.forEach(Workouts.prototype.oefeningen, function (value, key) {
                        console.log(key, value);
                        //if(value.$id === 'oefeningUid') {}
                        //console.log(value)
                        repmax = _(repmaxen).filter({ 'oefeningUid': key }).maxBy('orm');
                        temp.push(repmax);
                        //console.log(temp);
                        //Workouts.prototype.oneRepMaxenPerOefening = temp;
                    });
                });
                this.gebruiker = this.fireData.getGebruiker(this.currentAuth);
                this.gebruiker.$loaded().then(function (response) {
                    Workouts.prototype.user = app.domain.User.prototype.getUser(response);
                    //Workouts.prototype.userService.getUser(response) //app.core.UserService.prototype.getUser(response);
                });
                //this.oneRepMaxen = this.fireData.getOneRepMaxenPerGebruiker(this.currentAuth.uid);
                //this.oneRepMaxen.$loaded().then(function (response) {
                //var result  = _(response).orderBy('percentage','desc').take(2).value();
                //var xoefenTemp = _.map(oefenTemp,oefenTemp.$id); 
                this.activate();
            };
            Workouts.prototype.bekijkSchema = function (m) {
                this.geselecteerdeTrainingsMethode = m;
                this.gefilterdTrainingsSchema = _.filter(this.trainingsSchemas, { 'trainingsMethodeId': this.geselecteerdeTrainingsMethode.$id });
                var people = [
                    { name: 'Wim', age: 55 },
                    { name: 'Sammy', age: 16 },
                    { name: 'Saida', age: 51 }
                ];
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
