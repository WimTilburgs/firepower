(function() {
    'use strict';

    angular
        .module('app.firebase')
        .factory('Ref', Ref);

    Ref.$inject = ['$window', 'FBURL'];
    function Ref($window, FBURL) {
        return new $window.Firebase(FBURL)
    }
})();
