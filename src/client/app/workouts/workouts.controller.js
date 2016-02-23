///<reference path="../../../../typings/tsd.d.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var Workouts = (function () {
            function Workouts(logger, $state, currentAuth, _, fireData, Ref, $mdDialog) {
                this.logger = logger;
                this.$state = $state;
                this.currentAuth = currentAuth;
                this._ = _;
                this.fireData = fireData;
                this.Ref = Ref;
                this.$mdDialog = $mdDialog;
                this.stap1Title = 'Stap 1 : Selecteer een trainingsmethode';
                this.toonMethodes = true;
                this.toon1Rm = false;
                this.toonSchema = false;
                this.toonDetails = false;
                this.toon1RepMaxCalculator = false;
                this.toonGegenereerdWorkoutVoorstel = false;
                this.gewichtKleinsteHalterSchijf = 1.25;
                this.percentages = [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
                this.procentenLijst = [];
                this.calculator = [];
                this.gegenereerdeWorkouts = [];
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
                                oefening.orm = 30;
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
            Workouts.prototype.oneRepMaxDetails = function (oefening) {
                this.toonDetails = true;
                this.toon1Rm = false;
                oefening.OneRepMaxVoorstel = oefening.orm + oefening.ophoogGewicht;
                this.oefening = oefening;
                //var temp = new ProcentenLijst( 45,50);
                this.procentenLijst.push({ 'percentage': 45, 'gewicht': oefening.OneRepMaxVoorstel });
            };
            Workouts.prototype.toonCalculator = function () {
                this.toon1RepMaxCalculator = true;
                this.calculator.push({ 'gewicht': 50, 'aantal': 5 });
            };
            Workouts.prototype.submitCalculator = function (calculator) {
                var formule = calculator.gewicht * (calculator.aantal * 0.033 + 1);
                this.oefening.OneRepMaxVoorstel = Math.round(formule);
                this.toon1RepMaxCalculator = false;
            };
            Workouts.prototype.calculatorAnuleren = function () {
                this.toon1RepMaxCalculator = false;
            };
            Workouts.prototype.repMaxInstellen = function (oefening) {
                oefening.orm = oefening.OneRepMaxVoorstel;
                var gevondenOefeningRef;
                var oudeOefening = [];
                var user = this.currentAuth;
                var refUserOefeningen = this.Ref.child("users").child(user.uid).child('oefeningen');
                refUserOefeningen.orderByChild('oefeningId')
                    .equalTo(oefening.oefeningId).once('value', function (userOefSnap) {
                    userOefSnap.forEach(function (childSnap) {
                        gevondenOefeningRef = childSnap.ref();
                        gevondenOefeningRef.update({ orm: oefening.orm });
                        oudeOefening.push(childSnap.val());
                    });
                });
                this.toonDetails = false;
                this.toon1Rm = true;
                console.log(oudeOefening);
                console.log(oudeOefening[0].omschrijving);
            };
            Workouts.prototype.detailsAnuleren = function () {
                this.toonDetails = false;
                this.toon1Rm = true;
            };
            Workouts.prototype.trainingsVoorstelGenereren = function () {
                this.toonGegenereerdWorkoutVoorstel = true;
                var nieuweWorkout;
                var nieuweWorkoutLijst = []; //app.domain.ITrainingen[] = [];
                var refTrainingsMethodes = this.Ref.child('stamGegevens').child('trainingsMethodes').child(this.geselecteerdeTrainingsMethode.$id);
                var refMethodeSchema = refTrainingsMethodes.child('trainingsSchemas');
                var refMethodeOefeningen = refTrainingsMethodes.child('oefeningen');
                var refUser = this.Ref.child("users").child(this.currentAuth.uid);
                var refUserOefeningen = refUser.child('oefeningen');
                var testWorkouts = [];
                var schema = [];
                var oefeningen = [];
                //Haal Methodeoefeningen op en met deze haal de oefeningen met de 1repmax uit de user
                refMethodeOefeningen.once("value", function (snapshot) {
                    snapshot.forEach(function (repMaxSnap) {
                        var oefening = repMaxSnap.val();
                        //var oefeningKey = repMaxSnap.key();
                        //console.log(oefening);
                        refUserOefeningen.orderByChild('oefeningId')
                            .equalTo(oefening.oefeningId).once('value', function (userOefSnap) {
                            userOefSnap.forEach(function (childSnap) {
                                //console.log(childSnap.val());
                                //oefeningen.push(childSnap.val());
                                oefeningen = childSnap.val();
                                //console.log(oefeningen[0].omschrijving);
                                //Loop voor elke oefening een keer doorhet schema.
                                refMethodeSchema.once("value", function (snapshot) {
                                    //var lengte = oefeningen.length;
                                    //console.log('lengte 1' + lengte.toString)
                                    snapshot.forEach(function (schemaSnap) {
                                        //console.log(lengte)
                                        console.log(oefeningen.omschrijving);
                                        //console.log(schemaSnap.val());
                                        //schema.push(schemaSnap.val());
                                        var x = schemaSnap.val(); //app.domain.Trainingen()
                                        nieuweWorkout = { workoutNummer: x.workoutNummer,
                                            setNummer: x.setNummer,
                                            datum: "datumstring",
                                            percentage: x.percentage,
                                            aantalReps: x.aantalReps,
                                            gewicht: x.orm,
                                            repsFree: x.amrap,
                                            realisatie: false,
                                            oefeningId: oefening.oefeningId,
                                            oefeningOmschrijving: oefening.omschrijving,
                                            userId: 'userId',
                                            userVoornaam: 'userVoornaam',
                                            userAchternaam: 'userAchternaam',
                                            trainingsMethodeId: 'trainingsMethodeId',
                                            trainingsMethodeOmschrijving: 'trainingsMethodeOmschrijving'
                                        };
                                        nieuweWorkoutLijst.push(nieuweWorkout);
                                        // var test = {
                                        //     "workoutNummer": x.workoutNummer,
                                        //     "setNummer": x.setNummer,
                                        //     "gewicht": oefeningen.orm
                                        // }
                                        // var training = new app.domain.Trainingen(
                                        //     x.workoutNummer, x.setNummer, new Date().toString(),
                                        //     x.percentage, x.aantalReps, oefeningen.orm,
                                        //     x.amrap, false, oefening.oefeningId, oefening.omschrijving, "userid", "voornaam", "achternaam", "tmethodeId", "tmethodeomschrijving");
                                        // nieuweWorkouts.push(training);
                                        //testWorkouts.push(test)
                                    });
                                    //schema.push(snapshot.val());
                                    //
                                    //nieuweWorkouts.push()
                                }, function (errorObject) {
                                    console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                                    return;
                                });
                            });
                        });
                        //refUserOefeningen.push(oefening);
                        //dezeScopeOefeningen.push(oefening);
                    });
                }, function (errorObject) {
                    console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                    return;
                });
                //Haal Methodeschemas op
                //console.log(oefeningen);
                //this.gegenereerdeWorkouts = schema;
                this.gegenereerdeWorkouts = nieuweWorkoutLijst;
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
                'Ref',
                '$mdDialog'
            ];
            return Workouts;
        })();
        angular
            .module('app.workouts')
            .controller(Workouts.controllerId, Workouts);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
