(function() {
    'use strict';

    angular
        .module('app.trainen')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates(Auth) {
        return [
            {
                state: 'trainen',
                config: {
                    url: '/trainen',
                    templateUrl: 'app/trainen/trainen.html',
                    controller: 'Trainen',
                    controllerAs: 'vm',
                    resolve: {
                        'currentAuth': ['Auth', function (Auth) {

                            return Auth.$waitForAuth();
                        }]
                    },
                  
                }
            }
        ];
    }
})();
