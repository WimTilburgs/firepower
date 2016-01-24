(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger', '_', 'firebaseData', 'uiGridConstants', '$state', 'blogic'];
    /* @ngInject */
    function AdminController(logger, _, firebaseData, uiGridConstants, $state, blogic) {
        var vm = this;
        vm.title = 'Onderhoud stamgegevens';
        //vm.trainingen = firebaseData.getTrainingenPerGebruiker('cor.roos@chello.nl');
        vm.trainingen = firebaseData.getTrainingenPerGebruiker('johan.brouwer@gmail.com');
        vm.authData = firebaseData.getAuthGegevens;

        activate();

        function activate() {
            logger.info('Activated Admin View');
            vm.trainingen.$loaded(function () {
                
                //alert(vm.trainingen.length)
                var geg = vm.trainingen
                for (var teller in geg) {
                    geg[teller].fireUid = vm.authData.uid;
                    //vm.trainingen.$save(geg[teller]);
                    //console.log(vm.authData)
                }
                //vm.trainingen.$save();
            })
        }
    }
})();
