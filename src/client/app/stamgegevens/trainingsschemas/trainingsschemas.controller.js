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
                //this.geselecteerdeTrainingsSchema.amrap = false;
                this.activate();
            };
            TrainingsSchemas.prototype.trainingsSchemaOpslaan = function () {
                if (!this.geselecteerdeTrainingsSchema.amrap) {
                    this.geselecteerdeTrainingsSchema.amrap = false;
                }
                var nieuwSchema = new app.domain.TrainingsSchemas(this.geselecteerdeTrainingsSchema.workoutNummer, this.geselecteerdeTrainingsSchema.setNummer, this.geselecteerdeTrainingsSchema.percentage, this.geselecteerdeTrainingsSchema.aantalReps, this.geselecteerdeTrainingsSchema.amrap);
                this.trainingsSchemas.$add(nieuwSchema);
                //this.geselecteerdeTrainingsSchema = null;
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
