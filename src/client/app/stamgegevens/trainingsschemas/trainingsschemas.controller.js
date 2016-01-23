(function () {
    'use strict';

    angular
        .module('app.stamgegevens')
        .controller('TrainingsSchemas', TrainingsSchemas);

    TrainingsSchemas.$inject = ['logger', 'firebaseData','$state','$stateParams'];
    /* @ngInject */
    function TrainingsSchemas(logger, firebaseData,$state,$stateParams) {
        var vm = this;
        vm.title = 'Onderhoud Trainingsschemas';
        vm.trainingsSchemas = firebaseData.getTrainingsSchemas;
        vm.geselecteerdeTrainingsSchema = null; //dit moet de methode uit de parameters van de link zijn
        vm.geselecteerdeTrainingsMethodeId = $stateParams.id + $stateParams.oms;
        vm.toonButtonNieuw = true;
        vm.trainingsSchemaSelecteren = trainingsSchemaSelecteren;
        vm.trainingsSchemaOpslaanTonen = trainingsSchemaOpslaanTonen;
        vm.trainingsSchemaOpslaan = trainingsSchemaOpslaan;
        vm.trainingsSchemaWijzigen = trainingsSchemaWijzigen;
        vm.trainingsSchemaVerwijderen = trainingsSchemaVerwijderen;

        function trainingsSchemaSelecteren(schema) {
            vm.geselecteerdeTrainingsSchema = schema;
            vm.toonButtonNieuw = false;
        }

        function trainingsSchemaOpslaanTonen () {
            vm.geselecteerdeTrainingsSchema = null;
            vm.toonButtonNieuw = true;
        }

        function trainingsSchemaOpslaan() {
            vm.geselecteerdeTrainingsSchema.trainingsMethodeId = $stateParams.id;
            vm.geselecteerdeTrainingsSchema.trainingsMethodeOmschrijving = $stateParams.oms;
            vm.trainingsSchemas.$add(vm.geselecteerdeTrainingsSchema);
            vm.geselecteerdeTrainingsSchema = null;
        }

        function trainingsSchemaVerwijderen() {
            vm.trainingsSchemas.$remove(vm.geselecteerdeTrainingsSchema)
            vm.geselecteerdeTrainingsSchema = null;
            vm.toonButtonNieuw = true;
        }

        function trainingsSchemaWijzigen() {
            vm.trainingsSchemas.$save(vm.geselecteerdeTrainingsSchema)
            vm.geselecteerdeTrainingsSchema = null;
            vm.toonButtonNieuw = true;
        }
        activate();

        function activate() {
            if (!firebaseData.getIngelogd) {
                $state.reload();
                $state.go('login');
            }
            logger.info('TrainingsSchemasView wordt getoond');
        }
    }
})();
