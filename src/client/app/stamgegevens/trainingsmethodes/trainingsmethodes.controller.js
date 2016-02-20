///<reference path="../../../../../typings/tsd.d.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var TrainingsMethodes = (function () {
            function TrainingsMethodes(logger, $state, _, fireData, $mdDialog) {
                this.logger = logger;
                this.$state = $state;
                this._ = _;
                this.fireData = fireData;
                this.$mdDialog = $mdDialog;
                this.toonButtonNieuw = true;
                this.toonWijzigMethode = true;
                //voorbeeld uit Angular Material om een dialoog te tonen na menuklik
                this.announceClick = function (index) {
                    this.$mdDialog.show(this.$mdDialog.alert()
                        .title('You clicked!')
                        .textContent('You clicked the menu item at index ' + index)
                        .ok('Nice'));
                };
                this.init();
            }
            TrainingsMethodes.prototype.init = function () {
                this.trainingsMethodes = this.fireData.haalTrainingsMethodes();
                this.activate();
            };
            TrainingsMethodes.prototype.trainingsMethodeSelecteren = function (methode) {
                this.toonWijzigMethode = true;
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
            // methodeOefeningenOpslaan(): void {
            //     var test = _.filter(this.oefeningen,{'selected' : true});
            //     this.oefeningenPerMethode.$add(test);
            //     console.log(test);
            // }
            TrainingsMethodes.prototype.toonOefeningenKeuze = function (methode) {
                this.toonWijzigMethode = false;
                this.oefeningenPerMethode = this.fireData.haalOefeningenPerMethode(methode.$id);
                console.log(this.oefeningenPerMethode);
            };
            TrainingsMethodes.prototype.activate = function () {
                this.logger.info('trainingsMethodesView wordt getoond');
            };
            TrainingsMethodes.controllerId = 'TrainingsMethodes';
            /* @ngInject */
            TrainingsMethodes.$inject = ['logger',
                '$state',
                '_',
                'fireData',
                '$mdDialog'
            ];
            return TrainingsMethodes;
        })();
        controller.TrainingsMethodes = TrainingsMethodes;
        angular
            .module('app.stamgegevens')
            .controller(TrainingsMethodes.controllerId, TrainingsMethodes);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
