(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates(Auth) {
        return [
            {
                state: 'admin',
                config: {
                    url: '/admin',
                    templateUrl: 'app/admin/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'vm',
                    
                    resolve: {
                        'currentAuth': ['Auth', function (Auth) {

                            return Auth.$waitForAuth();
                        }]
                    },
                    title: 'tijdelijk',
                    // settings: {
                    //     nav: 150,
                    //     content: '<i class="fa fa-lock"></i> tijdelijk'
                    // }
                }
            }
        ];
    }
})();
