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
                state: 'overzichten.trainingenmob',
                config: {
                    url: '/trainingenmobiel',
                    templateUrl: 'app/overzichten/trainingenmob/trainingenmob.html',
                    controller: 'OverzichtenController',
                    controllerAs: 'vm',
                }
            }
        ];
    }
})();
