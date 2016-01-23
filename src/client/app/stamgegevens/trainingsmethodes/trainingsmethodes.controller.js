(function () {
    'use strict';

    angular
        .module('app.stamgegevens')
        .controller('TrainingsMethodes', TrainingsMethodes);

    TrainingsMethodes.$inject = ['logger', 'firebaseData','$state'];
    /* @ngInject */
    function TrainingsMethodes(logger, firebaseData,$state) {
        var vm = this;
        vm.title = 'Onderhoud Trainingsmethodes';
        vm.trainingsMethodes = firebaseData.getTrainingsMethodes;
        vm.geselecteerdeTrainingsMethode = null;
        vm.toonButtonNieuw = true;
        vm.trainingsMethodeSelecteren = trainingsMethodeSelecteren;
        vm.trainingsMethodeOpslaanTonen = trainingsMethodeOpslaanTonen;
        vm.trainingsMethodeOpslaan = trainingsMethodeOpslaan;
        vm.trainingsMethodeWijzigen = trainingsMethodeWijzigen;
        vm.trainingsMethodeVerwijderen = trainingsMethodeVerwijderen;

        function trainingsMethodeSelecteren(methode) {
            vm.geselecteerdeTrainingsMethode = methode;
            vm.toonButtonNieuw = false;
        }

        function trainingsMethodeOpslaanTonen () {
            vm.geselecteerdeTrainingsMethode = null;
            vm.toonButtonNieuw = true;
        }

        function trainingsMethodeOpslaan() {
            vm.trainingsMethodes.$add(vm.geselecteerdeTrainingsMethode)
            vm.geselecteerdeTrainingsMethode = null;
        }

        function trainingsMethodeVerwijderen() {
            vm.trainingsMethodes.$remove(vm.geselecteerdeTrainingsMethode)
            vm.geselecteerdeTrainingsMethode = null;
            vm.toonButtonNieuw = true;
        }

        function trainingsMethodeWijzigen() {
            vm.trainingsMethodes.$save(vm.geselecteerdeTrainingsMethode)
            vm.geselecteerdeTrainingsMethode = null;
            vm.toonButtonNieuw = true;
        }
        activate();

        function activate() {
            if (!firebaseData.getIngelogd) {
                $state.reload();
                $state.go('login');
            }
            logger.info('trainingsMethodesView wordt getoond');
        }
    }
})();
