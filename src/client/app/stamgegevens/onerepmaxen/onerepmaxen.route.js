(function () {
    'use strict';

    angular
        .module('app.stamgegevens')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    /* @ngInject */
    getStates.$inject = ['Auth']
    function getStates(Auth) {
        return [
            {
                state: 'onerepmaxen',
                config: {
                    url: '/onerepmaxen',
                    templateUrl: 'app/stamgegevens/onerepmaxen/onerepmaxen.html',
                    controller: 'OneRepMaxen',
                    controllerAs: 'vm',
                    resolve: {
                        'currentAuth': ['Auth', function (Auth) {

                            return Auth.$waitForAuth();
                        }]
                    },
                    title: 'OneRepMaxen'
                }
            }
        ];
    }
})();
