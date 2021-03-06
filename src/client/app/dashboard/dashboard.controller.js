(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['dataservice', 'logger','_',
        'firebaseData', '$q', '$state', 'uiGridConstants', 'blogic','currentAuth'];
    /* @ngInject */
    function DashboardController(dataservice, logger, _ ,firebaseData
        , $q, $state, uiGridConstants, blogic,currentAuth) {

        var vm = this;
        //var _ = window._;
        vm.gebruiker = firebaseData.getGebruiker;
        vm.trainingen = firebaseData.getTrainingen;
        vm.toonRecords = true;
        vm.toonTrainingen = false;

        // Haal de inloggegevens op
        vm.authData = currentAuth;
        vm.kiesOverzicht = kiesOverzicht;

        vm.oefeningen = firebaseData.getOefeningen;

        function kiesOverzicht(overzicht) {
            if (overzicht == 'trainingen') {
                vm.toonRecords = false;
                vm.toonTrainingen = true;
            }
            if (overzicht == 'records') {
                vm.toonRecords = true;
                vm.toonTrainingen = false;
            }
        }

        vm.gridRecords = {
            enableSorting: true,
            enableFiltering: true,
            columnDefs: [

                {
                    field: 'datum',
                    type: 'date',
                    cellFilter: 'date',
                },

                {
                    field: 'oefeningOmschrijving',
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 1
                    }
                },
                {
                    field: 'gewicht',
                    sort: {
                        direction: uiGridConstants.DESC,
                        priority: 2
                    }
                },
                {
                    field: 'aantalReps'

                }
            ]
        };

        vm.gridTrainingen = {
            enableSorting: true,
            enableFiltering: true,

            columnDefs: [

                {
                    field: 'userName'
                },
                {
                    field: 'datum',
                    type: 'date',
                    cellFilter: 'date',
                    sort: {
                        direction: uiGridConstants.DESC,
                        priority: 1
                    }
                },
                {
                    field: 'setNummer',
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 3
                    }
                },
                {
                    field: 'oefeningOmschrijving',
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 2
                    }
                },
                {
                    field: 'gewicht',

                },
                {
                    field: 'aantalReps',

                },
                {
                    field: 'repsFree',
                    //filter: { term: true },
                    displayName: 'Amrap set'
                },
                {
                    field: 'realisatie',
                    filter: { term: true },
                },
            ]
        };
        vm.gridTrainingen.data = vm.trainingen;
        vm.records = [];

        activate();

        function activate() {
            //Is de gebruiker ingelogd?
            if (!currentAuth) {
                //$state.reload();
                $state.go('login');
            }

            vm.trainingen.$loaded(function () {
                if (!currentAuth) {
                    return;
                }
                //berekenRecords(vm.trainingen);
                vm.gridRecords.data = blogic.getRecords(vm.trainingen, vm.oefeningen, vm.authData.uid);

            });
        }

    }
})();
