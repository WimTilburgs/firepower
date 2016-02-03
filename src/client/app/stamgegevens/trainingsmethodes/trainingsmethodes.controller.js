///<reference path="../../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../../core/app.domain.ts"/>
///<reference path="../../core/firebase.data.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var TrainingsMethodes = (function () {
            function TrainingsMethodes(logger, $state, _, fireData) {
                this.logger = logger;
                this.$state = $state;
                this._ = _;
                this.fireData = fireData;
                this.toonButtonNieuw = true;
                this.init();
            }
            TrainingsMethodes.prototype.init = function () {
                this.trainingsMethodes = this.fireData.haalTrainingsMethodes();
                this.activate();
            };
            TrainingsMethodes.prototype.trainingsMethodeSelecteren = function (methode) {
                this.geselecteerdeTrainingsMethode = methode;
                this.toonButtonNieuw = false;
            };
            TrainingsMethodes.prototype.trainingsMethodeOpslaan = function () {
                var methode = this.geselecteerdeTrainingsMethode;
                var nieuweMethode = new app.domain.TrainingsMethodes(methode.omschrijving);
                this.trainingsMethodes.$add(methode);
                this.geselecteerdeTrainingsMethode = null;
            };
            TrainingsMethodes.prototype.trainingsMethodeWijzigen = function () {
                this.trainingsMethodes.$save(this.geselecteerdeTrainingsMethode);
                this.geselecteerdeTrainingsMethode = null;
                this.toonButtonNieuw = true;
            };
            TrainingsMethodes.prototype.trainingsMethodeVerwijderen = function () {
                this.trainingsMethodes.$remove(this.geselecteerdeTrainingsMethode);
                this.geselecteerdeTrainingsMethode = null;
                this.toonButtonNieuw = true;
            };
            TrainingsMethodes.prototype.trainingsMethodeOpslaanTonen = function () {
                this.geselecteerdeTrainingsMethode = null;
                this.toonButtonNieuw = true;
            };
            TrainingsMethodes.prototype.activate = function () {
                this.logger.info('trainingsMethodesView wordt getoond');
            };
            TrainingsMethodes.controllerId = 'TrainingsMethodes';
            /* @ngInject */
            TrainingsMethodes.$inject = ['logger',
                '$state',
                '_',
                'fireData'
            ];
            return TrainingsMethodes;
        })();
        angular
            .module('app.workouts')
            .controller(TrainingsMethodes.controllerId, TrainingsMethodes);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
