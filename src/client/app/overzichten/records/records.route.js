(function () {
    'use strict';

    angular
        .module('app.overzichten')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'overzichten.records',
                config: {
                    url: '/records',
                    templateUrl: 'app/overzichten/records/records.html',
                    controller: 'OverzichtenController',
                    controllerAs: 'vm',
                }
            }
        ];
    }
})();
