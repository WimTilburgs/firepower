(function() {
    'use strict';

    angular
        .module('app.login')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'app/login/login.html',
                    controller: 'Login',
                    controllerAs: 'vm',
                    title: 'inloggen',
                    resolve: {
                        'currentAuth': ['Auth', function (Auth) {
                            //alert('ik wil inloggen');
                            return Auth.$waitForAuth();
                        }]
                    },
                    settings: {
                        nav: 99,
                        content: '<i class="fa fa-sign-in"></i> Inloggen' 
                    }
                }
            }
        ];
    }
})();
