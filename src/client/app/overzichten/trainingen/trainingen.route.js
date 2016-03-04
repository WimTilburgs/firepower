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
                state: 'overzichten.trainingen',
                config: {
                    url: '/trainingen',
                    templateUrl: 'app/overzichten/trainingen/trainingen.html',
                    controller: 'OverzichtenController',
                    controllerAs: 'vm',
                }
            }
        ];
    }
})();
