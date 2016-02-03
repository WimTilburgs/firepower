///<reference path="../../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../../core/app.domain.ts"/>

///<reference path="../../core/firebase.data.ts"/>
module app.controller {

    class Oefeningen {
        static controllerId = 'Oefeningen';
        title: string;
        toonButtonNieuw: boolean = true;        
        oefeningen: any;
        geselecteerdeOefening: app.domain.IOefeningen
        
        
        /* @ngInject */
        static $inject = ['logger',
            '$state',
           
            'fireData'
            
        ];
        constructor(

            private logger: any,
            private $state: any,
            
            private fireData: app.core.FireData

        ) {
            this.init();
        }
        private init() {
            this.title = 'Onderhoud oefeningen';
            
            this.oefeningen = this.fireData.haalOefeningen();
            
            this.activate();
        }
        
        oefeningSelecteren(oefening): void {
            this.geselecteerdeOefening = oefening;
            this.toonButtonNieuw = false;
        }
        
        oefeningOpslaan(): void {
            var oefening = this.geselecteerdeOefening;
            var nieuweOefening = new app.domain.Oefeningen(
                oefening.omschrijving,
                oefening.afkorting,
                oefening.barbellGewicht,
                oefening.sqlId
            )
            this.oefeningen.$add(oefening);
            this.geselecteerdeOefening = null;
        }
        
        oefeningWijzigen() {
            this.oefeningen.$save(this.geselecteerdeOefening)
            this.geselecteerdeOefening = null;
            this.toonButtonNieuw = true;
        }

        oefeningVerwijderen(): void {
            this.oefeningen.$remove(this.geselecteerdeOefening)
            this.geselecteerdeOefening = null;
            this.toonButtonNieuw = true;
        }
        
        oefeningOpslaanTonen () {
            this.geselecteerdeOefening= null;
            this.toonButtonNieuw = true;
        }
        
        
        
        activate(): void {
            this.logger.info('oefeningenView wordt getoond');

        }
    }

    angular
        .module('app.stamgegevens')
        .controller(Oefeningen.controllerId, Oefeningen);
}
