
(function () {
    'use strict';

    angular
        .module('app.stamgegevens')
        .controller('Stamgegevens', Stamgegevens);

    Stamgegevens.$inject = ['logger', 'firebaseData', '$rootScope', 'userService'];
    /* @ngInject */
    function Stamgegevens(logger, firebaseData, $rootScope, userService) {
        var vm = this;
        vm.title = 'Login';
        vm.metingSoorten = firebaseData.metingSoorten;

        vm.gebruiker = userService.getUserAsync();

        activate();

        function activate() {
            logger.info('Dit is de StamgegevensView');
        }
    }
})();
