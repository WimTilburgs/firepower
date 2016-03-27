///<reference path="../../../../typings/tsd.d.ts"/>
module app.controller {

    interface ProcentenLijst {
        percentage: number;
        gewicht: number
    }

    class Workouts {


        static controllerId = 'Workouts';
        stap1Title: string = 'Stap 1 : Selecteer een trainingsmethode';
        stap2Title: string;

        gebruiker: any;
        gebruikerData: any;
        gebruikerPlanning: any;
        toonGebruikerInvullen = false;
        toonMethodes: boolean = true;
        toon1Rm: boolean = false;
        toonSchema: boolean = false;
        toonDetails: boolean = false;
        toonSchemaAlAanwezig: boolean = false;
        toon1RepMaxCalculator: boolean = false;
        toonGegenereerdWorkoutVoorstel: boolean = false;
        toonSchemaOpgeslagen: boolean = false;
        oefeningenPerMethode: any;
        gewichtKleinsteHalterSchijf: number = 1.25
        trainingsMethodes: any;
        geselecteerdeTrainingsMethode: any;
        schemaGegroepeerdPerWorkout: any;
        //geselecteerdeTrainingsSchemas: any;
        oefening: any;
        percentages: number[] = [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
        procentenLijst: ProcentenLijst[] = [];
        calculator = [];

        gegenereerdeWorkouts = [];
       
        /* @ngInject */
        static $inject = ['logger',
            '$state',
            'currentAuth',
            '_',
            'fireData',
            'Ref',
            '$mdDialog'

        ];
        constructor(

            private logger: any,
            private $state: any,
            private currentAuth: any,
            private _: any,
            private fireData: app.core.FireData,
            private Ref,
            private $mdDialog

        ) {
            this.init();
        }
        private init() {

            if (!this.currentAuth) {
                this.$state.go('login');
            }
            this.trainingsMethodes = this.fireData.haalTrainingsMethodes();

            if (!this.currentAuth) {
                return;
            } else {

                this.gebruiker = this.fireData.getGebruiker(this.currentAuth);
                this.gebruiker.$loaded().then(function(response) {
                    Workouts.prototype.gebruikerData = response.data;
                    Workouts.prototype.gebruikerPlanning = response.planning


                })

            }


            this.activate();
        }


        bekijkSchema(tmethode): void {

            var refSchema = this.Ref.child('stamGegevens').child('trainingsMethodes').child(tmethode.$id).child('trainingsSchemas');

            refSchema.once("value", function(snapshot) {
                //console.log(snapshot.val());
                Workouts.prototype.schemaGegroepeerdPerWorkout = _.chain(snapshot.val())
                    .groupBy("workoutNummer")
                    .value();
            }, function(errorObject) {
                console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                return;
            });
            this.toonSchema = true;
        }

        selecteerTrainingsMethode(tmethode): void {
            if (this.gebruikerPlanning) {
                this.toonMethodes = false;
                this.toonSchemaAlAanwezig = true;
                this.stap1Title = "Er is al een bestaand schema. Wat wil je daarmee doen?"

            } else {
                this.oefeningenPerMethode = this.bepaalOefeningenMetOneRepMax(tmethode);
                this.toonMethodes = false;
                this.toonSchema = false;
                this.toon1Rm = true;
                this.geselecteerdeTrainingsMethode = tmethode;
                //this.stap1Title = "Geselecteerde methode = " + tmethode.omschrijving;
                this.stap2Title = "Stap 2: Bepaal je One Rep Max"
            }
        }

        bepaalOefeningenMetOneRepMax(tmethode) {
            var user = this.currentAuth;
            var dezeScopeOefeningen = []
            // deze heb ik zo nodig this.oefeningenPerMethode
            var refOefeningen = this.Ref.child('stamGegevens').child('trainingsMethodes').child(tmethode.$id).child('oefeningen');
            var refUserOefeningen = this.Ref.child("users").child(user.uid).child('oefeningen');
            refUserOefeningen.once("value", function(snapshot) {
                if (!snapshot.val()) {
                    refOefeningen.once("value", function(snapshot) {
                        snapshot.forEach(function(repMaxSnap) {
                            var oefening = repMaxSnap.val();
                            oefening.orm = 30;
                            refUserOefeningen.push(oefening);
                            dezeScopeOefeningen.push(oefening);
                        })

                    }, function(errorObject) {
                        console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                        return;
                    });
                }
                else {
                    refOefeningen.once("value", function(snapshot) {
                        snapshot.forEach(function(repMaxSnap) {
                            var oefening = repMaxSnap.val();
                            var oefeningKey = repMaxSnap.key();
                            //console.log(oefening);
                            refUserOefeningen.orderByChild('oefeningId')
                                .equalTo(oefening.oefeningId).once('value', function(userOefSnap) {
                                    userOefSnap.forEach(function(childSnap) {
                                        //console.log(childSnap.val());
                                        dezeScopeOefeningen.push(childSnap.val());
                                    })
                                })
                            
                            //refUserOefeningen.push(oefening);
                            //dezeScopeOefeningen.push(oefening);
                        })

                    }, function(errorObject) {
                        console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                        return;
                    });
                }
            }, function(errorObject) {
                console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                return
            });
            //this.oefeningenPerMethode = dezeScopeOefeningen;
            return dezeScopeOefeningen;
        }

        oneRepMaxDetails(oefening): void {
            this.toonDetails = true;
            this.toon1Rm = false;
            oefening.OneRepMaxVoorstel = oefening.orm + oefening.ophoogGewicht;
            this.oefening = oefening;
            //var temp = new ProcentenLijst( 45,50);
            this.procentenLijst.push({ 'percentage': 45, 'gewicht': oefening.OneRepMaxVoorstel })
        }



        toonCalculator(): void {
            this.toon1RepMaxCalculator = true;
            this.calculator.push({ 'gewicht': 50, 'aantal': 5 });
        }

        submitCalculator(calculator) {
            var formule = calculator.gewicht * (calculator.aantal * 0.033 + 1);

            this.oefening.OneRepMaxVoorstel = Math.round(formule);
            this.toon1RepMaxCalculator = false;
        }

        calculatorAnuleren(): void {
            this.toon1RepMaxCalculator = false;
        }

        repMaxInstellen(oefening): void {
            oefening.orm = oefening.OneRepMaxVoorstel;
            var gevondenOefeningRef;
            var oudeOefening = [];
            var user = this.currentAuth;
            var refUserOefeningen = this.Ref.child("users").child(user.uid).child('oefeningen');
            refUserOefeningen.orderByChild('oefeningId')
                .equalTo(oefening.oefeningId).once('value', function(userOefSnap) {
                    userOefSnap.forEach(function(childSnap) {
                        gevondenOefeningRef = childSnap.ref();
                        gevondenOefeningRef.update({ orm: oefening.orm });
                        oudeOefening.push(childSnap.val());
                    })


                })
            this.toonDetails = false;
            this.toon1Rm = true;
            //console.log(oudeOefening);
            //console.log(oudeOefening[0].omschrijving);
        }

        detailsAnuleren(): void {
            this.toonDetails = false;
            this.toon1Rm = true;
        }
        trainingenOpslaanLijst = [];
        trainingsVoorstelGenereren(): void {
            var authdata = this.currentAuth;
            //console.log(authdata);
            this.toonGegenereerdWorkoutVoorstel = true;
            this.toon1Rm = false;
            var trainingsmethode = this.geselecteerdeTrainingsMethode;
            var gebruiker = this.gebruikerData;
            var nieuweWorkout: app.domain.ITrainingen;
            var nieuweWorkoutLijst = [];
            var refTrainingsMethodes = this.Ref.child('stamGegevens').child('trainingsMethodes').child(this.geselecteerdeTrainingsMethode.$id);
            var refMethodeSchema = refTrainingsMethodes.child('trainingsSchemas');
            var refMethodeOefeningen = refTrainingsMethodes.child('oefeningen')
            var refUser = this.Ref.child("users").child(this.currentAuth.uid);
            var refUserOefeningen = refUser.child('oefeningen');
            var oefeningen;

            refMethodeOefeningen.once("value", function(snapshot) {
                //Haal de oefeningen op die behoren bij de gekozen trainingsmethode
                snapshot.forEach(function(oefenSnap) {
                    var oefening = oefenSnap.val();
                    //Zoek bij de gebruiker de repmaxen behorende bij de oefeningen uit de methode
                    refUserOefeningen.orderByChild('oefeningId')
                        .equalTo(oefening.oefeningId).once('value', function(userOefSnap) {
                            userOefSnap.forEach(function(childSnap) {
                                oefeningen = childSnap.val();
                                //Loop voor elke oefening een keer door het schema.
                                refMethodeSchema.once("value", function(snapshot) {
                                    snapshot.forEach(function(schemaSnap) {
                                        // de var x is aangemaakt voor het gemak
                                        var x = schemaSnap.val();
                                        var minGewicht = 20;
                                        var minHalterSchijfGewicht = 2.5;
                                        //Bij een 1repMax van 70 kg of meer dan gewichten afronden op 5 kg
                                        if(oefeningen.orm >= 70 ) {
                                            minHalterSchijfGewicht = 5
                                        }
                                        var berekendGewicht = Math.round(oefeningen.orm * x.percentage / 100 / minHalterSchijfGewicht) * minHalterSchijfGewicht;
                                        if(berekendGewicht > minGewicht) {
                                            minGewicht = berekendGewicht;
                                        }
                                        //Hier heb ik dus het schema de oefeningen uit de methode en de onerepmaxen van de gebruiker
                                        //De methode en de gebruiker had ik al.
                                        nieuweWorkout = {
                                            workoutNummer: x.workoutNummer,
                                            setNummer: x.setNummer,
                                            datum: Date.now().toString(),
                                            percentage: x.percentage,
                                            aantalReps: x.aantalReps,
                                            oefeningOrm: oefeningen.orm,
                                            //gewicht: Math.round(oefeningen.orm * x.percentage / 100 / 2.5) * 2.5,
                                            gewicht: minGewicht,
                                            repsFree: x.amrap,
                                            realisatie: false,
                                            oefeningId: oefening.oefeningId,
                                            oefeningOmschrijving: oefening.omschrijving,
                                            userId: authdata.uid,
                                            userVoornaam: gebruiker.voorNaam,
                                            userAchternaam: gebruiker.achterNaam,
                                            trainingsMethodeId: trainingsmethode.$id,
                                            trainingsMethodeOmschrijving: trainingsmethode.omschrijving
                                        }
                                        nieuweWorkoutLijst.push(nieuweWorkout);

                                    })

                                }, function(errorObject) {
                                    console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                                    return;
                                });
                            })
                        })
                })

            }, function(errorObject) {
                console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                return;
            });
            //even de lijst beschikbaar maken voor de view  
            this.gegenereerdeWorkouts = nieuweWorkoutLijst;
            this.trainingenOpslaanLijst = nieuweWorkoutLijst;
            //nu eens kijken of we zaak eens mooi kunnen groeperen per workout/oefening
            this.groepeerWorkouts(nieuweWorkoutLijst);
        }

        uniekeWorkoutNummers = [];
        uniekeOefingOmschrijvingen = [];
        groepeerWorkouts(lijst): void {
            
            Workouts.prototype.schemaGegroepeerdPerWorkout = _.chain(lijst)
                //.groupBy("oefeningOmschrijving")
                .groupBy("workoutNummer")
                //.groupBy()
                .value();
            this.uniekeWorkoutNummers = _.chain(lijst).sortBy('workoutNummer').map(function(o) { return o.workoutNummer }).uniq().value();
            this.uniekeOefingOmschrijvingen = _.chain(lijst).sortBy('oefeningOmschrijving').map(function(o) { return o.oefeningOmschrijving }).uniq().value();
            //console.log(uniekeWorkoutNummers);
        }

        trainingsVoorstelAccepteren(): void {
            var refUser = this.Ref.child("users").child(this.currentAuth.uid);
            var data = angular.copy(this.trainingenOpslaanLijst);
            _(data).forEach(function(value) {
                refUser.child('planning').push(value);

            });
            this.stap1Title = "Trainingen generen voltooid"
            this.toonGegenereerdWorkoutVoorstel = false;
            //console.log(this.trainingenOpslaanLijst);
            //console.log(data);
            //refUser.child('planning').push(data);
        }

        trainingenBekijken(): void {
            this.stap1Title = "Trainingen tonen";
            let lijst = this.gebruikerPlanning;

            this.uniekeWorkoutNummers = _.chain(lijst).sortBy('workoutNummer').map(function(o) { return o.workoutNummer }).uniq().value();
            this.uniekeOefingOmschrijvingen = _.chain(lijst).sortBy('oefeningOmschrijving').map(function(o) { return o.oefeningOmschrijving }).uniq().value();

            var arr = _.values(lijst);
            //console.log(arr);
            this.gegenereerdeWorkouts = arr
        }

        trainingenVerwijderen(): void {
            var refUserPlanning = this.Ref.child("users").child(this.currentAuth.uid).child('planning');
            refUserPlanning.remove();
            this.$state.go('gebruiker');
        }

        activate(): void {


        }
    }

    angular
        .module('app.workouts')
        .controller(Workouts.controllerId, Workouts);
}
