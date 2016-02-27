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
                var testGebruiker = null;
                var refUser = this.Ref.child("users").child(this.currentAuth.uid).child('data');
                refUser.on("value", function (snapshot) {
                    if (!snapshot.val()) {
                        return;
                    }
                    else {
                        testGebruiker = snapshot.val();
                    }
                    console.log(snapshot.val());
                    //Workouts.prototype.gebruiker = snapshot.val();
                    // testGebruiker = snapshot.val();  
                }, function (errorObject) {
                    console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                    return;
                });
                if (testGebruiker == null) {
                    this.userOpslaan();
                }
                this.activate();
            };
            Gebruiker.prototype.userOpslaan = function () {
                this.Ref.child('users').child(this.currentAuth.uid).child("data").update({
                    'voorNaam': "bert",
                    'achterNaam': "de beer",
                    'email': "wim3025@hotmail.com"
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
