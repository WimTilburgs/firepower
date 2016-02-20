(function() {
    'use strict';

    angular
        .module('app.stamgegevens')
        .run(appRun);

    appRun.$inject = ['routerHelper','$state'];
    /* @ngInject */
    function appRun(routerHelper, $state) {
        routerHelper.configureStates(getStates($state));
    }
    getStates.$inject = []
    function getStates($state) {
        return [
            {
                state: 'stamgegevens',
                config: {
                    url: '/stamgegevens',
                    templateUrl: 'app/stamgegevens/stamgegevens.html',
                    controller: 'Stamgegevens',
                    controllerAs: 'vm',
                    title: 'Stamgegevens',
                    settings: {
                        nav: 40,
                        content: '<i class="fa fa-lock"></i> Stamgegevens'
                    },
                },
                authenticate: true
            }
        ];
    }
})();
