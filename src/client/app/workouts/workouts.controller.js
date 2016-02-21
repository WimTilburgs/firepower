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
                this.toonSchema = false;
                this.init();
            }
            Workouts.prototype.init = function () {
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                this.trainingsMethodes = this.fireData.haalTrainingsMethodes();
                if (!this.currentAuth) {
                    return;
                }
                else {
                    this.gebruiker = this.fireData.getGebruiker(this.currentAuth);
                }
                this.activate();
            };
            Workouts.prototype.bekijkSchema = function (tmethode) {
                var refSchema = this.Ref.child('stamGegevens').child('trainingsMethodes').child(tmethode.$id).child('trainingsSchemas');
                refSchema.once("value", function (snapshot) {
                    //console.log(snapshot.val());
                    Workouts.prototype.schemaGegroepeerdPerWorkout = _.chain(snapshot.val())
                        .groupBy("workoutNummer")
                        .value();
                }, function (errorObject) {
                    console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                    return;
                });
                this.toonSchema = true;
            };
            Workouts.prototype.selecteerTrainingsMethode = function (tmethode) {
                var user = this.currentAuth;
                var dezeScopeOefeningen = [];
                // deze heb ik zo nodig this.oefeningenPerMethode
                var refOefeningen = this.Ref.child('stamGegevens').child('trainingsMethodes').child(tmethode.$id).child('oefeningen');
                var refUserOefeningen = this.Ref.child("users").child(user.uid).child('oefeningen');
                refUserOefeningen.once("value", function (snapshot) {
                    if (!snapshot.val()) {
                        refOefeningen.once("value", function (snapshot) {
                            snapshot.forEach(function (repMaxSnap) {
                                var oefening = repMaxSnap.val();
                                oefening.orm = 0;
                                refUserOefeningen.push(oefening);
                                dezeScopeOefeningen.push(oefening);
                            });
                        }, function (errorObject) {
                            console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                            return;
                        });
                    }
                    else {
                        refOefeningen.once("value", function (snapshot) {
                            snapshot.forEach(function (repMaxSnap) {
                                var oefening = repMaxSnap.val();
                                var oefeningKey = repMaxSnap.key();
                                //console.log(oefening);
                                refUserOefeningen.orderByChild('oefeningId')
                                    .equalTo(oefening.oefeningId).once('value', function (userOefSnap) {
                                    userOefSnap.forEach(function (childSnap) {
                                        //console.log(childSnap.val());
                                        dezeScopeOefeningen.push(childSnap.val());
                                    });
                                });
                                //refUserOefeningen.push(oefening);
                                //dezeScopeOefeningen.push(oefening);
                            });
                        }, function (errorObject) {
                            console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                            return;
                        });
                    }
                }, function (errorObject) {
                    console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                    return;
                });
                this.oefeningenPerMethode = dezeScopeOefeningen;
                this.toonMethodes = false;
                this.toonSchema = false;
                this.toon1Rm = true;
                this.geselecteerdeTrainingsMethode = tmethode;
                this.stap1Title = "Geselecteerde methode = " + tmethode.omschrijving;
                this.stap2Title = "Stap 2: Bepaal je One Rep Max";
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
