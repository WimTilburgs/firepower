(function () {
    'use strict';

    angular
        .module('app.stamgegevens')
        .controller('Stamgegevens', Stamgegevens);

    Stamgegevens.$inject = ['logger','firebaseData','$rootScope'];
    /* @ngInject */
    function Stamgegevens(logger,firebaseData,$rootScope) {
        var vm = this;
        vm.title = 'Login';
        vm.metingSoorten = firebaseData.metingSoorten;

        activate();

        function activate() {
            logger.info('Dit is de StamgegevensView');
        }
    }
})();
