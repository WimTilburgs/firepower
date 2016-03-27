(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('Home', Home);

    Home.$inject = [];
    /* @ngInject */
    function Home() {
        var vm = this;
        vm.news = {
            title: 'FirePower Techniek',
            description: 'Firepower is a SPA template gemaakt met Angular en Firebase.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';
        vm.imagePath = "images/5-3-1-How-to-Build-Pure-Strength.jpg"
        activate();

        function activate() { }
    }
})();
