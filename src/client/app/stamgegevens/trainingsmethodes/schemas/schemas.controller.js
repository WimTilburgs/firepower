///<reference path="../../../../../../typings/tsd.d.ts"/>
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
                var schema = this.geselecteerdeTrainingsSchema;
                if (!schema.amrap) {
                    schema.amrap = false;
                }
                var nieuwSchema = new app.domain.TrainingsSchemas(schema.workoutNummer, schema.setNummer, schema.percentage, schema.aantalReps, schema.amrap);
                this.trainingsSchemas.$add(schema);
                this.geselecteerdeTrainingsSchema = null;
            };
            TrainingsSchemas.prototype.trainingsSchemaWijzigen = function () {
                this.trainingsSchemas.$save(this.geselecteerdeTrainingsSchema);
            };
            TrainingsSchemas.prototype.trainingsSchemaVerwijderen = function () {
                this.trainingsSchemas.$remove(this.geselecteerdeTrainingsSchema);
                this.geselecteerdeTrainingsSchema = null;
                this.toonButtonNieuw = true;
            };
            TrainingsSchemas.prototype.activate = function () {
                //this.logger.info('trainingsSchemasView wordt getoond');
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
            .module('app.stamgegevens')
            .controller(TrainingsSchemas.controllerId, TrainingsSchemas);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
