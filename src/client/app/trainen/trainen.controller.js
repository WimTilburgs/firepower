(function () {
    'use strict';

    angular
        .module('app.trainen')
        .controller('Trainen', Trainen);

    Trainen.$inject = ['logger', '_', 'firebaseData', 'uiGridConstants', '$state', 'blogic'];
    /* @ngInject */
    function Trainen(logger, _, firebaseData, uiGridConstants, $state, blogic) {
        var vm = this;
        vm.datum = new Date();
        vm.oefeningen = firebaseData.getOefeningen;
        vm.trainingen = firebaseData.getTrainingen;
        vm.geselecteerdeTraining = null;
        vm.recordAantal = 0;
        vm.workoutVandaag = {};
        vm.workoutsTonen = false;
        vm.records = {};
        vm.workoutSelecteren = workoutSelecteren;
        vm.getRecordAantal = getRecordAantal;
        vm.aantalOmhoog = aantalOmhoog;
        vm.aantalOmlaag = aantalOmlaag;
        vm.setOpslaan = setOpslaan;

        function workoutSelecteren(workout) {
            vm.workoutVandaag = _.filter(vm.trainingen,
                { 'oefeningId': workout.oefeningId, 'workoutNummer': workout.workoutNummer, 
                'realisatie': false, 'fireUid': vm.authData.uid });
            vm.workoutVandaag = _.orderBy(vm.workoutVandaag, ['setNummer']);
            vm.workoutsTonen = false;
            //vm.gridTrainingen.data = vm.workoutVandaag;
        }
        
        function bepaalRecordAantal(oefeningId, gewicht) {
            var record = _.filter(vm.records, { 'oefeningId': oefeningId, 'gewicht': gewicht });
            if (record.length == 0) {
                return 0;
            }
            var mapped = _.map(record, 'aantalReps');
            return mapped[0];
        }

        function getRecordAantal(oefeningId, gewicht) {
            var record = _.filter(vm.records, { 'oefeningId': oefeningId, 'gewicht': gewicht });
            var mapped = _.map(record, 'aantalReps');
            vm.recordAantal = mapped[0];
            if (record.length > 0) {
                return 'Huidige record aantal ' + vm.recordAantal;
            }
            return 'Nog geen record aantal reps bij dit gewicht.';
        }

        function aantalOmhoog(training) {
            training.aantalReps = training.aantalReps + 1;
        };

        function aantalOmlaag(training) {
            vm.geselecteerdeTraining = training;
            training.aantalReps = training.aantalReps - 1;
        };

        function setOpslaan(training) {
            if (training.aantalReps > bepaalRecordAantal(training.oefeningId,training.gewicht) && training.repsFree == true) {
                logger.error('Nieuw recordaantal! :' + training.aantalReps);
            }
            console.log('record aantal ' + bepaalRecordAantal(training.oefeningId,training.gewicht));
            training.datum = vm.datum.getTime();
            training.realisatie = true;
            vm.trainingen.$save(training);
            
            console.log(vm.workoutVandaag.length);
            if (vm.workoutVandaag.length == 0)
            {
                vm.workoutsTonen = true;
            }
        };

        activate();

        function activate() {
            //Is de gebruiker ingelogd?
            if (!firebaseData.getIngelogd) {
                //$state.reload();
                $state.go('login');
            }
            // Haal de inloggegevens op
            vm.authData = firebaseData.getAuthGegevens;

            vm.trainingen.$loaded(function () {
                //berekenRecords(vm.trainingen);
                vm.openWorkoutsKlaar = blogic.getOpenstaandeWorkouts(vm.trainingen, vm.oefeningen, vm.authData.uid);
                if (vm.openWorkoutsKlaar.length != 0) {
                    vm.workoutsTonen = true;
                }
                vm.records = blogic.getRecords(vm.trainingen, vm.oefeningen, vm.authData.uid);
                //console.log(vm.records);
            });
        }
    }
})();
