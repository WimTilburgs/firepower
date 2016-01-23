(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger'];
    /* @ngInject */
    function AdminController(logger) {
        var vm = this;
        vm.title = 'Onderhoud stamgegevens';

        activate();

        function activate() {
            logger.info('Activated Admin View');
        }
    }
})();
