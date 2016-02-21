///<reference path="../../../../typings/tsd.d.ts"/>
module app.controller {

    class Workouts {

        static controllerId = 'Workouts';
        stap1Title: string = 'Stap 1 : Selecteer een trainingsmethode';
        stap2Title: string;

        gebruiker: any;
        toonMethodes: boolean = true;
        toon1Rm: boolean = false;
        toonSchema: boolean = false;
        oefeningenPerMethode: any;

        trainingsMethodes: any;
        geselecteerdeTrainingsMethode: any;
        schemaGegroepeerdPerWorkout: any;
        geselecteerdeTrainingsSchemas: any;
       
        /* @ngInject */
        static $inject = ['logger',
            '$state',
            'currentAuth',
            '_',
            'fireData',
            'Ref'

        ];
        constructor(

            private logger: any,
            private $state: any,
            private currentAuth: any,
            private _: any,
            private fireData: app.core.FireData,
            private Ref

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
                            oefening.orm = 0;
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
                            .equalTo(oefening.oefeningId).once('value',function (userOefSnap) {
                                userOefSnap.forEach(function (childSnap) {
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
            this.oefeningenPerMethode = dezeScopeOefeningen;
            this.toonMethodes = false;
            this.toonSchema = false;
            this.toon1Rm = true;
            this.geselecteerdeTrainingsMethode = tmethode;
            this.stap1Title = "Geselecteerde methode = " + tmethode.omschrijving;
            this.stap2Title = "Stap 2: Bepaal je One Rep Max"
        }

        activate(): void {


        }
    }

    angular
        .module('app.workouts')
        .controller(Workouts.controllerId, Workouts);
}
