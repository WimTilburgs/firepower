(function () {
    'use strict';

    angular
        .module('app.gebruiker')
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
                state: 'gebruiker',
                config: {
                    url: '/gebruiker',
                    templateUrl: 'app/gebruiker/gebruiker.html',
                    controller: 'Gebruiker',
                    controllerAs: 'vm',
                    resolve: {
                        'currentAuth': ['Auth', function (Auth) {

                            return Auth.$waitForAuth();
                        }]
                    },
                    title: 'gebruiker',
                    // settings: {
                    //     nav: 25,
                    //     content: '<i class="fa fa-user"></i> Ik'
                    // }

                }
            }
        ];
    }
})();
