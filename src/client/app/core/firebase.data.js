///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
var app;
(function (app) {
    var core;
    (function (core) {
        var FireData = (function () {
            function FireData(logger, $window, $firebaseArray, $firebaseObject) {
                this.logger = logger;
                this.$window = $window;
                this.$firebaseArray = $firebaseArray;
                this.$firebaseObject = $firebaseObject;
                this.fbUrl = 'https://firepower.firebaseio.com';
                this.init();
            }
            FireData.prototype.init = function () {
                this.ref = new this.$window.Firebase(this.fbUrl);
            };
            FireData.prototype.getRoot = function () {
                return this.$firebaseArray(this.ref);
            };
            FireData.prototype.getGebruiker = function (authData) {
                return this.$firebaseObject(this.ref.child('users').child(authData.uid));
            };
            FireData.prototype.getOefeningen = function () {
                return this.$firebaseArray(this.ref.child('oefeningen'));
            };
            FireData.prototype.getOneRepMaxen = function () {
                return this.$firebaseArray(this.ref.child('oneRepMaxen'));
            };
            // getOneRepMaxenPerGebruiker(userUid): any{
            //     return this.$firebaseArray(this.ref.child('oneRepMaxen')
            //     .orderByChild('gebruikerUid').equalTo(userUid));
            // }
            FireData.prototype.getOneRepMaxenPerGebruiker = function (userUid) {
                return this.$firebaseArray(this.ref.child('users').child(userUid).child('oneRepMaxen'));
                //.orderByChild('gebruikerUid').equalTo(userUid));
            };
            // getTrainingsMethodes(): any {
            //     return this.$firebaseArray(this.ref.child('trainingsMethodes'));
            // }
            /**
             * Haal alle oefeningen
             */
            FireData.prototype.haalOefeningen = function () {
                return this.$firebaseArray(this.ref.child('stamGegevens').child('oefeningen'));
            };
            /**
             * Haal alle TrainingsMethodes
             */
            FireData.prototype.haalTrainingsMethodes = function () {
                return this.$firebaseArray(this.ref.child('stamGegevens').child('trainingsMethodes'));
            };
            /**
             * Haal alle TrainingsSchemas behorende bij een trainingsMethodes
             * parameter is de trainingsMethodeUid
             */
            FireData.prototype.haalTrainingsSchemas = function (methodeUid) {
                return this.$firebaseArray(this.ref.child('stamGegevens').child('trainingsMethodes').child(methodeUid).child('trainingsSchemas'));
            };
            FireData.prototype.getTrainingsSchemas = function () {
                return this.$firebaseArray(this.ref.child('trainingsSchemas'));
            };
            /* @ngInject */
            FireData.$inject = ['logger',
                '$window',
                '$firebaseArray',
                '$firebaseObject',
            ];
            return FireData;
        })();
        core.FireData = FireData;
        angular
            .module('app.core')
            .service('fireData', FireData);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
