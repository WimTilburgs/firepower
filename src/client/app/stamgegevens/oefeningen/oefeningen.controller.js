(function () {
    'use strict';

    angular
        .module('app.stamgegevens')
        .controller('Oefeningen', Oefeningen);

    Oefeningen.$inject = ['logger', 'firebaseData','$state','$scope'];
    /* @ngInject */
    function Oefeningen(logger, firebaseData,$state,$scope) {
        var vm = this;
        vm.title = 'Onderhoud oefeningen';
        vm.oefeningen = firebaseData.getOefeningen;
        vm.geselecteerdeOefening = null;
        vm.toonButtonNieuw = true;
        vm.oefeningSelecteren = oefeningSelecteren;
        vm.oefeningOpslaanTonen = oefeningOpslaanTonen;
        vm.oefeningOpslaan = oefeningOpslaan;
        vm.oefeningWijzigen = oefeningWijzigen;
        vm.oefeningVerwijderen = oefeningVerwijderen;
        vm.gridRij = ['leeg'];
        //getCurrentSelection()
        vm.gridOefeningen = {
            enableSorting: true,
            columnDefs: [
                {
                    field: 'afkorting',
                    enableCellEdit: true,
                    width: '10%'
                },
                {
                    name: 'omschrijving',
                    enableCellEdit: true,
                    width: '60%'
                },
                {
                    field: 'barbellGewicht',
                    enableCellEdit: true,
                    type: 'number',
                    width: '15%'
                },
                {
                    field: 'sqlId',
                    enableCellEdit: true,
                    type: 'number',
                    width: '15%'
                }
            ]
        }
        $scope.msg = {};
        vm.gridOefeningen.data = vm.oefeningen;
        vm.gridOefeningen.onRegisterApi = function(gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
                $scope.msg.lastCellEdited = 'edited row afkorting:' + rowEntity.afkorting + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
                vm.oefeningen.$save(rowEntity);
                $scope.$apply();
            });
        }; 

        function oefeningSelecteren(oefening) {
            vm.geselecteerdeOefening = oefening;
            vm.toonButtonNieuw = false;
        }

        function oefeningOpslaanTonen () {
            vm.geselecteerdeOefening = null;
            vm.toonButtonNieuw = true;
        }

        function oefeningOpslaan() {
            vm.oefeningen.$add(vm.geselecteerdeOefening)
            vm.geselecteerdeOefening = null;
        }

        function oefeningWijzigen() {
            vm.oefeningen.$save(vm.geselecteerdeOefening)
            vm.geselecteerdeOefening = null;
            vm.toonButtonNieuw = true;
        }

        function oefeningVerwijderen() {
            vm.oefeningen.$remove(vm.geselecteerdeOefening)
            vm.geselecteerdeOefening = null;
            vm.toonButtonNieuw = true;
        }
        activate();

        function activate() {
            if (!firebaseData.getIngelogd) {
                $state.reload();
                $state.go('login');
            }
            logger.info('OefeningenView wordt getoond');
        }
    }
})();
