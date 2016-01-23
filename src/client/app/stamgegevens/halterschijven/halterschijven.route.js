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
                state: 'halterschijven',
                config: {
                    url: '/halterschijven',
                    templateUrl: 'app/stamgegevens/halterschijven/halterschijven.html',
                    controller: 'HalterSchijven',
                    controllerAs: 'vm',
                    title: 'Halterschijven',
                    authenticate: true
                }
            }
        ];
    }
})();
