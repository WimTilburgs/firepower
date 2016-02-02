///<reference path="../../../../typings/lodash/lodash.d.ts"/>
var app;
(function (app) {
    var domain;
    (function (domain) {
        var TrainingsSchemas = (function () {
            function TrainingsSchemas(workoutNummer, setNummer, percentage, aantalReps, amrap) {
                this.workoutNummer = workoutNummer;
                this.setNummer = setNummer;
                this.percentage = percentage;
                this.aantalReps = aantalReps;
                this.amrap = amrap;
            }
            return TrainingsSchemas;
        })();
        domain.TrainingsSchemas = TrainingsSchemas;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
