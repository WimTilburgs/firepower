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
                state: 'dashboard.trainingen',
                config: {
                    url: '/trainingen',
                    templateUrl: 'app/dashboard/trainingen/trainingen.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                }
            }
        ];
    }
})();
