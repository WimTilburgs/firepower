///<reference path="../../../../typings/tsd.d.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var OverzichtenController = (function () {
            function OverzichtenController(logger, $state, currentAuth, _, fireData, Ref, $mdDialog, $scope) {
                this.logger = logger;
                this.$state = $state;
                this.currentAuth = currentAuth;
                this._ = _;
                this.fireData = fireData;
                this.Ref = Ref;
                this.$mdDialog = $mdDialog;
                this.$scope = $scope;
                this.init();
            }
            OverzichtenController.prototype.init = function () {
                this.title = 'Overzichten';
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                this.trainingenPerGebruiker = this.fireData.getTrainingenPerGebruiker(this.currentAuth.uid);
                this.activate();
            };
            OverzichtenController.prototype.activate = function () {
            };
            OverzichtenController.prototype.cancel = function () {
                this.geselecteerdeTrainingSet.aantalReps = this.aantalRepsTijdelijk;
                this.geselecteerdeTrainingSet.gewicht = this.gewichtTijdelijk;
                this.$mdDialog.cancel();
            };
            OverzichtenController.prototype.wijzig = function () {
                this.geselecteerdeTrainingSet.datum = this.datumWorkout.getTime();
                this.trainingenPerGebruiker.$save(this.geselecteerdeTrainingSet);
                this.$mdDialog.cancel();
            };
            OverzichtenController.prototype.setWijzigen = function (training) {
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
                })
                    .then(function (answer) {
                    this.status = 'You said the information was "' + answer + '".';
                }, function () {
                    this.status = 'You cancelled the dialog.';
                });
                // $scope.$watch(function() {
                //   return $mdMedia('xs') || $mdMedia('sm');
                // }, function(wantsFullScreen) {
                //   $scope.customFullscreen = (wantsFullScreen === true);
                // });
            };
            ;
            OverzichtenController.controllerId = 'OverzichtenController';
            //user: app.domain.IUser;
            /* @ngInject */
            OverzichtenController.$inject = ['logger',
                '$state',
                'currentAuth',
                '_',
                'fireData',
                'Ref',
                '$mdDialog',
                '$scope'
            ];
            return OverzichtenController;
        })();
        angular
            .module('app.overzichten')
            .controller(OverzichtenController.controllerId, OverzichtenController);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
