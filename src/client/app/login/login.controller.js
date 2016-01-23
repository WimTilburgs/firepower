(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('Login', Login);

    Login.$inject = ['logger', 'firebaseData', 'Auth', '$state'];
    /* @ngInject */
    function Login(logger, firebaseData, Auth, $state) {
        var vm = this;
        vm.title = 'Login';
        vm.gebruiker = {};
        vm.inloggen = inloggen;
        vm.afmelden = afmelden;

        function afmelden() {
            Auth.$unauth();
            window.location.reload(true);
        }

        function inloggen (provider) {
            if (provider == 'password') {
                Auth.$authWithPassword({
                email: vm.gebruiker.email,
                password: vm.gebruiker.wachtwoord
            }).then(function (authData) {
                console.log('login gelukt ' + authData.uid);
                window.location.reload(true);
                $state.go('home');
            })
            }
            Auth.$authWithOAuthPopup(provider).then(function (authData) {

                vm.ingelogd = true;
                console.log('Nieuwe inlog', authData);
                window.location.reload(true);
                $state.go('home');
            });
        }



        activate();

        function activate() {
            logger.info('Dit is de LoginView');
        }
    }
})();
