///<reference path="../../../../typings/tsd.d.ts"/>
module app.controller {


    class OverzichtenController {
        static controllerId = 'OverzichtenController';
        title: string;
        trainingenPerGebruiker: any;
        trainingenPerGebruikerGeselecteerd: any;
        recordsPerGebruiker: any;
        geselecteerdeTrainingSet: any;
        wijzigbareTrainingSet: any;
        aantalRepsTijdelijk: number;
        gewichtTijdelijk: number;
        datumWorkout;
        //user: app.domain.IUser;
       
       
        /* @ngInject */
        static $inject = ['logger',
            '$state',
            'currentAuth',
            '_',
            'fireData',
            'Ref',
            '$mdDialog',
            '$scope',
            'blogic'

        ];
        constructor(

            private logger: any,
            private $state: any,
            private currentAuth: any,
            private _: any,
            private fireData: app.core.FireData,
            private Ref,
            private $mdDialog,
            private $scope,
            private blogic

        ) {
            this.init();
        }
        private init() {
            this.title = 'Overzichten';

            if (!this.currentAuth) {
                this.$state.go('login');
            }
            this.trainingenPerGebruiker = this.fireData.getTrainingenPerGebruiker(this.currentAuth.uid);
            this.trainingenPerGebruiker.$loaded(function(response) {
                var temp = _.orderBy(response, ['datum', 'oefeningOmschrijving', 'workoutNummer', 'setNummer'], ['desc']);
                //console.log(temp);
                OverzichtenController.prototype.trainingenPerGebruikerGeselecteerd = temp;
                //OverzichtenController.prototype.getRecords(response)

            })


            this.activate();
        }




        activate(): void {

        }

        openTrainingen(): void {
            this.$state.go('overzichten.trainingen')
        }

        openRecords(): void {
            this.$state.go('overzichten.records')
        }

        getRecords(gebruikerTrainingen): void {
             this.recordsPerGebruiker = this.blogic.haalRecords(this.trainingenPerGebruiker)
        }

        cancel(): void {
            this.geselecteerdeTrainingSet.aantalReps = this.aantalRepsTijdelijk;
            this.geselecteerdeTrainingSet.gewicht = this.gewichtTijdelijk;
            this.$mdDialog.cancel();
        }

        wijzig(): void {
            this.geselecteerdeTrainingSet.datum = this.datumWorkout.getTime();
            this.trainingenPerGebruiker.$save(this.geselecteerdeTrainingSet);
            this.$mdDialog.cancel();
        }

        setWijzigen(training): void {
           
            this.geselecteerdeTrainingSet = training;
            this.aantalRepsTijdelijk = training.aantalReps;
            this.gewichtTijdelijk = training.gewicht;
            this.datumWorkout = new Date(training.datum);
            //this.wijzigbareTrainingSet = angular.copy(this.geselecteerdeTrainingSet);
            //this.wijzigbareTrainingSet = training;
            this.$mdDialog.show({
                scope: this.$scope,
                preserveScope: true,
                templateUrl: 'app/overzichten/wijzigDialoog.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                //fullscreen: useFullScreen
            })
            // .then(function(answer) {
            //     this.status = 'You said the information was "' + answer + '".';
            // }, function() {
            //     this.status = 'You cancelled the dialog.';
            // });
            // $scope.$watch(function() {
            //   return $mdMedia('xs') || $mdMedia('sm');
            // }, function(wantsFullScreen) {
            //   $scope.customFullscreen = (wantsFullScreen === true);
            // });
        };


    }



    angular
        .module('app.overzichten')
        .controller(OverzichtenController.controllerId, OverzichtenController);
}
