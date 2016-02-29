(function() {
    'use strict';

    angular
        .module('app.trainingen')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates(Auth) {
        return [
            {
                state: 'trainingen',
                config: {
                    url: '/trainingen',
                    templateUrl: 'app/trainingen/trainingen.html',
                    controller: 'TrainingenController',
                    controllerAs: 'vm',
                    resolve: {
                        'currentAuth': ['Auth', function (Auth) {

                            return Auth.$waitForAuth();
                        }]
                    },
                    title: 'trainingen',
                    settings: {
                        nav: 99,
                        content: '<i class="fa fa-thumbs-up"></i> Trainingen'
                    }
                }
            }
        ];
    }
})();
