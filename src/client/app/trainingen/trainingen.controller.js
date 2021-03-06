///<reference path="../../../../typings/tsd.d.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var TrainingenController = (function () {
            function TrainingenController(logger, $state, currentAuth, _, fireData, Ref, $mdDialog, blogic) {
                this.logger = logger;
                this.$state = $state;
                this.currentAuth = currentAuth;
                this._ = _;
                this.fireData = fireData;
                this.Ref = Ref;
                this.$mdDialog = $mdDialog;
                this.blogic = blogic;
                this.datumWorkout = new Date();
                this.toonWorkout = false;
                this.init();
            }
            TrainingenController.prototype.init = function () {
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                if (!this.currentAuth) {
                    return;
                }
                else {
                    this.trainingenPerGebruiker = this.fireData.getTrainingenPerGebruiker(this.currentAuth.uid);
                    this.gebruiker = this.fireData.getGebruiker(this.currentAuth);
                    this.planning = this.fireData.getGebruikerPlanning(this.currentAuth);
                }
                this.activate();
            };
            TrainingenController.prototype.activate = function () {
                var bl = this.blogic;
                var tr = this.trainingenPerGebruiker;
                var gr = this.gebruiker;
                var st = this.$state;
                this.trainingenPerGebruiker.$loaded(function () {
                    //console.log(tr);
                    TrainingenController.prototype.records = bl.haalRecords(tr);
                    //console.log(TrainingenController.prototype.records);
                });
                this.gebruiker.$loaded().then(function (response) {
                    var arr = _.values(response.planning);
                    if (arr.length == 0) {
                        st.go('workouts');
                        return;
                    }
                    var openWorkouts = [];
                    var openWorkoutsKlaar = [];
                    var uniekeWorkoutNummers = _.chain(arr).sortBy('workoutNummer').map(function (o) { return o.workoutNummer; }).uniq().value();
                    var oefeningenKey = _.chain(arr)
                        .sortBy('oefeningId')
                        .map(function (o) { return o.oefeningId; })
                        .uniq()
                        .value();
                    var oefeningenOmschrijving = _.chain(arr)
                        .sortBy('oefeningOmschrijving')
                        .map(function (o) { return o.oefeningOmschrijving; })
                        .uniq()
                        .value();
                    _.forEach(oefeningenOmschrijving, function (oefenOms, key) {
                        _.forEach(uniekeWorkoutNummers, function (woNum, key1) {
                            //console.log('Workout ' + woNum + ' '+ oefenOms)
                            var nieuw = _.filter(arr, { 'oefeningOmschrijving': oefenOms, 'workoutNummer': woNum, 'realisatie': false });
                            var oefId = _.map(nieuw, 'oefeningId');
                            var a = { oefeningId: oefId[0], workoutNummer: woNum, oefeningOmschrijving: oefenOms, aantal: nieuw.length };
                            //console.log(a);
                            if (nieuw.length > 0) {
                                openWorkouts.push(a);
                            }
                        });
                    });
                    if (openWorkouts.length > 0) {
                        _.forEach(oefeningenKey, function (value, key) {
                            var temp = _.filter(openWorkouts, { 'oefeningId': value });
                            if (temp[0]) {
                                openWorkoutsKlaar.push(temp[0]);
                                openWorkoutsKlaar = _.orderBy(openWorkoutsKlaar, ['workoutNummer', 'oefeningOmschrijving']);
                            }
                        });
                    }
                    //console.log(openWorkoutsKlaar);
                    TrainingenController.prototype.gebruikerPlanning = openWorkoutsKlaar;
                });
            };
            TrainingenController.prototype.gaNaarWorkouts = function () {
                TrainingenController.prototype.$state.go('workouts');
                //this.$state.go('workouts');
            };
            TrainingenController.prototype.getRecordAantal = function (oefeningId, gewicht) {
                var record = _.filter(this.records, { 'oefeningId': oefeningId, 'gewicht': gewicht });
                var mapped = _.map(record, 'aantalReps');
                var aantal = mapped[0];
                if (record.length > 0) {
                    return 'Huidige record aantal ' + aantal;
                }
                return 'Nog geen record aantal reps bij dit gewicht.';
            };
            TrainingenController.prototype.planSelecteren = function (plan) {
                //console.log(this.planning);
                this.selectedWorkout = _.filter(this.planning, {
                    workoutNummer: plan.workoutNummer,
                    oefeningId: plan.oefeningId,
                    realisatie: false });
                this.toonWorkout = true;
            };
            TrainingenController.prototype.aantalOmhoog = function (wo) {
                wo.aantalReps++;
            };
            TrainingenController.prototype.aantalOmlaag = function (wo) {
                wo.aantalReps--;
            };
            TrainingenController.prototype.setOpslaan = function (wo) {
                var refWorkouts = this.Ref.child('workouts');
                //refWorkouts.push(wo)
                this.datumWorkout.setHours(0, 0, 0, 0);
                wo.datum = this.datumWorkout.getTime();
                wo.realisatie = true;
                var nieuweWorkout = new app.domain.Trainingen(wo.workoutNummer, wo.setNummer, wo.datum, wo.percentage, wo.aantalReps, wo.oefeningOrm, wo.gewicht, wo.repsFree, true, wo.oefeningId, wo.oefeningOmschrijving, wo.userId, wo.userVoornaam, wo.userAchternaam, wo.trainingsMethodeId, wo.trainingsMethodeOmschrijving, ' ');
                refWorkouts.push(nieuweWorkout);
                this.planning.$remove(wo);
                this.selectedWorkout = _.filter(this.planning, {
                    workoutNummer: wo.workoutNummer,
                    oefeningId: wo.oefeningId,
                    realisatie: false });
                if (this.selectedWorkout.length == 0) {
                    this.$state.go('overzichten');
                }
            };
            TrainingenController.controllerId = 'TrainingenController';
            /* @ngInject */
            TrainingenController.$inject = ['logger',
                '$state',
                'currentAuth',
                '_',
                'fireData',
                'Ref',
                '$mdDialog',
                'blogic'
            ];
            return TrainingenController;
        })();
        angular
            .module('app.trainingen')
            .controller(TrainingenController.controllerId, TrainingenController);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
