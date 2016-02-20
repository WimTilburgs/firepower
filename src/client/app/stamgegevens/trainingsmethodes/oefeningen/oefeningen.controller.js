///<reference path="../../../../../../typings/tsd.d.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var TrainingsOefeningen = (function () {
            function TrainingsOefeningen(logger, $state, fireData, $stateParams, Ref) {
                this.logger = logger;
                this.$state = $state;
                this.fireData = fireData;
                this.$stateParams = $stateParams;
                this.Ref = Ref;
                this.init();
            }
            TrainingsOefeningen.prototype.init = function () {
                this.oefeningen = this.fireData.haalOefeningen();
                this.oefeningenPerMethode = this.fireData.haalOefeningenPerMethode(this.$stateParams.id);
                this.activate();
            };
            TrainingsOefeningen.prototype.trainingsSchemaSelecteren = function (schema) {
                //this.geselecteerdeTrainingsSchema = schema;
                //this.toonButtonNieuw = false;
            };
            TrainingsOefeningen.prototype.trainingsSchemaOpslaanTonen = function (oefening) {
                //this.geselecteerdeTrainingsSchema = null;
                //this.toonButtonNieuw = true;
            };
            TrainingsOefeningen.prototype.oefeningOpslaan = function (oefening) {
                //Haal de standaard oefeningen op.
                var oefenFire;
                var oefenRef = this.Ref.child('stamGegevens').child('oefeningen').child(oefening.id);
                oefenRef.on("value", function (snapshot) {
                    oefenFire = snapshot.val();
                }, function (errorObject) {
                    console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                });
                //Pas de gegevens van de oefening aan.
                oefenFire.ophoogGewicht = oefening.ophoogGewicht;
                oefenFire.oefeningId = oefening.id;
                //Maak een ref naar de oefeningen per methode
                var methodeOefenRef = this.Ref.child('stamGegevens').child('trainingsMethodes').child(this.$stateParams.id).child('oefeningen');
                methodeOefenRef.push(oefenFire, function (err) {
                    if (err) {
                        console.warn('Fout bij wegschrijven' + err);
                    }
                    else {
                        console.log('Gegevens zijn opgeslagen');
                    }
                });
            };
            TrainingsOefeningen.prototype.trainingsSchemaWijzigen = function () {
                //this.trainingsSchemas.$save(this.geselecteerdeTrainingsSchema);
            };
            TrainingsOefeningen.prototype.trainingsSchemaVerwijderen = function () {
                //this.trainingsSchemas.$remove(this.geselecteerdeTrainingsSchema);
                //this.geselecteerdeTrainingsSchema = null;
                //this.toonButtonNieuw = true;
            };
            TrainingsOefeningen.prototype.activate = function () {
                //this.logger.info('trainingsSchemasView wordt getoond');
            };
            TrainingsOefeningen.controllerId = 'TrainingsOefeningen';
            /* @ngInject */
            TrainingsOefeningen.$inject = ['logger',
                '$state',
                'fireData',
                '$stateParams',
                'Ref'
            ];
            return TrainingsOefeningen;
        })();
        angular
            .module('app.stamgegevens')
            .controller(TrainingsOefeningen.controllerId, TrainingsOefeningen);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
