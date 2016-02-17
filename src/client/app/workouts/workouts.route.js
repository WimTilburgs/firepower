(function () {
    'use strict';

    angular
        .module('app.workouts')
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
                state: 'workouts',
                config: {
                    url: '/workouts',
                    templateUrl: 'app/workouts/workoutsgenereren.1.html',
                    controller: 'Workouts',
                    controllerAs: 'vm',
                    resolve: {
                        'currentAuth': ['Auth', function (Auth) {

                            return Auth.$waitForAuth();
                        }]
                    },
                    title: 'workouts',
                    settings: {
                        nav: 25,
                        content: '<i class="fa fa-heart"></i> Workouts'
                    }
                    

                }
            }
        ];
    }
})();
