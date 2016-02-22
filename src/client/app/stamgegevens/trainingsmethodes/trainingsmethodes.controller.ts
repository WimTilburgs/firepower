
///<reference path="../../../../../typings/tsd.d.ts"/>

module app.controller {

    export class TrainingsMethodes {
        static controllerId = 'TrainingsMethodes';

        toonButtonNieuw: boolean = true;
        toonWijzigMethode: boolean = true;
        trainingsMethodes: any;
        oefeningenPerMethode: any;
        geselecteerdeTrainingsMethode: app.domain.ITrainingsMethodes;
        
        
        
        /* @ngInject */
        static $inject = ['logger',
            '$state',
            '_',
            'fireData',
            '$mdDialog'

        ];
        constructor(

            private logger: any,
            private $state: any,
            private _: any,
            private fireData: app.core.FireData,
            private $mdDialog

        ) {
            this.init();
        }
        private init() {
            
            this.trainingsMethodes = this.fireData.haalTrainingsMethodes();
            
            this.activate();
        }

        trainingsMethodeSelecteren(methode): void {
            this.toonWijzigMethode = true;
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

        trainingsMethodeOpslaanTonen() {
            this.geselecteerdeTrainingsMethode = null;
            this.toonButtonNieuw = true;
        }
       
        
        // methodeOefeningenOpslaan(): void {
        //     var test = _.filter(this.oefeningen,{'selected' : true});
        //     this.oefeningenPerMethode.$add(test);
        //     console.log(test);
        // }

        toonOefeningenKeuze(methode): void {
            this.toonWijzigMethode = false;
            this.oefeningenPerMethode = this.fireData.haalOefeningenPerMethode(methode.$id);
            console.log(this.oefeningenPerMethode);
           
        }



        activate(): void {
            this.logger.info('trainingsMethodesView wordt getoond');

        }
    }

    angular
        .module('app.stamgegevens')
        .controller(TrainingsMethodes.controllerId, TrainingsMethodes);
}
