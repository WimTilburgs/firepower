///<reference path="../../../../typings/lodash/lodash.d.ts"/>
var app;
(function (app) {
    var domain;
    (function (domain) {
        var Oefeningen = (function () {
            function Oefeningen(omschrijving, afkorting, barbellGewicht, sqlId) {
                this.omschrijving = omschrijving;
                this.afkorting = afkorting;
                this.barbellGewicht = barbellGewicht;
                this.sqlId = sqlId;
            }
            return Oefeningen;
        })();
        domain.Oefeningen = Oefeningen;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
