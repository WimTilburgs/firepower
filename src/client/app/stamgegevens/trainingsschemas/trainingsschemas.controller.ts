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
            //this.geselecteerdeTrainingsSchema.amrap = false;
            this.activate();
        }
        
        trainingsSchemaOpslaan() {
            
            if (!this.geselecteerdeTrainingsSchema.amrap) {
                this.geselecteerdeTrainingsSchema.amrap = false;
            }
            var nieuwSchema = new app.domain.TrainingsSchemas(
                this.geselecteerdeTrainingsSchema.workoutNummer,
                this.geselecteerdeTrainingsSchema.setNummer,
                this.geselecteerdeTrainingsSchema.percentage,
                this.geselecteerdeTrainingsSchema.aantalReps,
                this.geselecteerdeTrainingsSchema.amrap);
            this.trainingsSchemas.$add(nieuwSchema);
            //this.geselecteerdeTrainingsSchema = null;
        }
       
        
        
        activate(): void {
            this.logger.info('trainingsSchemasView wordt getoond');
            
        }
    }

    angular
        .module('app.workouts')
        .controller(TrainingsSchemas.controllerId, TrainingsSchemas);
}
