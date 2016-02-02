///<reference path="../../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../../core/app.domain.ts"/>

///<reference path="../../core/firebase.data.ts"/>
module app.controller {

    class TrainingsSchemas {
        static controllerId = 'TrainingsSchemas';
        title: string; 
        trainingsSchemas: any;
        geselecteerdeTrainingsSchema: app.domain.ITrainingsSchemas;
        toonButtonNieuw: boolean = true;
        
        /* @ngInject */
        static $inject = ['logger',
            '$state',
            'fireData',
            '$stateParams'
            
        ];
        constructor(

            private logger: any,
            private $state: any,
            private fireData: app.core.FireData,
            private $stateParams
            

        ) {
            this.init();
        }
        private init() {
            this.title = 'Onderhoud Trainingsschemas';
            this.trainingsSchemas = this.fireData.haalTrainingsSchemas(this.$stateParams.id);
            this.activate();
        }
        
        trainingsSchemaSelecteren(schema): void {
            this.geselecteerdeTrainingsSchema = schema;
            this.toonButtonNieuw = false;
        }
        
        trainingsSchemaOpslaanTonen(): void {
            this.geselecteerdeTrainingsSchema = null;
            this.toonButtonNieuw = true;
        }
        
        trainingsSchemaOpslaan(): void {
            
            var schema = this.trainingsSchemaClassMaken(this.geselecteerdeTrainingsSchema);
            this.trainingsSchemas.$add(schema);
            this.geselecteerdeTrainingsSchema = null;
        }
        
       trainingsSchemaWijzigen(): void {
           
            var schema = this.trainingsSchemaClassMaken(this.geselecteerdeTrainingsSchema);
            //bij schema guid nog toevoegen
            console.log(schema);
            this.trainingsSchemas.$save(this.geselecteerdeTrainingsSchema)
            //this.geselecteerdeTrainingsSchema = null;
            //this.toonButtonNieuw = true;
        }
        
        /**
         * Pakt de velden van het model van het invoerformulier en maakt hiermee de typescript class
         * Hiermee maak ik zeker dat de opgeslagen gegevens voldoen aan de class.
         */
        trainingsSchemaClassMaken(schema:app.domain.ITrainingsSchemas): app.domain.TrainingsSchemas {
            if (!schema.amrap) {
                schema.amrap = false;
            }
            var nieuwSchema = new app.domain.TrainingsSchemas(
                schema.workoutNummer,
                schema.setNummer,
                schema.percentage,
                schema.aantalReps,
                schema.amrap);
                return nieuwSchema;
        }
        
        
        activate(): void {
            this.logger.info('trainingsSchemasView wordt getoond');
            
        }
    }

    angular
        .module('app.workouts')
        .controller(TrainingsSchemas.controllerId, TrainingsSchemas);
}
