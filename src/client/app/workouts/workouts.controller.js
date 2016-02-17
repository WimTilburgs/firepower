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
                this.toonMethodes = true;
                this.toonTrainingenGenereren = false;
                this.kijkSchema = false;
                this.toon1Rm = false;
                this.schemaGegroepeerdPerWorkout = {};
                this.init();
            }
            Workouts.prototype.init = function () {
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                this.trainingsMethodes = this.fireData.haalTrainingsMethodes();
                this.trainingsSchemas = this.fireData.getTrainingsSchemas();
                //           this.fbRoot = this.fireData.getRoot();
                //             this.fbRoot.$loaded().then(function(response) {
                //                 var repmax = {};
                //                 var temp = [];
                // 
                //                 angular.forEach(response, function(value, key) {
                // 
                //                     if (value.$id === 'oefeningen') {
                //                         Workouts.prototype.oefeningen = value;
                //                     }
                //                     // if (value.$id === 'oneRepMaxen') {
                //                     //     Workouts.prototype.oneRepMaxen = value;
                //                     // }
                // 
                //                 })
                //                 //                 angular.forEach(Workouts.prototype.oefeningen, function(value, key) {
                //                 //                     repmax = _(Workouts.prototype.oneRepMaxen).filter({ 'oefeningUid': key }).maxBy('orm');
                //                 //                     if (repmax) {
                //                 //                         temp.push(repmax);
                //                 //                     }
                //                 // 
                //                 //                     Workouts.prototype.oneRepMaxenPerOefening = temp;//.filter({currentAuth.uid});
                //                 //                 })
                // 
                //             })
                // if (!this.currentAuth) {
                //     return;
                // }
                this.gebruiker = this.fireData.getGebruiker(this.currentAuth);
                this.gebruiker.$loaded().then(function (response) {
                    Workouts.prototype.user = app.domain.User.prototype.getUser(response);
                    //console.log(response)
                    angular.forEach(response, function (value, key) {
                        if (key === 'oneRepMaxen') {
                            var temp = [];
                            //console.log(value);
                            //Workouts.prototype.tempOneRepMaxen = value;
                            angular.forEach(value, function (val, key) {
                                //console.log(key);
                                //console.log(val.orm);
                                temp.push(val);
                                //console.log(temp)
                            });
                            var oefeningen = _.map(temp, 'oefeningUid');
                            oefeningen = _.sortedUniq(oefeningen);
                            //console.log(oefeningen);
                            //var groupTemp = _.chain(temp).groupBy("oefeningUid").value();
                            //console.log(groupTemp);
                            Workouts.prototype.tempOneRepMaxen = temp;
                            var tijdelijk = [];
                            angular.forEach(oefeningen, function (value, key) {
                                //console.log(value);
                                //console.log(key);
                                var repmax = _(temp).filter({ 'oefeningUid': value }).maxBy('orm');
                                if (repmax) {
                                    tijdelijk.push(repmax);
                                }
                                //.filter({currentAuth.uid});
                            });
                            //console.log(tijdelijk)
                            Workouts.prototype.oneRepMaxenPerOefening = tijdelijk;
                        }
                    });
                    //console.log(response[0].oneRepMaxen);
                    //Workouts.prototype.oneRepMaxen = 
                    //Workouts.prototype.userService.getUser(response) //app.core.UserService.prototype.getUser(response);
                });
                this.activate();
            };
            Workouts.prototype.bekijkSchema = function (m) {
                this.kijkSchema = true;
                this.geselecteerdeTrainingsMethode = m;
                console.log(this.geselecteerdeTrainingsMethode);
                this.gefilterdTrainingsSchema = _.filter(this.trainingsSchemas, { 'trainingsMethodeId': this.geselecteerdeTrainingsMethode.$id });
                this.schemaGegroepeerdPerWorkout = _.chain(this.gefilterdTrainingsSchema)
                    .groupBy("workoutNummer")
                    .value();
                console.log(this.gefilterdTrainingsSchema);
                console.log(this.schemaGegroepeerdPerWorkout);
            };
            Workouts.prototype.selecteerTrainingsMethode = function (methode) {
                this.toonMethodes = false;
                this.toon1Rm = true;
                this.stap1Title = "Geselecteerde methode = " + methode.omschrijving;
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
