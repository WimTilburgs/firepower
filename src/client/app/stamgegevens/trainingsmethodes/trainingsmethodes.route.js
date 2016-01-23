(function() {
    'use strict';

    angular
        .module('app.stamgegevens')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'trainingsmethodes',
                config: {
                    url: '/trainingsmethodes',
                    templateUrl: 'app/stamgegevens/trainingsmethodes/trainingsmethodes.html',
                    controller: 'TrainingsMethodes',
                    controllerAs: 'vm',
                    title: 'trainingsmethodes',
                    authenticate: true
                }
            }
        ];
    }
})();
