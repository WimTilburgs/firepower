(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'dashboard.records',
                config: {
                    url: '/records',
                    templateUrl: 'app/dashboard/records/records.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                }
            }
        ];
    }
})();
