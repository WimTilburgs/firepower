(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('Login', Login);

    Login.$inject = ['logger', 'firebaseData', 'Auth', '$state', 'Ref'];
    /* @ngInject */
    function Login(logger, firebaseData, Auth, $state, Ref) {
        var vm = this;
        vm.title = 'Login';
        vm.gebruiker = {};
        vm.inloggen = inloggen;
        vm.afmelden = afmelden;

        function afmelden() {
            Auth.$unauth();
            window.location.reload(true);
        }

        function gebruikerOpslaan(authData) {
            Ref.child('users').child(authData.uid).once('value', function (snapshot) {
                if (snapshot.val() === null) {
                    console.log('nieuwe gebruiker');
                    Ref.child('users').child(authData.uid).set(authData);
                }

            })
        }

        function inloggen(provider) {
            if (provider == 'password') {
                Auth.$authWithPassword({
                    email: vm.gebruiker.email,
                    password: vm.gebruiker.wachtwoord
                }).then(function (authData) {
                    //console.log('login gelukt ' + authData.uid);
                    
                    gebruikerOpslaan(authData);
                    window.location.reload(true);
                    $state.go('home');
                })
            }
            Auth.$authWithOAuthPopup(provider).then(function (authData) {

                // vm.ingelogd = true;
                // console.log('Nieuwe inlog', authData);
                // window.location.reload(true);
                // $state.go('home');
                gebruikerOpslaan(authData);
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
