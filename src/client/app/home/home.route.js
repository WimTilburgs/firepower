(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: 'app/home/home.html',
                    controller: 'Home',
                    controllerAs: 'vm',
                    title: 'home',
                    settings: {
                        nav: 20,
                        content: '<i class="fa fa-home"></i> Home'
                    }
                }
            }
        ];
    }
})();
