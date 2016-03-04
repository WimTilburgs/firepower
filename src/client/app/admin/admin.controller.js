///<reference path="../../../../typings/tsd.d.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var AdminController = (function () {
            function AdminController($state, currentAuth, _, fireData, Ref) {
                this.$state = $state;
                this.currentAuth = currentAuth;
                this._ = _;
                this.fireData = fireData;
                this.Ref = Ref;
                this.title = "Tijdelijk";
                this.init();
            }
            AdminController.prototype.init = function () {
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                if (!this.currentAuth) {
                    return;
                }
                else {
                    var geg = [];
                    this.authData = this.currentAuth;
                    var refWorkouts = this.Ref.child('workouts');
                }
            };
            AdminController.prototype.converteerTrainingen = function () {
                var refWorkouts = this.Ref.child('workouts');
                var temp = _.orderBy(this.conversieTrainingen, ['datum', 'oefeningOmschrijving', 'workoutNummer', 'setNummer'], ['desc']);
                _.each(temp, function (data) {
                    data.datum.setHours(0, 0, 0, 0);
                    //date1.setHours(0,0,0,0);
                    data.datum = data.datum.getTime();
                    refWorkouts.push(data);
                });
            };
            AdminController.prototype.haalTrainingen = function () {
                var geg;
                var conversie = [];
                var refTrainingen = this.Ref.child('trainingen');
                refTrainingen.on("value", function (snapshot) {
                    // snapshot.forEach(function(trainingSnap) {
                    //     geg.push (new Date(trainingSnap.val().datum)) ;
                    //     //console.log(geg);
                    // })
                    geg = snapshot.val();
                });
                if (geg) {
                    geg = _.filter(geg, { userName: "wim3025@hotmail.com" });
                    //geg = _.orderBy(geg, ['datum'], ['asc']);
                    _.each(geg, function (data) {
                        //conversie.push([new Date(data.datum),data.userName]);
                        // conversie.push([data.datum.getTime()]);
                        var train = new app.domain.Trainingen(data.workoutNummer, data.setNummer, new Date(data.datum), 
                        //(data.datum).getTime(),
                        data.percentage, data.aantalReps, 0, data.gewicht, data.repsFree, data.realisatie, AdminController.prototype.maakOefeningId(data.oefeningId), data.oefeningOmschrijving, data.fireUid, "Wim", "Tilburgs", "-K9WjnnaU6QggCdPtxBx", "Wendel 531 Pyramide amrap* op rep 3 en 5", "");
                        console.log(train);
                        conversie.push(train);
                    });
                }
                this.oudeTrainingen = geg;
                this.conversieTrainingen = conversie;
            };
            AdminController.prototype.maakOefeningId = function (id) {
                var temp = "";
                //squat
                if (id == 1) {
                    temp = "-K9arXgvTQrUmiZW6uxj";
                }
                //overhead press
                if (id == 4) {
                    temp = "-K9WjnnaU6QggCdPtxBx";
                }
                //deadlift
                if (id == 2) {
                    temp = "-K9arTEovYtYpeDVKhpp";
                }
                else {
                    temp = "-K9ar4Q4uRc95BOy3jy0";
                }
                return temp;
            };
            AdminController.controllerId = 'AdminController';
            /* @ngInject */
            AdminController.$inject = [
                '$state',
                'currentAuth',
                '_',
                'fireData',
                'Ref'
            ];
            return AdminController;
        })();
        angular
            .module('app.admin')
            .controller(AdminController.controllerId, AdminController);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
