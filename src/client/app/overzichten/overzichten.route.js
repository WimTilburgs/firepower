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
    /* @ngInject */
    getStates.$inject = ['Auth']
    function getStates(Auth) {
        return [
            {
                state: 'overzichten',
                config: {
                    url: '/overzichten',
                    templateUrl: 'app/overzichten/overzicht.html',
                    controller: 'OverzichtenController',
                    controllerAs: 'vm',
                    resolve: {
                        'currentAuth': ['Auth', function (Auth) {

                            return Auth.$waitForAuth();
                        }]
                    },
                    title: 'overzichten',
                    settings: {
                        nav: 30,
                        content: '<i class="fa fa-dashboard"></i> Overzichten'
                    }

                }
            }
        ];
    }
})();
