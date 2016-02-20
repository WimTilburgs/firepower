///<reference path="../../../../typings/tsd.d.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var Workouts = (function () {
            function Workouts(logger, $state, currentAuth, _, fireData, Ref) {
                this.logger = logger;
                this.$state = $state;
                this.currentAuth = currentAuth;
                this._ = _;
                this.fireData = fireData;
                this.Ref = Ref;
                this.stap1Title = 'Stap 1 : Selecteer een trainingsmethode';
                this.toonMethodes = true;
                this.toon1Rm = false;
                this.init();
            }
            Workouts.prototype.init = function () {
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                //this.oneRepMaxenPerMethodeOefening;
                this.trainingsMethodes = this.fireData.haalTrainingsMethodes();
                if (!this.currentAuth) {
                    return;
                }
                else {
                    this.gebruiker = this.fireData.getGebruiker(this.currentAuth);
                }
                this.gebruiker.$loaded().then(function (response) {
                    //Workouts.prototype.oneRepMaxenPerOefening = app.domain.OneRepMaxen.prototype.getActueleOneRepMaxen(response.oneRepMaxen)
                });
                this.activate();
            };
            Workouts.prototype.bekijkSchema = function (tmethode) {
                var refSchema = this.Ref.child('stamGegevens').child('trainingsMethodes').child(tmethode.$id).child('trainingsSchemas');
                refSchema.once("value", function (snapshot) {
                    console.log(snapshot.val());
                    Workouts.prototype.schemaGegroepeerdPerWorkout = _.chain(snapshot.val())
                        .groupBy("workoutNummer")
                        .value();
                }, function (errorObject) {
                    console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                });
            };
            Workouts.prototype.selecteerTrainingsMethode = function (tmethode) {
                var refOefeningen = this.Ref.child('stamGegevens').child('trainingsMethodes').child(tmethode.$id).child('oefeningen');
                this.refOefeningen.once("value", function (snapshot) {
                    //console.log(snapshot.val());
                    //Workouts.prototype.oefeningenPerMethode = snapshot.val();
                    console.log(snapshot.val());
                    snapshot.forEach(function (repMaxSnap) {
                        console.log(repMaxSnap.val().oefeningId);
                    });
                }, function (errorObject) {
                    console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                });
                this.toonMethodes = false;
                this.toon1Rm = true;
                this.geselecteerdeTrainingsMethode = tmethode;
                this.stap1Title = "Geselecteerde methode = " + tmethode.omschrijving;
            };
            Workouts.prototype.activate = function () {
            };
            Workouts.controllerId = 'Workouts';
            /* @ngInject */
            Workouts.$inject = ['logger',
                '$state',
                'currentAuth',
                '_',
                'fireData',
                'Ref'
            ];
            return Workouts;
        })();
        angular
            .module('app.workouts')
            .controller(Workouts.controllerId, Workouts);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
