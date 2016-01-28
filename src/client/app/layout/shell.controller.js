(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger','userService'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, logger,userService) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.gebruiker = userService.getUser();
        console.log(vm.gebruiker)
        vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle,
            text: 'Wim Tilburgs',
            link: 'https://www.facebook.com/wim.tilburgs'
        };

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            hideSplash();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSplash = false;
            }, 1000);
        }
    }
})();
