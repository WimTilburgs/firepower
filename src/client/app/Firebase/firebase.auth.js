(function() {
    'use strict';

    angular
        .module('app.firebase')
        .factory('Auth', Auth);

    Auth.$inject = ['$firebaseAuth','Ref'];
    function Auth($firebaseAuth,Ref) {
        return $firebaseAuth(Ref);
    }

})();
