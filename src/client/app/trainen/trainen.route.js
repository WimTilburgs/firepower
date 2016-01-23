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

    function getStates() {
        return [
            {
                state: 'trainen',
                config: {
                    url: '/trainen',
                    templateUrl: 'app/trainen/trainen.html',
                    controller: 'Trainen',
                    controllerAs: 'vm',
                    title: 'trainen',
                    settings: {
                        nav: 25,
                        content: '<i class="fa fa-thumbs-up"></i> Trainen'
                    }
                }
            }
        ];
    }
})();
