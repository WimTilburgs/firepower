///<reference path="../../../../../../typings/tsd.d.ts"/>


module app.controller {

    class TrainingsOefeningen {
        static controllerId = 'TrainingsOefeningen';
        oefeningen: any;
        oefeningenPerMethode: any;
        
        /* @ngInject */
        static $inject = ['logger',
            '$state',
            'fireData',
            '$stateParams',
            'Ref'

        ];
        constructor(

            private logger: any,
            private $state: any,
            private fireData: app.core.FireData,
            private $stateParams,
            private Ref


        ) {
            this.init();
        }
        private init() {
            this.oefeningen = this.fireData.haalOefeningen();
            this.oefeningenPerMethode = this.fireData.haalOefeningenPerMethode(this.$stateParams.id);
            this.activate();
        }

        trainingsSchemaSelecteren(schema): void {
            //this.geselecteerdeTrainingsSchema = schema;
            //this.toonButtonNieuw = false;
        }

        trainingsSchemaOpslaanTonen(oefening): void {
           
            //this.geselecteerdeTrainingsSchema = null;
            //this.toonButtonNieuw = true;
        }

        oefeningOpslaan(oefening): void {
            
            //Haal de standaard oefeningen op.
            var oefenFire;
            var oefenRef = this.Ref.child('stamGegevens').child('oefeningen').child(oefening.id);
            oefenRef.on("value", function(snapshot) {
                oefenFire = snapshot.val();
            }, function(errorObject) {
                console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
            });
            //Pas de gegevens van de oefening aan.
            oefenFire.ophoogGewicht = oefening.ophoogGewicht;
            oefenFire.oefeningId = oefening.id;
            //Maak een ref naar de oefeningen per methode
            var methodeOefenRef = this.Ref.child('stamGegevens').child('trainingsMethodes').child(this.$stateParams.id).child('oefeningen');
            methodeOefenRef.push(oefenFire,function(err){
                if(err) {
                    console.warn('Fout bij wegschrijven' + err);
                } else {
                    console.log('Gegevens zijn opgeslagen');
                }
            })
        }

        trainingsSchemaWijzigen(): void {

            //this.trainingsSchemas.$save(this.geselecteerdeTrainingsSchema);

        }

        trainingsSchemaVerwijderen(): void {
            //this.trainingsSchemas.$remove(this.geselecteerdeTrainingsSchema);
            //this.geselecteerdeTrainingsSchema = null;
            //this.toonButtonNieuw = true;

        }


        activate(): void {
            //this.logger.info('trainingsSchemasView wordt getoond');

        }
    }

    angular
        .module('app.stamgegevens')
        .controller(TrainingsOefeningen.controllerId, TrainingsOefeningen);
}
