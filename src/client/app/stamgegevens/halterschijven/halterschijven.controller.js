(function () {
    'use strict';

    angular
        .module('app.stamgegevens')
        .controller('HalterSchijven', HalterSchijven);

    HalterSchijven.$inject = ['logger', 'firebaseData', '$state'];
    /* @ngInject */
    function HalterSchijven(logger, firebaseData, $state) {
        var vm = this;
        vm.title = 'Onderhoud halterSchijven';
        vm.halterSchijven = firebaseData.getHalterSchijven;
        vm.geselecteerdeHalterSchijf = null;
        vm.toonButtonNieuw = true;
        vm.halterSchijvenSelecteren = halterSchijvenSelecteren;
        vm.halterSchijvenOpslaanTonen = halterSchijvenOpslaanTonen;
        vm.halterSchijvenOpslaan = halterSchijvenOpslaan;
        vm.halterSchijvenWijzigen = halterSchijvenWijzigen;
        vm.halterSchijvenVerwijderen = halterSchijvenVerwijderen;
        ///////
        function halterSchijvenSelecteren(halterSchijf) {
            vm.geselecteerdeHalterSchijf = halterSchijf;
            vm.toonButtonNieuw = false;
        }

        function halterSchijvenOpslaanTonen() {
            vm.geselecteerdeHalterSchijf = null;
            vm.toonButtonNieuw = true;
        }

        function halterSchijvenOpslaan() {
            vm.halterSchijven.$add(vm.geselecteerdeHalterSchijf)
            vm.geselecteerdeHalterSchijf = null;
        }

        function halterSchijvenWijzigen() {
            vm.halterSchijven.$save(vm.geselecteerdeHalterSchijf)
            vm.geselecteerdeHalterSchijf = null;
            vm.toonButtonNieuw = true;
        }

        function halterSchijvenVerwijderen() {
            vm.halterSchijven.$remove(vm.geselecteerdeHalterSchijf)
            vm.geselecteerdeHalterSchijf = null;
            vm.toonButtonNieuw = true;
        }

        activate();

        function activate() {
            if (!firebaseData.getIngelogd) {
                //$state.reload();
                $state.go('login');
            }
            logger.info('halterSchijvenView wordt getoond');
        }
    }
})();
