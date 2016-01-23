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
                state: 'metingsoorten',
                config: {
                    url: '/metingsoorten',
                    templateUrl: 'app/stamgegevens/metingsoorten/metingsoorten.html',
                    controller: 'Metingsoorten',
                    controllerAs: 'vm',
                    title: 'Metingsoorten',
                    authenticate: true
                }
            }
        ];
    }
})();
