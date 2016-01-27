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
        vm.toonInloggen = false;

        function afmelden() {
            Auth.$unauth();
            vm.toonInloggen = true;
            window.location.reload(true);
        }

        //Is de gebruiker ingelogd?
        if (!firebaseData.getIngelogd) {
            //$state.reload();
            vm.toonInloggen = true;
        }

        function gebruikerOpslaan(authData) {

            var onComplete = function (error) {
                if (error) {
                    logger.error(error);
                } else {
                    //alert('klaar');
                    window.location.reload(true);
                   
                    $state.go('gebruiker');
                }

            }
            
            //console.log(authData);
            Ref.child('users').child(authData.uid).once('value', function (snapshot) {

                if (snapshot.val() === null) {
                    //alert('nieuwe gebruiker');
                    Ref.child('users').child(authData.uid).set(authData, onComplete);

                } else {
                    window.location.reload(true);
                    $state.go('home');
                }
                window.location.reload(true);
                $state.go('gebruiker');
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
                    //window.location.reload(true);
                    //$state.go('home');
                })
            }
            Auth.$authWithOAuthPopup(provider).then(function (authData) {

                // vm.ingelogd = true;
                // console.log('Nieuwe inlog', authData);
                // window.location.reload(true);
                // $state.go('home');
                gebruikerOpslaan(authData);
                //window.location.reload(true);
                //$state.go('home');
            });
        }



        activate();

        function activate() {
            logger.info('Dit is de LoginView');
        }
    }
})();
