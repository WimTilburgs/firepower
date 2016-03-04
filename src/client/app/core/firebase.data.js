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
            FireData.prototype.getGebruikerPlanning = function (authData) {
                return this.$firebaseArray(this.ref.child('users').child(authData.uid).child('planning'));
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
             * Haal alle oefeningen behorende bij een trainingsMethodes
             * parameter is de trainingsMethodeUid
             */
            FireData.prototype.haalOefeningenPerMethode = function (methodeUid) {
                return this.$firebaseArray(this.ref.child('stamGegevens').child('trainingsMethodes').child(methodeUid).child('oefeningen'));
            };
            FireData.prototype.haalTrainingsSchemas = function (methodeUid) {
                return this.$firebaseArray(this.ref.child('stamGegevens').child('trainingsMethodes').child(methodeUid).child('trainingsSchemas'));
            };
            /**
             * Depreciated gebruik haalTrainingsSchemas
             */
            FireData.prototype.getTrainingsSchemas = function () {
                return this.$firebaseArray(this.ref.child('trainingsSchemas'));
            };
            FireData.prototype.getTrainingenPerGebruiker = function (gebruikerId) {
                return this.$firebaseArray(this.ref.child('workouts').orderByChild('userId').equalTo(gebruikerId));
            };
            FireData.prototype.haalRecords = function (trainingen) {
                console.log(trainingen);
                var records = 23;
                return records;
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
