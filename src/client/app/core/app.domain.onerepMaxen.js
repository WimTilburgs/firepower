///<reference path="../../../../typings/lodash/lodash.d.ts"/>
var app;
(function (app) {
    var domain;
    (function (domain) {
        var OneRepMaxen = (function () {
            function OneRepMaxen(oefeningUid, oefeningOmschrijving, gebruikerUid, gebruikerNaam, datum, orm, uid) {
                this.oefeningUid = oefeningUid;
                this.oefeningOmschrijving = oefeningOmschrijving;
                this.gebruikerUid = gebruikerUid;
                this.gebruikerNaam = gebruikerNaam;
                this.datum = datum;
                this.orm = orm;
                this.uid = uid;
            }
            return OneRepMaxen;
        })();
        domain.OneRepMaxen = OneRepMaxen;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
