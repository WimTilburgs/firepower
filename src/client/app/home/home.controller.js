(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('Home', Home);

    Home.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function Home($q, dataservice, logger) {
        var vm = this;
        vm.news = {
            title: 'FirePower Techniek',
            description: 'Firepower is a SPA template gemaakt met Angular en Firebase.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            // var promises = [getMessageCount()];
            // return $q.all(promises).then(function() {
            //     logger.info('Activated Dashboard View');
            // });
        }

        // function getMessageCount() {
        //     return dataservice.getMessageCount().then(function (data) {
        //         vm.messageCount = data;
        //         return vm.messageCount;
        //     });
        // }
    }
})();
