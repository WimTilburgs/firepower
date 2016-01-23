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
                state: 'oefeningen',
                config: {
                    url: '/oefeningen',
                    templateUrl: 'app/stamgegevens/oefeningen/oefeningen.html',
                    controller: 'Oefeningen',
                    controllerAs: 'vm',
                    title: 'Oefeningen',
                    authenticate: true
                }
            }
        ];
    }
})();
