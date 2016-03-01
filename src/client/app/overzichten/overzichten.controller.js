///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var OverzichtenController = (function () {
            function OverzichtenController(logger, firebaseData, Auth, Ref, $state, currentAuth) {
                this.logger = logger;
                this.firebaseData = firebaseData;
                this.Auth = Auth;
                this.Ref = Ref;
                this.$state = $state;
                this.currentAuth = currentAuth;
                this.init();
            }
            OverzichtenController.prototype.init = function () {
                this.title = 'Overzichten';
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                this.activate();
            };
            OverzichtenController.prototype.activate = function () {
            };
            OverzichtenController.controllerId = 'OverzichtenController';
            //user: app.domain.IUser;
            /* @ngInject */
            OverzichtenController.$inject = ['logger',
                'firebaseData',
                'Auth',
                'Ref',
                '$state',
                'currentAuth',
            ];
            return OverzichtenController;
        })();
        angular
            .module('app.overzichten')
            .controller(OverzichtenController.controllerId, OverzichtenController);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
