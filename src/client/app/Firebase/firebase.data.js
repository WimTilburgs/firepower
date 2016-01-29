(function () {
    'use strict';

    angular
        .module('app.firebase')
        .factory('firebaseData', firebaseData);

    firebaseData.$inject = ['logger',
        '$firebaseArray',
        '$firebaseObject',
        'Ref',
        'exception',
        'Auth',
        'FBURL',
        '$window',
        '$state'];
    function firebaseData(logger,
        $firebaseArray,
        $firebaseObject,
        Ref,
        exception,
        Auth,
        FBURL,
        $window,
        $state) {
        var service = {
            getAuthGegevens: getAuthGegevens(),
            getGebruiker: getGebruiker(),
            getMetingSoorten: getMetingSoorten(),
            getIngelogd: getIngelogd(),
            getOefeningen: getOefeningen(),
            getOneRepMaxen: getOneRepMaxen(),
            getOneRepMaxenPerGebruiker: getOneRepMaxenPerGebruiker,
            getHalterSchijven: getHalterSchijven(),
            getTrainingsMethodes: getTrainingsMethodes(),
            getTrainingsSchemas: getTrainingsSchemas(),
            getTrainingen: getTrainingen(),
            getTrainingenPerGebruiker: getTrainingenPerGebruiker,

        };
        return service;

        //////////////// error handling moet nog gemaakt worden!
        function getAuthGegevens() {

            var authData = Auth.$getAuth();
            if (!authData) {
                $state.go('login');
            }
            return authData;
        }
        function getMetingSoorten() {
            return $firebaseArray(Ref.child('metingSoorten'))
        }
        function getOefeningen() {
            return $firebaseArray(Ref.child('oefeningen'));
        }
        function getOneRepMaxen() {
            return $firebaseArray(Ref.child('oneRepMaxen'));
        }
        
        function getOneRepMaxenPerGebruiker(userUid) {
            return $firebaseArray(Ref.child('oneRepMaxen').orderByChild('gebruikerUid').equalTo(userUid));
        }
        
        function getHalterSchijven() {
            return $firebaseArray(Ref.child('halterSchijven'));
        }

        function getTrainingsMethodes() {
            return $firebaseArray(Ref.child('trainingsMethodes'));
        }

        function getTrainingsSchemas() {
            return $firebaseArray(Ref.child('trainingsSchemas'));
        }

        function getTrainingen() {
            return $firebaseArray(Ref.child('trainingen'));
        }

        function getTrainingenPerGebruiker(gebruiker) {
            return $firebaseArray(Ref.child('trainingen').orderByChild('userName').equalTo(gebruiker));
        }

        function getIngelogd() {
            var test = getAuthGegevens();
            if (test) {
                return true;
            }
            else {
                return false;
            }
        }


        function getGebruiker() {
            var authData = Auth.$getAuth();
            if (authData) {
                var gebruiker = gebruiker = $firebaseObject(Ref.child('users').child(authData.uid));
                return gebruiker;
            }
            return null;
        }
    }
})();
