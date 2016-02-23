///<reference path="../../../../typings/tsd.d.ts"/>
var app;
(function (app) {
    var domain;
    (function (domain) {
        var Trainingen = (function () {
            //gewicht: number
            function Trainingen(workoutNummer, setNummer, datum, percentage, aantalReps, oefeningOrm, gewicht, repsFree, realisatie, oefeningId, oefeningOmschrijving, userId, userVoornaam, userAchternaam, trainingsMethodeId, trainingsMethodeOmschrijving, uid) {
                this.workoutNummer = workoutNummer;
                this.setNummer = setNummer;
                this.datum = datum;
                this.percentage = percentage;
                this.aantalReps = aantalReps;
                this.oefeningOrm = oefeningOrm;
                this.gewicht = gewicht;
                this.repsFree = repsFree;
                this.realisatie = realisatie;
                this.oefeningId = oefeningId;
                this.oefeningOmschrijving = oefeningOmschrijving;
                this.userId = userId;
                this.userVoornaam = userVoornaam;
                this.userAchternaam = userAchternaam;
                this.trainingsMethodeId = trainingsMethodeId;
                this.trainingsMethodeOmschrijving = trainingsMethodeOmschrijving;
                this.uid = uid;
                //this.gewicht = this.oefeningOrm*this.percentage/100
            }
            return Trainingen;
        })();
        domain.Trainingen = Trainingen;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
