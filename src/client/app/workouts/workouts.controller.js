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
                this.toonGebruikerInvullen = false;
                this.toonMethodes = true;
                this.toon1Rm = false;
                this.toonSchema = false;
                this.toonDetails = false;
                this.toonSchemaAlAanwezig = false;
                this.toon1RepMaxCalculator = false;
                this.toonGegenereerdWorkoutVoorstel = false;
                this.gewichtKleinsteHalterSchijf = 1.25;
                this.percentages = [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
                this.procentenLijst = [];
                this.calculator = [];
                this.gegenereerdeWorkouts = [];
                this.trainingenOpslaanLijst = [];
                this.uniekeWorkoutNummers = [];
                this.uniekeOefingOmschrijvingen = [];
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
                    this.gebruiker.$loaded().then(function (response) {
                        Workouts.prototype.gebruikerData = response.data;
                        Workouts.prototype.gebruikerPlanning = response.planning;
                    });
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
                if (this.gebruikerPlanning) {
                    this.toonMethodes = false;
                    this.toonSchemaAlAanwezig = true;
                    this.stap1Title = "Er is al een bestaand schema. Wat wil je daarmee doen?";
                }
                else {
                    this.oefeningenPerMethode = this.bepaalOefeningenMetOneRepMax(tmethode);
                    this.toonMethodes = false;
                    this.toonSchema = false;
                    this.toon1Rm = true;
                    this.geselecteerdeTrainingsMethode = tmethode;
                    //this.stap1Title = "Geselecteerde methode = " + tmethode.omschrijving;
                    this.stap2Title = "Stap 2: Bepaal je One Rep Max";
                }
            };
            Workouts.prototype.bepaalOefeningenMetOneRepMax = function (tmethode) {
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
                //this.oefeningenPerMethode = dezeScopeOefeningen;
                return dezeScopeOefeningen;
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
                var authdata = this.currentAuth;
                console.log(authdata);
                this.toonGegenereerdWorkoutVoorstel = true;
                this.toon1Rm = false;
                var trainingsmethode = this.geselecteerdeTrainingsMethode;
                var gebruiker = this.gebruikerData;
                var nieuweWorkout;
                var nieuweWorkoutLijst = [];
                var refTrainingsMethodes = this.Ref.child('stamGegevens').child('trainingsMethodes').child(this.geselecteerdeTrainingsMethode.$id);
                var refMethodeSchema = refTrainingsMethodes.child('trainingsSchemas');
                var refMethodeOefeningen = refTrainingsMethodes.child('oefeningen');
                var refUser = this.Ref.child("users").child(this.currentAuth.uid);
                var refUserOefeningen = refUser.child('oefeningen');
                var oefeningen;
                refMethodeOefeningen.once("value", function (snapshot) {
                    //Haal de oefeningen op die behoren bij de gekozen trainingsmethode
                    snapshot.forEach(function (oefenSnap) {
                        var oefening = oefenSnap.val();
                        //Zoek bij de gebruiker de repmaxen behorende bij de oefeningen uit de methode
                        refUserOefeningen.orderByChild('oefeningId')
                            .equalTo(oefening.oefeningId).once('value', function (userOefSnap) {
                            userOefSnap.forEach(function (childSnap) {
                                oefeningen = childSnap.val();
                                //Loop voor elke oefening een keer door het schema.
                                refMethodeSchema.once("value", function (snapshot) {
                                    snapshot.forEach(function (schemaSnap) {
                                        // de var x is aangemaakt voor het gemak
                                        var x = schemaSnap.val();
                                        //Hier heb ik dus het schema de oefeningen uit de methode en de onerepmaxen van de gebruiker
                                        //De methode en de gebruiker had ik al.
                                        nieuweWorkout = {
                                            workoutNummer: x.workoutNummer,
                                            setNummer: x.setNummer,
                                            datum: Date.now().toString(),
                                            percentage: x.percentage,
                                            aantalReps: x.aantalReps,
                                            oefeningOrm: oefeningen.orm,
                                            gewicht: Math.round(oefeningen.orm * x.percentage / 100 / 2.5) * 2.5,
                                            repsFree: x.amrap,
                                            realisatie: false,
                                            oefeningId: oefening.oefeningId,
                                            oefeningOmschrijving: oefening.omschrijving,
                                            userId: authdata.uid,
                                            userVoornaam: gebruiker.voorNaam,
                                            userAchternaam: gebruiker.achterNaam,
                                            trainingsMethodeId: trainingsmethode.$id,
                                            trainingsMethodeOmschrijving: trainingsmethode.omschrijving
                                        };
                                        nieuweWorkoutLijst.push(nieuweWorkout);
                                    });
                                }, function (errorObject) {
                                    console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                                    return;
                                });
                            });
                        });
                    });
                }, function (errorObject) {
                    console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                    return;
                });
                //even de lijst beschikbaar maken voor de view  
                this.gegenereerdeWorkouts = nieuweWorkoutLijst;
                this.trainingenOpslaanLijst = nieuweWorkoutLijst;
                //nu eens kijken of we zaak eens mooi kunnen groeperen per workout/oefening
                this.groepeerWorkouts(nieuweWorkoutLijst);
            };
            Workouts.prototype.groepeerWorkouts = function (lijst) {
                Workouts.prototype.schemaGegroepeerdPerWorkout = _.chain(lijst)
                    .groupBy("workoutNummer")
                    .value();
                this.uniekeWorkoutNummers = _.chain(lijst).sortBy('workoutNummer').map(function (o) { return o.workoutNummer; }).uniq().value();
                this.uniekeOefingOmschrijvingen = _.chain(lijst).sortBy('oefeningOmschrijving').map(function (o) { return o.oefeningOmschrijving; }).uniq().value();
                //console.log(uniekeWorkoutNummers);
            };
            Workouts.prototype.trainingsVoorstelAccepteren = function () {
                var refUser = this.Ref.child("users").child(this.currentAuth.uid);
                //var lijst = angular.toJson(this.gegenereerdeWorkouts)
                //refUser.child('planning').push(lijst);
                //refUser.child('planning').push(angular.toJson(this.gegenereerdeWorkouts));
                var data = angular.copy(this.trainingenOpslaanLijst);
                _(data).forEach(function (value) {
                    refUser.child('planning').push(value);
                    //console.log(value);
                });
                //console.log(this.trainingenOpslaanLijst);
                //console.log(data);
                //refUser.child('planning').push(data);
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
