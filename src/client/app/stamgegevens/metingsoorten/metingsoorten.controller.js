(function () {
    'use strict';

    angular
        .module('app.stamgegevens')
        .controller('Metingsoorten', Metingsoorten);

    Metingsoorten.$inject = ['logger', 'firebaseData','$state'];
    /* @ngInject */
    function Metingsoorten(logger, firebaseData,$state) {
        var vm = this;
        vm.title = 'Onderhoud metingsoorten';
        vm.metingSoorten = firebaseData.getMetingSoorten;
        vm.geselecteerdeMetingSoort = null;
        vm.toonButtonNieuw = true;
        vm.metingSoortSelecteren = metingSoortSelecteren;
        vm.metingSoortOpslaanTonen = metingSoortOpslaanTonen;
        vm.metingSoortOpslaan = metingSoortOpslaan;
        vm.metingSoortWijzigen = metingSoortWijzigen;

        ///////
        // vm.metingSoortSelecteren = function(metingSoort) {
        //     vm.geselecteerdeMetingSoort = metingSoort;
        //     vm.toonButtonNieuw = false;
        // }

        function metingSoortSelecteren(metingSoort) {
            vm.geselecteerdeMetingSoort = metingSoort;
            vm.toonButtonNieuw = false;
        }

        function metingSoortOpslaanTonen () {
            vm.geselecteerdeMetingSoort = null;
            vm.toonButtonNieuw = true;
        }

        function metingSoortOpslaan() {
            //logger.info(vm.metingSoorten.length)
            //logger.info(vm.geselecteerdeMetingSoort.omschrijving);
            vm.metingSoorten.$add(vm.geselecteerdeMetingSoort)
            vm.geselecteerdeMetingSoort = null;
        }

        function metingSoortWijzigen() {
            vm.metingSoorten.$save(vm.geselecteerdeMetingSoort)
            vm.geselecteerdeMetingSoort = null;
            vm.toonButtonNieuw = true;
        }
        activate();

        function activate() {
            if (!firebaseData.getIngelogd) {
                $state.reload();
                $state.go('login');
            }
            logger.info('MetingsoortenView wordt getoond');
        }
    }
})();
