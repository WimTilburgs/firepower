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
                state: 'trainingsschemas',
                config: {
                    url: '/trainingsschemas?id&oms',
                    templateUrl: 'app/stamgegevens/trainingsschemas/trainingsschemas.html',
                    controller: 'TrainingsSchemas',
                    controllerAs: 'vm',
                    title: 'trainingsschemas',
                    authenticate: true
                }
            }
        ];
    }
})();
