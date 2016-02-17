///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
///<reference path="../core/firebase.data.ts"/>
module app.controller {

    class Workouts {

        static controllerId = 'Workouts';
        stap1Title: string = 'Stap 1 : Selecteer een trainingsmethode';
        stap2Title: string;

        gebruiker: any;
        toonMethodes: boolean = true;
        toon1Rm: boolean = false;
       
        //oneRepMaxen: app.domain.OneRepMax[];
        oneRepMaxenPerOefening: app.domain.OneRepMax[];

        trainingsMethodes: any;
        geselecteerdeTrainingsMethode: any; //hier moeten uiteraard nog klasses voor komen
        schemaGegroepeerdPerWorkout: any;
        geselecteerdeTrainingsSchemas: any;
        gefilterdTrainingsSchema: any;
        geselecteerdeOefening1rm: number = 0;
       
       
       
        /* @ngInject */
        static $inject = ['logger',
            '$state',
            'currentAuth',
            '_',
            'fireData',
            'userService'

        ];
        constructor(

            private logger: any,
            private $state: any,
            private currentAuth: any,
            private _: any,
            private fireData: app.core.FireData

        ) {
            this.init();
        }
        private init() {

            if (!this.currentAuth) {
                this.$state.go('login');
            }
            this.trainingsMethodes = this.fireData.haalTrainingsMethodes();
            
            // if (!this.currentAuth) {
            //     return;
            // }
            this.gebruiker = this.fireData.getGebruiker(this.currentAuth);

            this.gebruiker.$loaded().then(function(response) {

                var temp = [];
                angular.forEach(response.oneRepMaxen, function(value, key) {
                    temp.push(value);
                })

                var oefeningen = _.map(temp, 'oefeningUid');
                oefeningen = _.sortedUniq(oefeningen);
                var tijdelijk = []
                angular.forEach(oefeningen, function(value, key) {
                    var repmax = _(temp).filter({ 'oefeningUid': value }).maxBy('orm');
                    if (repmax) {
                        tijdelijk.push(repmax);
                    }

                })
                Workouts.prototype.oneRepMaxenPerOefening = tijdelijk;
            })

            this.activate();
        }
        
        haalSchemaUitTrainingsMethode(tmethode) {
            var schemas = [];
            angular.forEach(tmethode.trainingsSchemas, function(value, key) {
                schemas.push(value);
            })
            return schemas;
        }

        bekijkSchema(tmethode): void {
            var schemas = this.haalSchemaUitTrainingsMethode(tmethode)
            this.schemaGegroepeerdPerWorkout = _.chain(schemas)
                .groupBy("workoutNummer")
                .value();
        }
        
        toonSchemaMetOefening1rm(oefening) {
        this.geselecteerdeOefening1rm = oefening.orm ;
        this.bekijkSchema(this.geselecteerdeTrainingsMethode);
    }

        selecteerTrainingsMethode(tmethode): void {
            this.toonMethodes = false;
            this.toon1Rm = true;
            this.geselecteerdeTrainingsMethode = tmethode;
            //this.geselecteerdeTrainingsSchemas = this.haalSchemaUitTrainingsMethode(tmethode)
            this.stap1Title = "Geselecteerde methode = " + tmethode.omschrijving;
        }

        activate(): void {
            this.logger.info('Workouts');

        }
    }

    angular
        .module('app.workouts')
        .controller(Workouts.controllerId, Workouts);
}
