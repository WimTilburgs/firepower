///<reference path="../../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../../core/app.domain.ts"/>

///<reference path="../../core/firebase.data.ts"/>
module app.controller {

    class TrainingsMethodes {
        static controllerId = 'TrainingsMethodes';
        
        toonButtonNieuw: boolean = true;        
        trainingsMethodes: any;
        geselecteerdeTrainingsMethode: app.domain.ITrainingsMethodes;
        
        
        /* @ngInject */
        static $inject = ['logger',
            '$state',
            '_',
            'fireData'
            
        ];
        constructor(

            private logger: any,
            private $state: any,
            private _: any,
            private fireData: app.core.FireData

        ) {
            this.init();
        }
        private init() {
            this.trainingsMethodes = this.fireData.haalTrainingsMethodes();
            
            this.activate();
        }
        
        trainingsMethodeSelecteren(methode): void {
            this.geselecteerdeTrainingsMethode = methode;
            this.toonButtonNieuw = false;
        }
        
        trainingsMethodeOpslaan(): void {
            var methode = this.geselecteerdeTrainingsMethode;
            var nieuweMethode = new app.domain.TrainingsMethodes(
                methode.omschrijving
            )
            
            this.trainingsMethodes.$add(methode);
            this.geselecteerdeTrainingsMethode = null;
        }
        
        trainingsMethodeWijzigen() {
            this.trainingsMethodes.$save(this.geselecteerdeTrainingsMethode)
            this.geselecteerdeTrainingsMethode = null;
            this.toonButtonNieuw = true;
        }

        trainingsMethodeVerwijderen(): void {
            this.trainingsMethodes.$remove(this.geselecteerdeTrainingsMethode)
            this.geselecteerdeTrainingsMethode = null;
            this.toonButtonNieuw = true;
        }
        
        trainingsMethodeOpslaanTonen () {
            this.geselecteerdeTrainingsMethode = null;
            this.toonButtonNieuw = true;
        }
        
        
        
        activate(): void {
            this.logger.info('trainingsMethodesView wordt getoond');

        }
    }

    angular
        .module('app.workouts')
        .controller(TrainingsMethodes.controllerId, TrainingsMethodes);
}
