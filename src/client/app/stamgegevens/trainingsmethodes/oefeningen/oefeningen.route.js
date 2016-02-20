(function() {
    'use strict';

    angular
        .module('app.stamgegevens')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'trainingsoefeningen',
                config: {
                    url: '/trainingsmethodes/oefeningen?id',
                    templateUrl: 'app/stamgegevens/trainingsmethodes/oefeningen/oefeningen.html',
                    controller: 'TrainingsOefeningen',
                    controllerAs: 'vm',
                   
                }
            }
        ];
    }
})();
