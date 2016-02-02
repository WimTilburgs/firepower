///<reference path="../../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../../core/app.domain.ts"/>
///<reference path="../../core/firebase.data.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var TrainingsSchemas = (function () {
            function TrainingsSchemas(logger, $state, fireData, $stateParams) {
                this.logger = logger;
                this.$state = $state;
                this.fireData = fireData;
                this.$stateParams = $stateParams;
                this.toonButtonNieuw = true;
                this.init();
            }
            TrainingsSchemas.prototype.init = function () {
                this.title = 'Onderhoud Trainingsschemas';
                this.trainingsSchemas = this.fireData.haalTrainingsSchemas(this.$stateParams.id);
                this.activate();
            };
            TrainingsSchemas.prototype.trainingsSchemaSelecteren = function (schema) {
                this.geselecteerdeTrainingsSchema = schema;
                this.toonButtonNieuw = false;
            };
            TrainingsSchemas.prototype.trainingsSchemaOpslaanTonen = function () {
                this.geselecteerdeTrainingsSchema = null;
                this.toonButtonNieuw = true;
            };
            TrainingsSchemas.prototype.trainingsSchemaOpslaan = function () {
                var schema = this.trainingsSchemaClassMaken(this.geselecteerdeTrainingsSchema);
                this.trainingsSchemas.$add(schema);
                this.geselecteerdeTrainingsSchema = null;
            };
            TrainingsSchemas.prototype.trainingsSchemaWijzigen = function () {
                var schema = this.trainingsSchemaClassMaken(this.geselecteerdeTrainingsSchema);
                //bij schema guid nog toevoegen
                console.log(schema);
                this.trainingsSchemas.$save(this.geselecteerdeTrainingsSchema);
                //this.geselecteerdeTrainingsSchema = null;
                //this.toonButtonNieuw = true;
            };
            /**
             * Pakt de velden van het model van het invoerformulier en maakt hiermee de typescript class
             * Hiermee maak ik zeker dat de opgeslagen gegevens voldoen aan de class.
             */
            TrainingsSchemas.prototype.trainingsSchemaClassMaken = function (schema) {
                if (!schema.amrap) {
                    schema.amrap = false;
                }
                var nieuwSchema = new app.domain.TrainingsSchemas(schema.workoutNummer, schema.setNummer, schema.percentage, schema.aantalReps, schema.amrap);
                return nieuwSchema;
            };
            TrainingsSchemas.prototype.activate = function () {
                this.logger.info('trainingsSchemasView wordt getoond');
            };
            TrainingsSchemas.controllerId = 'TrainingsSchemas';
            /* @ngInject */
            TrainingsSchemas.$inject = ['logger',
                '$state',
                'fireData',
                '$stateParams'
            ];
            return TrainingsSchemas;
        })();
        angular
            .module('app.workouts')
            .controller(TrainingsSchemas.controllerId, TrainingsSchemas);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
