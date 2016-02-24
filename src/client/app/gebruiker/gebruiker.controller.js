///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var Gebruiker = (function () {
            function Gebruiker(logger, firebaseData, Auth, Ref, $state, currentAuth) {
                this.logger = logger;
                this.firebaseData = firebaseData;
                this.Auth = Auth;
                this.Ref = Ref;
                this.$state = $state;
                this.currentAuth = currentAuth;
                this.init();
            }
            Gebruiker.prototype.init = function () {
                this.title = 'Gebruikersoverzicht';
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                this.activate();
            };
            Gebruiker.prototype.userOpslaan = function () {
                this.Ref.child('users').child(this.currentAuth.uid).child("data").update({
                    'voorNaam': this.user.voorNaam,
                    'achterNaam': this.user.achterNaam,
                    'email': this.user.email
                });
            };
            Gebruiker.prototype.activate = function () {
            };
            Gebruiker.controllerId = 'Gebruiker';
            /* @ngInject */
            Gebruiker.$inject = ['logger',
                'firebaseData',
                'Auth',
                'Ref',
                '$state',
                'currentAuth',
            ];
            return Gebruiker;
        })();
        angular
            .module('app.gebruiker')
            .controller(Gebruiker.controllerId, Gebruiker);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
