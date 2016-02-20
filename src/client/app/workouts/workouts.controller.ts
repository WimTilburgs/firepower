///<reference path="../../../../typings/tsd.d.ts"/>
module app.controller {

    class Workouts {

        static controllerId = 'Workouts';
        stap1Title: string = 'Stap 1 : Selecteer een trainingsmethode';
        stap2Title: string;

        gebruiker: any;
        toonMethodes: boolean = true;
        toon1Rm: boolean = false;
        oefeningenPerMethode: any;

        trainingsMethodes: any;
        geselecteerdeTrainingsMethode: any; //hier moeten uiteraard nog klasses voor komen
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
            //this.oneRepMaxenPerMethodeOefening;
            this.trainingsMethodes = this.fireData.haalTrainingsMethodes();

            if (!this.currentAuth) {
                return;
            } else {
                this.gebruiker = this.fireData.getGebruiker(this.currentAuth);
            }

            this.gebruiker.$loaded().then(function(response) {
                //Workouts.prototype.oneRepMaxenPerOefening = app.domain.OneRepMaxen.prototype.getActueleOneRepMaxen(response.oneRepMaxen)
            })

            this.activate();
        }


        bekijkSchema(tmethode): void {

            var refSchema = this.Ref.child('stamGegevens').child('trainingsMethodes').child(tmethode.$id).child('trainingsSchemas');
            refSchema.once("value", function(snapshot) {
                console.log(snapshot.val());
                Workouts.prototype.schemaGegroepeerdPerWorkout = _.chain(snapshot.val())
                    .groupBy("workoutNummer")
                    .value();
            }, function(errorObject) {
                console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
            });

        }
        
        selecteerTrainingsMethode(tmethode): void {

            var refOefeningen = this.Ref.child('stamGegevens').child('trainingsMethodes').child(tmethode.$id).child('oefeningen');
            refOefeningen.once("value", function(snapshot) {
                //console.log(snapshot.val());
                //Workouts.prototype.oefeningenPerMethode = snapshot.val();
                console.log(snapshot.val());
                snapshot.forEach(function(repMaxSnap){
                    console.log(repMaxSnap.val().oefeningId)
                })

            }, function(errorObject) {
                console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
            });
            this.toonMethodes = false;
            this.toon1Rm = true;
            this.geselecteerdeTrainingsMethode = tmethode;
            this.stap1Title = "Geselecteerde methode = " + tmethode.omschrijving;
        }

        activate(): void {


        }
    }

    angular
        .module('app.workouts')
        .controller(Workouts.controllerId, Workouts);
}
