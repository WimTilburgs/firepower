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
                    url: '/trainingsmethodes/schemas?id',
                    templateUrl: 'app/stamgegevens/trainingsmethodes/schemas/schemas.html',
                    controller: 'TrainingsSchemas',
                    controllerAs: 'vm',
                    title: 'trainingsschemas',
                    authenticate: true
                }
            }
        ];
    }
})();
